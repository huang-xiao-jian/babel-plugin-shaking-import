/**
 * @description - Modular import plugin for babel
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} ShakingImportOptions
 *
 * @property {string} libraryName
 * @property {string} libraryDirectory
 * @property {string} libraryStrategy - preserve, camel2dash, camel2underline
 * @property {boolean} libraryNameImport - whether import namespace specifier
 * @property {string|boolean} libraryStyle
 */

// packages
const nativePath = require('path');
const assert = require('assert');
const types = require('@babel/types');

// internal
const strategy = require('./strategy');
const defaultShakingOptions = {
  libraryDirectory: 'lib',
  libraryStrategy: 'preserve',
  libraryNameImport: false,
  libraryStyle: false,
};

// scope
/**
 * @description - skip import default declaration
 */
function shouldTakeShakingImport(specifiers) {
  return !specifiers.some((specifier) =>
    types.isImportDefaultSpecifier(specifier)
  );
}

/**
 * @description - operate import declaration split
 */
function takeShakingImport(path, opts) {
  const specifiers = path.node.specifiers;
  // const destination = _.defaults(opts, DefaultOptions);
  const destination = { ...defaultShakingOptions, ...opts };
  const libraryStyle = destination.libraryStyle;
  const libraryStrategyImplement =
    Reflect.get(strategy, destination.libraryStrategy) || strategy.preserve;

  specifiers.forEach((specifier) => {
    const { libraryName, libraryDirectory } = opts;
    const destinationPath = nativePath.join(
      libraryName,
      libraryDirectory,
      libraryStrategyImplement(specifier.imported.name)
    );

    // import additional stylesheets
    if (libraryStyle === true) {
      path.insertBefore(
        types.importDeclaration(
          [],
          types.stringLiteral(`${destinationPath}/style`)
        )
      );
    }

    if (libraryStyle === 'css') {
      path.insertBefore(
        types.importDeclaration(
          [],
          types.stringLiteral(`${destinationPath}/style/css`)
        )
      );
    }

    // import shaking modules
    path.insertBefore(
      types.importDeclaration(
        [
          opts.libraryNameImport
            ? types.importSpecifier(specifier.local, specifier.imported)
            : types.importDefaultSpecifier(specifier.local),
        ],
        types.stringLiteral(destinationPath)
      )
    );
  });

  // remove original import declaration
  path.remove();
}

module.exports = function shakingImportPlugin() {
  return {
    visitor: {
      ImportDeclaration: {
        /**
         * @param {object} path - ImportDeclaration
         * @param {{opts: ShakingImportOptions}} state
         */
        enter(path, state) {
          assert(state.opts, 'ShakingImportOptions required');
          assert(state.opts.libraryName, 'libraryName required');

          if (state.opts.libraryName === path.node.source.value) {
            // skip import default declaration
            if (shouldTakeShakingImport(path.node.specifiers)) {
              takeShakingImport(path, state.opts);
            }
          }
        },
      },
    },
  };
};
