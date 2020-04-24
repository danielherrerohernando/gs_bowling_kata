const {createGame} = require('./engine')


describe('Test', () => {
  it('creates an instance', () => {
    const a = createGame()
    expect(a).toBeDefined()
  });
  it('accepts a roll and calculates result', () => {
    const engine = createGame()
    engine.roll(4);
    engine.roll(2);
    expect(engine.rolls[0].result).toBe(6)
  });
  it('accepts a roll with strike', () => {
    const engine = createGame()
    engine.roll(10);
    engine.roll(2);
    engine.roll(6);
    expect(engine.rolls[0].result).toBe(18)
  });
  it('accepts a roll with a semistrike', () => {
    const engine = createGame()
    engine.roll(8);
    engine.roll(2);
    engine.roll(6);
    expect(engine.rolls[0].result).toBe(16)
  });
  it('calculate overall score', () => {
    const engine = createGame()
    const data = [1,4,4,5,6,4,5,5,10,0,1,7,3,6,4,10,2,8,6]
    data.forEach(a=>engine.roll(a))

    expect(engine.getScore()).toBe(133)
  });
  it('calculate overall score with super final', () => {
    const engine = createGame()
    const data = [1,4,4,5,6,4,5,5,10,0,1,7,3,6,4,10,10,10,10]
    data.forEach(a=>engine.roll(a))

    expect(engine.getScore()).toBe(157)
  });
  it('calculate perfect match like Homer Simpson', () => {
    const engine = createGame()
    new Array(12).fill('').forEach(a=>engine.roll(10))

    expect(engine.getScore()).toBe(300)
  });
});