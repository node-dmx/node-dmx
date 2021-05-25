export interface Device {
  channels: string[]|number[];
  ranges?: any;
  channelgroups?: string[];
}

export type Devices = { [key: string]: Device };

export const PredefinedDevices: Devices = {
  'generic': {
    channels: ['dimmer'],
  },
  'generic-rgb': {
    channels: ['red', 'green', 'blue'],
  },
  'showtec-multidim2': {
    channels: ['1', '2', '3', '4'],
  },
  'eurolite-led-bar': {
    channels: [
      'ctrl',
      'dimmer',
      'strobe',
      'red0',
      'green0',
      'blue0',
      'red1',
      'green1',
      'blue1',
      'red2',
      'green2',
      'blue2',
    ],
    ranges: {
      'ctrl': {
        'type': 'option',
        'options': [
          {'value': 0, 'label': 'Black Out'},
          {'value': 1, 'label': 'Dimmer 1'},
          {'value': 16, 'label': 'Dimmer 2'},
          {'value': 32, 'label': 'Red'},
          {'value': 48, 'label': 'Green'},
          {'value': 64, 'label': 'Blue'},
          {'value': 80, 'label': 'Purple'},
          {'value': 96, 'label': 'Yellow'},
          {'value': 112, 'label': 'Cyan'},
          {'value': 128, 'label': 'White'},
          {'value': 144, 'label': 'Color change'},
          {'value': 160, 'label': 'Color flow'},
          {'value': 176, 'label': 'Color dream'},
          {'value': 192, 'label': 'Multi flow'},
          {'value': 208, 'label': 'Dream flow'},
          {'value': 224, 'label': 'Two color flow'},
          {'value': 240, 'label': 'Sound activity'},
        ],
      },
      'dimmer': {
        'type': 'slider',
        'min': 0,
        'max': 255,
      },
    },
  },
  'stairville-led-par-56': {
    channels: ['ctrl', 'red', 'green', 'blue', 'speed'],
    ranges: {
      'ctrl': {
        'type': 'option',
        'options': [
          {'value': 0, 'label': 'RGB Control'},
          {'value': 64, 'label': '7 color fade'},
          {'value': 128, 'label': '7 color change'},
          {'value': 192, 'label': '3 color change'},
        ],
      },
    },
  },
  'ultra-pro-24ch-rdm': {
    channels: [...Array(25).keys()].slice(1),
  },
  'ultra-pro-6rgbch-rdm': {
    channels: [...Array(25).keys()].slice(1),
    channelgroups: ['1', '2', '3', '4', '5', '6'],
  },
  'oppsk-cob-uv-par': {
    channels: ['dimmer', 'strobe', 'program-speed', 'sound-activity'],
  },
  'lixda-par12-led': {
    channels: ['ctrl', 'static-color', 'speed', 'dimmer', 'red', 'green', 'blue', 'white'],
    ranges: {
      'ctrl': {
        'type': 'option',
        'options': [
          {'value': 0, 'label': 'Off'},
          {'value': 11, 'label': 'Static Color'},
          {'value': 51, 'label': 'Jump'},
          {'value': 101, 'label': 'Gradual'},
          {'value': 151, 'label': 'Sound Activate'},
          {'value': 200, 'label': 'Strobe'},
        ],
      },
      'static-color': {
        'type': 'option',
        'options': [
          {'value': 0, 'label': 'All Color'},
          {'value': 40, 'label': 'Red'},
          {'value': 50, 'label': 'Green'},
          {'value': 60, 'label': 'Blue'},
          {'value': 70, 'label': 'Yellow'},
          {'value': 80, 'label': 'Cyan'},
          {'value': 90, 'label': 'Purple'},
          {'value': 100, 'label': 'White'},
          {'value': 110, 'label': 'Red + Green'},
          {'value': 120, 'label': 'Red + Blue'},
          {'value': 130, 'label': 'Red + White'},
          {'value': 140, 'label': 'Green + Blue'},
          {'value': 150, 'label': 'Green + White'},
          {'value': 160, 'label': 'Blue + White'},
          {'value': 170, 'label': 'Red + Green + White'},
          {'value': 180, 'label': 'Red + Blue + White'},
          {'value': 190, 'label': 'Green + Blue + White'},
          {'value': 200, 'label': 'Red + Green + Blue'},
          {'value': 210, 'label': 'Red + Green + Blue + White'},
        ],
      },
    },
  },
  'eurolite-led-tha-120PC': {
    channels: ['red', 'green', 'blue', 'white', 'dimmer', 'strobe', 'effect'],
  },
  'briteq-bt-theatre-60FC': {
    channels: ['dimmer', 'strobe', 'effect', 'red', 'green', 'blue', 'white'],
  },
  'lalucenatz-led-4ch': {
    channels: ['master', 'red', 'green', 'blue'],
  },
};
