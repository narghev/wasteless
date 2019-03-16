const coordinates = [
  {
    id: 1,
    location: {
      latitude: 40.1815603,
      longitude: 44.5259002
    }
  },
  {
    id: 2,
    location: {
      latitude: 40.1832167,
      longitude: 44.5257155
    }
  },
  {
    id: 3,
    location: {
      latitude: 40.1862017,
      longitude: 44.5248199
    }
  },
  {
    id: 4,
    location: {
      latitude: 40.1886291,
      longitude: 44.5250986
    }
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
