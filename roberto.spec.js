const Engine = require('./roberto')


describe('Test', () => {
  it('creates an instance', () => {
    const a = new Engine()
    expect(a).toBeDefined()
  });
  it('accepts a roll and calculates result', () => {
    const engine = new Engine()
    engine.roll(4);
    engine.roll(2);
    expect(engine.rolls[0].result).toBe(6)
  });
  it('accepts a roll with strike', () => {
    const engine = new Engine()
    engine.roll(10);
    engine.roll(2);
    engine.roll(6);
    expect(engine.rolls[0].result).toBe(18)
  });
  it('accepts a roll with a semistrike', () => {
    const engine = new Engine()
    engine.roll(8);
    engine.roll(2);
    engine.roll(6);
    expect(engine.rolls[0].result).toBe(16)
  });
  it('calculate overall score', () => {
    const engine = new Engine()
    engine.roll(1);
    engine.roll(4);

    engine.roll(4);
    engine.roll(5);

    engine.roll(6);
    engine.roll(4);

    engine.roll(5);
    engine.roll(5);

    engine.roll(10);

    engine.roll(0);
    engine.roll(1);

    engine.roll(7);
    engine.roll(3);

    engine.roll(6);
    engine.roll(4);

    engine.roll(10);

    engine.roll(2);
    engine.roll(8);
    engine.roll(6);

    expect(engine.getScore()).toBe(133)
  });
  it('calculate overall score with super final', () => {
    const engine = new Engine()
    engine.roll(1);
    engine.roll(4);

    engine.roll(4);
    engine.roll(5);

    engine.roll(6);
    engine.roll(4);

    engine.roll(5);
    engine.roll(5);

    engine.roll(10);

    engine.roll(0);
    engine.roll(1);

    engine.roll(7);
    engine.roll(3);

    engine.roll(6);
    engine.roll(4);

    engine.roll(10);

    engine.roll(10);
    engine.roll(10);
    engine.roll(10);
    // console.log(engine.rolls)
    expect(engine.getScore()).toBe(157)
  });
  it('calculate perfect match like Homer Simpson', () => {
    const engine = new Engine()
    new Array(12).fill('').forEach(a=>engine.roll(10))
    // console.log(engine.rolls)
    expect(engine.getScore()).toBe(300)
  });
});