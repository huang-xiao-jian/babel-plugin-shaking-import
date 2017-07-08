# babel-plugin-shaking-import
![Build Status](https://img.shields.io/travis/bornkiller/babel-plugin-shaking-import/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/babel-plugin-shaking-import/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/babel-plugin-shaking-import?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/babel-plugin-shaking-import.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/babel-plugin-shaking-import/dev-status.svg?style=flat)

Modular import plugin for babel, compatible with antd, antd-mobile, lodash, and so on.

## Changelog
+ `ShakingImportOptions` property `style` transform into `libraryStyle`

## Usage
Install:

```shell
# npm
npm install babel-plugin-shaking-import --save-dev
# yarn
yarn add babel-plugin-shaking-import --dev
```

Add babel plugin:

```json
{
  "plugin": [
    ["shaking-import", {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "libraryStyle": true    
    }]
  ]
}
```

options can be an object of ShakingImportOptions, or an array of ShakingImportOptions:

```javascript
/**
 * @typedef {object} ShakingImportOptions
 *
 * @property {string} libraryName - reuqired
 * @property {string} libraryDirectory - optional, defualt lib
 * @property {string} libraryStrategy - optional, camel2camel, camel2dash, camel2underline, default camel2camel
 * @property {string|boolean} libraryOverride - optional, default false, replace module name in rare condition, like lodash within jest while lodash-es within rollup
 * @property {string|boolean} libraryStyle - optional, default false
 */
```

## Example
```json
[
  {
    "libraryName": "antd",
    "libraryDirectory": "lib",
    "libraryStyle": true
  },
  {
    "libraryName": "antd-mobile",
    "libraryDirectory": "component",
  },
  {
    "libraryName": "lodash",
    "libraryDirectory": "."
  }
]
```

## License
MIT
