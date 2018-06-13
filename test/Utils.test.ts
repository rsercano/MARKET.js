import { Utils } from '../src/';

/**
 * Utils
 */
describe('Utils library', () => {
  it('Utils has signMessage', () => {
    expect(typeof Utils.signMessage).toEqual('function');
  });
});
