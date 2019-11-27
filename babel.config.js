module.exports =  {
    env: {
        production: {
            presets: ["minify"]
        }
    },
    plugins: [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "pragma": "h",
                "pragmaFrag": "f",
                "throwIfNamespace": false
            }
        ],
        ["@babel/plugin-syntax-dynamic-import"],
        [
            "@babel/plugin-transform-runtime",
            {
              "absoluteRuntime": false,
              "corejs": false,
              "helpers": true,
              "regenerator": true,
              "useESModules": false
            }
        ]
    ],
    presets: [
        ["@babel/preset-env", { targets: "> 0.25%, not dead" }]
    ]
}