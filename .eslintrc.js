module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: ["airbnb", "eslint:recommended", "prettier"],
    globals: {
        vg_config: "readonly",
        appLogger: "readonly",
        appConfig: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "no-cond-assign": 0,
        "no-console": 0,
        "import/no-extraneous-dependencies": 0,
    },
};
