import {NullDriver} from '../drivers/null';
import {DMX} from '../index';

const dmx = new DMX();

// var universe = dmx.addUniverse('demo', 'enttec-open-usb-dmx', '/dev/cu.usbserial-6AVNHXS8')
// const universe = dmx.addUniverse('demo', 'socketio', null, {port: 17809, debug: true});
const run = async () => {
  const universe = await dmx.addUniverse('demo', new NullDriver());

  let on = false;

  setInterval(() => {
    if (on) {
      on = false;
      universe.updateAll(0);
      console.log('off');
    } else {
      on = true;
      universe.updateAll(250);
      console.log('on');
    }
  }, 1000);
};

run()
  .catch((err) => console.error(err));
