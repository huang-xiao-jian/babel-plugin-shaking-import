'use strict';

import { forEachRight, dropWhile } from 'lodash';

forEachRight([1, 2], function (value) {
  console.log(value);
});

dropWhile([1, 2, 3, 4], function (value) {
  return value <= 3;
});