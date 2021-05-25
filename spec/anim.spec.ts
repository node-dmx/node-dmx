import {Animation, DMX} from '../src';
import {NullDriver} from '../src/drivers/null';
import {IUniverseDriver} from '../src/models/IUniverseDriver';

describe('Animations', () => {

  let dmx: DMX;
  let universeDriver: IUniverseDriver;

  beforeEach(async () => {
    dmx = new DMX();
    universeDriver = new NullDriver();
    await dmx.addUniverse('test', universeDriver);
  });

  const ANIM_PRECISION = 50;

  test('fake timers', () => {
    const updateMock = jest.fn();

    universeDriver.update = updateMock;
    universeDriver.update({1: 255});

    jest.useFakeTimers();

    new Animation().add({
      1: 255,
    }, 100).add({
      1: 0,
    }, 100).run(universeDriver);

    jest.runAllTimers();

    expect(updateMock).toHaveBeenCalledWith({1: 255}, {origin: 'animation'});
    expect(updateMock).toHaveBeenCalledWith({1: 0}, {origin: 'animation'});
  });

  test('real timers', done => {
    universeDriver.update = jest.fn();
    universeDriver.update({1: 255});

    jest.useRealTimers();

    const startAt = Date.now();

    new Animation().add({
      1: 255,
    }, 250).add({
      1: 0,
    }, 250).run(universeDriver, async () => {
      await universeDriver.close();
      const timeTook = Date.now() - startAt;

      expect(timeTook).toBeGreaterThanOrEqual(500 - ANIM_PRECISION);
      expect(timeTook).toBeLessThanOrEqual(500 + ANIM_PRECISION);
      done();
    });

  });
});
