export const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  red: '#C04345',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};

export const Items = [
  {
    id: 1,
    category: 'product',
    productName: 'MI Super Bass Bluetooth Wireless Headphones',
    productPrice: 1799,
    description:
      'Up to 20 hours battery life | Super powerful Bass | 40mm dynamic driver | Pressure less ear muffs | Bluetooth 5.0 | Voice control',
    isOff: true,
    offPercentage: 10,
    productImage: require('./images/products/Mi1.png'),
    isAvailable: true,
    productImageList: [
      require('./images/products/Mi1.png'),
      require('./images/products/Mi2.png'),
      require('./images/products/Mi3.png'),
    ],
  },
  {
    id: 2,
    category: 'product',
    productName: 'Mi Rockerz 450 Bluetooth Headphone',
    productPrice: 1499,
    description:
      'Mi Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
    isOff: false,
    productImage: require('./images/products/Mi1.png'),
    isAvailable: true,
    productImageList: [
      require('./images/products/Mi1.png'),
      require('./images/products/Mi2.png'),
      require('./images/products/Mi3.png'),
    ],
  },
  {
    id: 3,
    category: 'accessory',
    productName: 'Mi Airdopes 441',
    productPrice: 1999,
    description:
      'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
    isOff: true,
    offPercentage: 18,
    productImage: require('./images/products/Mi1.png'),
    isAvailable: true,
    productImageList: [
      require('./images/products/Mi1.png'),
      require('./images/products/Mi2.png'),
      require('./images/products/Mi3.png'),
    ],
  },
  {
    id: 4,
    category: 'accessory',
    productName: 'Mi Bassheads 242',
    productPrice: 399,
    description:
      'Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time.',
      productImage: require('./images/products/Mi1.png'),
    isAvailable: true,
    productImageList: [
      require('./images/products/Mi1.png'),
      require('./images/products/Mi2.png'),
      require('./images/products/Mi3.png'),
    ],
  },
  {
    id: 5,
    category: 'accessory',
    productName: 'Mi Rockerz 255 Pro+',
    productPrice: 1499,
    description:
      'The unbeatable Mi signature sound shines through no matter what are you playing courtesy its 10mm drivers.',
    isOff: false,
    productImage: require('./images/products/Mi1.png'),

    isAvailable: false,
    productImageList: [
      require('./images/products/Mi1.png'),
      require('./images/products/Mi2.png'),
      require('./images/products/Mi3.png'),
    ],
  },
  {
    id: 6,
    category: 'accessory',
    productName: 'Mi AirBass Propods TWS',
    productPrice: 1299,
    description:
      'One Touch Control & Voice Assistant: With one multifunction button, you can play/pause, previous/next track and answer/hang-up calls.Voice assistant function lets you access siri/Google Assistant',
    isOff: false,
    productImage: require('./images/accessories/boultairbass1.png'),
    isAvailable: true,
    productImageList: [
      require('./images/accessories/boultairbass1.png'),
      require('./images/accessories/boultairbass2.png'),
      require('./images/accessories/boultairbass3.png'),
    ],
  },
];
