module.exports = {
    parser: '',
    env: {
        es6: true,
        browser: true,
        node: true
    },

}

module.exports = {
    'root': true,
    'extends': 'eslint:recommended',
    'parser': 'babel-eslint',
    'globals': {
        'wp': true,
    },
    'env': {
        'node': true,
        'es6': true,
        'amd': true,
        'browser': true,
        'jquery': true,
    },
    'parserOptions': {
        'ecmaVersion': 7,
        'sourceType': 'module',
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
        },
    },
    'plugins': [
        'import',
    ],
    'settings': {
        'import/core-modules': [],
        'import/ignore': [
            'node_modules',
            '\\.(coffee|scss|css|less|hbs|svg|json)$',
        ],
    },
    'rules': {
        'no-console': 0,
        'no-unreachable': 0,
        'quotes': ['error', 'single'],
        'comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'ignore',
            },
        ],
    },
};
