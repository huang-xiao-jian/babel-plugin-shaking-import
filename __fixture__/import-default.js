'use strict';

import _, { forEachRight } from 'lodash';

forEachRight([1, 2], function (value) {
  console.log(value);
});

_.dropWhile([1, 2, 3, 4], function (value) {
  return value <= 3;
});