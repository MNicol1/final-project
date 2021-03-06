const isLikedByUser = async ({ userFromDb, id }) => {
  // validate if user already liked the station
  const { likedStations } = userFromDb;
  
  const isLiked = likedStations.find((stationId) => {
    return stationId === id;
  });
  return isLiked;
};

module.exports = { isLikedByUser };
