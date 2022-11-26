module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugins:vue/essential",
        "plugins:@typescript-eslint/recommended",
        "prettier",
        "plugins:vue/strongly-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        // not needed for vue 3
        "vue/no-multiple-template-root": "off",
    }
}
