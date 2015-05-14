Groups = new Meteor.Collection "groups"
Settings = new Meteor.Collection "settings"
Identity = new Meteor.Collection "identity"

if Meteor.isClient
  Session.set "name", null
  Session.set "group", null
  Session.set "identity", null

  setting = (name) ->
    settings = Settings.findOne
      group: Session.get "group"
      role: name
    settings?.enabled or false

  Template.login.events
    "submit": (event) ->
        name = $("#name").val()
        group = $("#group").val()
        Session.set "name", name
        Session.set "group", group
        Meteor.call "login", name, group, (error, result) ->
          if not result
            console.log "alert"
            $("#alert").removeClass "hidden"
            return
          Meteor.subscribe "identity"
          Meteor.subscribe "group"
          Meteor.subscribe "settings"
          $("#alert").addClass "hidden"
        event.preventDefault()

  Template.players.events
    "click button": ->
        Meteor.call "identity"
    "click input": (event) ->
        target = event.target.id
        Meteor.call "settings", target, $("#" + target).is ":checked"
  
  Template.players.helpers
    members: ->
      Groups.find
        group: Session.get "group"

    tooMany: ->
      count = Groups.find(group: Session.get "group").count()
      count > 10
  
    tooFew: ->
      count = Groups.find(group: Session.get "group").count()
      count < 5

    tooEvil: ->
      evil = 0
      if setting "mordred"
        evil += 1
      if setting "morgana"
        evil += 1
      if setting "oberon"
        evil += 1
      if setting "merlin"
        evil += 1
      count = Groups.find(group: Session.get "group").count()
      Math.ceil(count / 3.0) < evil

    merlin: -> setting "merlin"
    percival: -> setting "percival"
    mordred: -> setting "mordred"
    morgana: -> setting "morgana"
    oberon: -> setting "oberon"

  Template.identity.events
    "click button": ->
        name = Session.get "name"
        group = Session.get "group"
        Meteor.call "login", name, group, ->
          Meteor.subscribe "identity"
          Meteor.subscribe "group"
          Meteor.subscribe "settings"
  
  Template.identity.helpers
    role: -> Identity.findOne({})?.role
    known: -> Identity.findOne({})?.known

  Template.body.helpers
    state: ->
      identity = Identity.findOne {}
      group = Groups.findOne {}
      if identity?.role?
        "identity"
      else if group?
        "players"
      else
        "login"

if Meteor.isServer
  Meteor.publish "group", ->
    group = Groups.findOne({id: this.connection.id})?.group
    if not group?
      return
    Groups.find
      group: group
  
  Meteor.publish "settings", ->
    group = Groups.findOne({id: this.connection.id})?.group
    if not group?
      return
    Settings.find
      group: group
         
  Meteor.publish "identity", ->
    Identity.find
      id: this.connection.id

  Meteor.startup ->
    Groups.remove {}
    Meteor.methods
      login: (name, group) ->
        existing = Groups.findOne {group:group, name:name}
        if existing?
          console.log "duplicate"
          return false
        Groups.upsert
          id: this.connection.id,
        ,
          id: this.connection.id,
          group: group
          name: name
        Identity.upsert
          id: this.connection.id
        ,
          id: this.connection.id
          role: null
          known: []
        return true
      settings: (role, state) ->
        group = Groups.findOne({id: this.connection.id})?.group
        if not group?
          return
        Settings.upsert
          group: group
          role: role
        ,
          group: group
          role: role
          enabled: state
      identity: () ->
        group = Groups.findOne({id: this.connection.id})?.group
        if not group?
          return
        members = (person.id for person in Groups.find({group: group}).fetch())

        good_roles = {}
        evil_roles = {}
        
        if Settings.findOne({group: group, role:"oberon"})?.enabled
          evil_roles.oberon = {role: "oberon"}
        if Settings.findOne({group: group, role:"mordred"})?.enabled
          evil_roles.mordred = {role: "mordred"}
        if Settings.findOne({group: group, role:"morgana"})?.enabled
          evil_roles.morgana = {role: "morgana"}
        if Settings.findOne({group: group, role:"merlin"})?.enabled
          good_roles.merlin = {role: "merlin"}
          evil_roles.assassin ={role: "assassin"}
        if Settings.findOne({group: group, role:"percival"})?.enabled
          good_roles.percival = {role: "percival"}

        more_evil = Math.ceil(members.length  / 3.0) - Object.keys(evil_roles).length
        more_good = members.length - more_evil - Object.keys(evil_roles).length - Object.keys(good_roles).length

        for i in [0...more_good]
          good_roles["knight" + i] = {role: "knight"}

        for i in [0...more_evil]
          evil_roles["minion" + i] = {role: "minion"}

        available = _.clone members

        for role in Object.keys(good_roles)
          id = _.sample available
          good_roles[role].id = id
          good_roles[role].name = Groups.findOne({id: id})?.name
          available = available.filter (member) -> member isnt id

        for role in Object.keys(evil_roles)
          id = _.sample available
          evil_roles[role].id = id
          evil_roles[role].name = Groups.findOne({id: id})?.name
          available = available.filter (member) -> member isnt id

        evil_no_mordred = (evil_roles[slot].name for slot in Object.keys(evil_roles) when evil_roles[slot].role isnt "mordred")
        evil_no_oberon = (evil_roles[slot].name for slot in Object.keys(evil_roles) when evil_roles[slot].role isnt "oberon")
        merlin_or_morgana = []
        if "merlin" of good_roles
          merlin_or_morgana.push good_roles.merlin.name
        if "morgana" of evil_roles
          merlin_or_morgana.push evil_roles.morgana.name

        console.log good_roles
        console.log evil_roles

        for slot of good_roles
          slot = good_roles[slot]
          known = []
          if slot.role is "merlin"
            known = evil_no_mordred
          else if slot.role is "percival"
            known = merlin_or_morgana
          known = known.filter (name) -> name isnt slot.name
          Identity.upsert
            id: slot.id
          ,
            id: slot.id
            role: slot.role
            known: known

        for slot of evil_roles
          slot = evil_roles[slot]
          known = evil_no_oberon
          if slot.role is "oberon"
            known = []
          known = known.filter (name) -> name isnt slot.name
          Identity.upsert
            id: slot.id
          ,
            id: slot.id
            role: slot.role
            known: known

        for member in members
          Groups.remove({id: member})


  Meteor.onConnection (connection) ->
    connection.onClose ->
      Groups.remove
        id: connection.id

