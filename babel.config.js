module.exports =  {
    env: {
        production: {
            presets: ["minify"]
        }
    },
    plugins: [
        ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }],
        [
            "@babel/plugin-transform-react-jsx",
            {
                "pragma": "h",
                "pragmaFrag": "f",
                "throwIfNamespace": false
            }
        ],
        ["@babel/plugin-syntax-dynamic-import"]
    ],
    presets: [
        ["@babel/preset-env", {"useBuiltIns": "entry", "corejs": 3 }]
    ]
}