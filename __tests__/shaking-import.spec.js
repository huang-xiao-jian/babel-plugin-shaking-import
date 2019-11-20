/**
 * @description - sub-module import test suits
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
const path = require('path');
const tester = require('babel-plugin-tester');

// internal
const shakingImportPlugin = require('../src');

tester.default({
  plugin: shakingImportPlugin,
  pluginName: 'babel-plugin-shaking-import',
  snapshot: true,
  tests: [
    /***********************************************************************/
    /* antd suits */
    /***********************************************************************/
    {
      title: 'antd flavor',
      fixture: path.join(__dirname, '__fixtures__', 'antd.js'),
      pluginOptions: {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        libraryStrategy: 'camel2dash',
      },
    },
    {
      title: 'antd flavor',
      fixture: path.join(__dirname, '__fixtures__', 'antd.js'),
      pluginOptions: {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        libraryStrategy: 'camel2dash',
        libraryStyle: true,
      },
    },
    {
      title: 'antd flavor',
      fixture: path.join(__dirname, '__fixtures__', 'antd.js'),
      pluginOptions: {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        libraryStrategy: 'camel2dash',
        libraryStyle: 'css',
      },
    },
    /***********************************************************************/
    /* lodash flavor */
    /***********************************************************************/
    {
      title: 'lodash flavor',
      fixture: path.join(__dirname, '__fixtures__', 'lodash.js'),
      pluginOptions: {
        libraryName: 'lodash',
        libraryDirectory: '.',
      },
    },
    /***********************************************************************/
    /* react-toolbox flavor */
    /***********************************************************************/

    {
      title: 'react-toolbox flavor',
      fixture: path.join(__dirname, '__fixtures__', 'react-toolbox.js'),
      pluginOptions: {
        libraryName: 'react-toolbox',
        libraryDirectory: 'lib',
        libraryStrategy: 'camel2underline',
      },
    },
    /***********************************************************************/
    /* rxjs flavor */
    /***********************************************************************/
    {
      title: 'rxjs flavor',
      fixture: path.join(__dirname, '__fixtures__', 'rxjs.js'),
      pluginOptions: {
        libraryName: 'rxjs',
        libraryDirectory: '.',
        libraryNameImport: true,
      },
    },
    /***********************************************************************/
    /* skip import default declaration */
    /***********************************************************************/
    {
      title: 'skip import default declaration',
      fixture: path.join(__dirname, '__fixtures__', 'skip.js'),
      pluginOptions: {
        libraryName: 'lodash',
        libraryDirectory: '.',
      },
    },
  ],
});
