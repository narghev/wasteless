const coordinates = [
  {
    latitude: 40.1917271,
    longitude: 44.530983
  },
  {
    latitude: 40.1898835,
    longitude: 44.525367
  },
  {
    latitude: 40.1895297,
    longitude: 44.5250973
  },
  {
    latitude: 40.1850616,
    longitude: 44.526116
  }
];

const getBins = () => {
  return coordinates;
};

const setBins = () => {
  coordinates.push({
    id: 5,
    location: {
      latitude: 40.1830584,
      longitude: 44.5265566
    }
  });
  return { success: true };
};

module.exports = {
  getBins,
  setBins
};
