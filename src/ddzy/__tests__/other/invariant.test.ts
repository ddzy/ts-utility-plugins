import { invariant } from "../../utility/others/invariant";

describe('invariant', () => {

  // ! Test successed
  // test('invariant should throw error when the condition to be true', () => {
  //   expect(utilityOthers.invariant(true, 'test error')).toThrowErrorMatchingSnapshot();
  // });

  test('invariant should not do anything when the condition to be false', () => {
    expect(invariant(false, 'test error')).toBeFalsy();
  });
});