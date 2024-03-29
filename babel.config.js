module.exports = {
    presets: ['babel-preset-expo'],
    "plugins": [
        ["module:react-native-dotenv", {
            "envName": "APP_ENV",
            "moduleName": "@env",
            "path": ".env",
            "blocklist": null,
            "allowlist": null,
            "blacklist": null, // DEPRECATED
            "whitelist": null, // DEPRECATED
            "safe": false,
            "allowUndefined": true,
            "verbose": false
        }],
        [
            "module-resolver",
            {
                "root": ["./src"],
                "extensions": [
                    ".ios.ts",
                    ".android.ts",
                    ".ts",
                    ".ios.tsx",
                    ".android.tsx",
                    ".tsx",
                    ".jsx",
                    ".js",
                    ".json"
                ],
                "alias": {
                    "src": "./src/",
                }
            }
        ]
        ,
        'react-native-reanimated/plugin'
    ]

};
