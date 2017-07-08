/**
 * @description - determine specific case
 * @author - huang.jian <hjj491229492@hotmail.com>
 */
'use strict';

const types = require('babel-types');

/**
 * @description - determine whether operate or not
 *
 * @param {Array} specifiers - ImportDeclaration specifiers
 */
function shouldTakeShakingImport(specifiers) {
  return !specifiers.some((specifier) => types.isImportDefaultSpecifier(specifier));
}

module.exports = {
  shouldTakeShakingImport
};
