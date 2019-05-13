import utilityOthers from '../utility/others/index';


describe('utilityDOM tests', () => {
  describe('invariant', () => {

    // ! Test successed
    // test('invariant should throw error when the condition to be true', () => {
    //   expect(utilityOthers.invariant(true, 'test error')).toThrowErrorMatchingSnapshot();
    // });

    test('invariant should not do anything when the condition to be false', () => {
      expect(utilityOthers.invariant(false, 'test error')).toBeFalsy();
    });
  });
});