# Form Collector
Form Collector...

## Features

* [Modern JavaScript](https://github.com/JeffreyWay/laravel-mix/tree/master/docs) with Webpack, Yarn and Babel etc.
* [Webpack](https://webpack.github.io/) for compiling assets, optimizing images, and concatenating and minifying files
* [Browsersync](http://www.browsersync.io/) for synchronized browser testing

## Requirements

Make sure all dependencies have been installed before moving on:

* [Node.js](http://nodejs.org/) >= 8.0.0
* [Yarn](https://yarnpkg.com/en/docs/install)

## Plugin structure

<details><summary>SHOW FILE STRUCTURE</summary>
<p>

```shell
/saucecode/form-collector               # → Plugin root
├── build/                              # → Plugin app
│   ├── helpers/                        # → Plugin core functionality
│   │   └── hmr-client.js               # → Hot middleware clinet
│   ├── util/                           # → Plugin WordPress compatibility and helper classes.
│   │   ├── addHotMiddleware.js         # → Plugin admin functionality
│   │   └── desire.js                   # → Plugin admin functionality
│   ├── config.js                       # → Plugin main App class
│   ├── webpack.config.js               # → Plugin configration class
│   ├── webpack.config.optimize.js      # → Plugin frontend class for loaoding assets
│   └── webpack.config.watch.js         # → Plugin setup
├── src/                                # → Yeah
│   ├── form-collector.js               # → Plugin config files, automatically parsed and loaded by Config class.
│   └── functions.js                    # → Plugin config files, automatically parsed and loaded by Config class.
├── dist/                               # → Built plugin assets (never edit)
├── node_modules/                       # → Node.js packages (never edit)
├── .babelrc                            # → Editor config, works with PHP Storm and more.
├── .eslintrc.js                        # → ES Lint  "Run Commands"
├── .gitignore                          # → ES Lint  "Run Commands"
├── package.json                        # → Node.js dependencies and scripts
└── README.md                           # → Webpack mix file# → Composer packages (never edit)
└── yarn.lock                           # → Webpack mix file# → Composer packages (never edit)
```
</p>
</details>


## Usage

Coming soon

### Build commands

<details><summary>SHOW BUILD COMMANDS</summary>
<p>

* `yarn start` — Compile assets when file changes are made, start Browsersync session
* `yarn s` — Compile assets when file changes are made, start Browsersync session (alias for `start`)
* `yarn build` - Compile the files in your assets directory
* `yarn b` — Compile and optimize the files in your assets directory
* `yarn build:production` - Compile and optimize the files in your assets directory for production
* `yarn b:prod` — Compile assets for production
* `yarn lint` - Run linters for both javascript and scss
* `yarn l` - Run linters for both javascript and scss (alias for `lint`)
* `yarn lint:scripts` - Run linters for both javascript
* `yarn l:scripts` - Run linters for both javascript (alias for `lint:scripts`)

</p>
</details>
