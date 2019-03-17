const coordinates = [
  {
    latitude: 40.187952,
    longitude: 44.515942
  },
  {
    latitude: 40.1868762,
    longitude: 44.5073297
  },
  {
    latitude: 40.1853397,
    longitude: 44.5113229
  },
  {
    latitude: 40.1770535,
    longitude: 44.511532
  },
  {
    latitude: 40.1764301,
    longitude: 44.511826
  }
];

let isAdded = false;

const getBins = () => {
  return coordinates;
};

const setBins = () => {
  if (isAdded) {
    return;
  }
  isAdded = true;
  coordinates.push({
    latitude: 40.1830584,
    longitude: 44.5265566
  });
};

module.exports = {
  getBins,
  setBins
};
