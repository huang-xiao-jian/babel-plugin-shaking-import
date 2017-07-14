/**
 * @description - sub-module location strategy
 * @author - huang.jian <hjj491229492@hotmail.com>
 */
'use strict';

function preserve(name) {
  return name;
}

function camel2dash(name) {
  let target = name.charAt(0).toLowerCase() + name.slice(1);
  let regExp = /[A-Z]/g;

  return target.replace(regExp, (match) => `-${match.toLowerCase()}`);
}

function camel2underline(name) {
  let target = name.charAt(0).toLowerCase() + name.slice(1);
  let regExp = /[A-Z]/g;

  return target.replace(regExp, (match) => `_${match.toLowerCase()}`);
}

module.exports = {
  preserve,
  camel2dash,
  camel2underline
};
