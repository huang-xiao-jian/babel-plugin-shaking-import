'use strict';

import { forEachRight, dropWhile } from 'lodash';
import { Button, DatePicker, message } from 'antd';

forEachRight([1, 2], function (value) {
  console.log(value);
});

dropWhile([1, 2, 3, 4], function (value) {
  return value <= 3;
});

message.info('babel-plugin-shaking-import');

ReactDOM.render(<div>
  <DatePicker/>
  <Button>babel-plugin-shaking-import</Button>
</div>);
