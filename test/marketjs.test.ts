import Market from '../src/marketjs'

/**
 * Dummy test
 */
describe('Market test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Market is instantiable', () => {
    expect(new Market()).toBeInstanceOf(Market)
  })

  it('Market has debug method', () => {
    const mkt = new Market()
    expect(mkt.debug()).toEqual('It works!')
  })
})
