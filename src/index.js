/**
 * @description - babel-plugin-shaking-import
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} ShakingImportOptions
 *
 * @property {string} libraryName
 * @property {string} libraryDirectory
 * @property {boolean} libraryNameImport - whether import namespace specifier
 * @property {string} libraryStrategy - preserve, camel2dash, camel2underline
 * @property {string|boolean} libraryOverride - replace module name in rare condition, like lodash within jest while lodash-es within rollup
 * @property {string|boolean} libraryStyle
 */

'use strict';

// External dependency
const nativePath = require('path');
const types = require('babel-types');
const assert = require('assert');
const _ = require('lodash');

// Strategy
const PresetStrategy = ['preserve', 'camel2dash', 'camel2underline'];
const Strategy = require('./strategy');
const Radar = require('./radar');
const DefaultOptions = {
  libraryDirectory: 'lib',
  libraryStrategy: 'camel2camel',
  libraryNameImport: false,
  libraryOverride: false,
  libraryStyle: false
};

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: {
        /**
         * @param {object} path - ImportDeclaration
         * @param {ShakingImportOptions} state
         */
        enter(path, state) {
          const optsList = _.isPlainObject(state.opts) ? [state.opts] : state.opts;

          optsList.forEach((opts) => assert(opts.libraryName, 'libraryName should be provided'));

          const shakingImportList = optsList
            .filter((opts) => opts.libraryName === path.node.source.value)
            .filter(() => Radar.shouldTakeShakingImport(path.node.specifiers));

          shakingImportList.forEach((opts) => takeShakingImport(path, opts));
        }
      }
    }
  };
};

/**
 * @description - operate import declaration split
 *
 * @param path
 * @param {ShakingImportOptions} opts
 */
function takeShakingImport(path, opts) {
  const specifiers = path.node.specifiers;
  const destination = _.defaults(opts, DefaultOptions);
  const libraryStyle = destination.libraryStyle;
  const libraryStrategyImplement = PresetStrategy.includes(destination.libraryStrategy) ?
    Reflect.get(Strategy, destination.libraryStrategy) :
    Reflect.get(Strategy, _.first(PresetStrategy));

  specifiers.forEach((specifier) => {
    let libraryName = (opts.libraryOverride && _.isString(opts.libraryOverride)) ? opts.libraryOverride : opts.libraryName;
    let destinationPath = nativePath.join(libraryName, opts.libraryDirectory, libraryStrategyImplement(specifier.imported.name));
    let declaration = types.importDeclaration(
      [opts.libraryNameImport ? types.importSpecifier(specifier.local, specifier.imported) : types.importDefaultSpecifier(specifier.local)],
      types.stringLiteral(destinationPath)
    );

    if (libraryStyle === true) {
      path.insertBefore(types.importDeclaration([], types.stringLiteral(`${destinationPath}/style`)));
    }

    if (libraryStyle === 'css') {
      path.insertBefore(types.importDeclaration([], types.stringLiteral(`${destinationPath}/style/css`)));
    }

    path.insertBefore(declaration);
  });

  path.remove();
}