/**
 * @description - sub-module location strategy test suits
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

const Strategy = require('../src/strategy');

describe('babel-plugin-shaking-import strategy', function() {
  it('should implement camel2camel', function() {
    expect(Strategy.preserve('dropRightWhile')).toEqual('dropRightWhile');
  });

  it('should implement camel2dash', function() {
    expect(Strategy.camel2dash('dropRightWhile')).toEqual('drop-right-while');
    expect(Strategy.camel2dash('DatePicker')).toEqual('date-picker');
  });

  it('should implement camel2underline', function() {
    expect(Strategy.camel2underline('dropRightWhile')).toEqual(
      'drop_right_while'
    );
    expect(Strategy.camel2underline('DatePicker')).toEqual('date_picker');
  });
});
