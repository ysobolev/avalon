module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "settings": {
      "import/core-modules": [
        "meteor",
	"meteor/meteor",
	"meteor/mongo",
	"meteor/react-meteor-data"
      ]
    }
};
