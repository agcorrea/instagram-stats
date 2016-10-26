const InstagramAPI = require('./instagram-api');
const math = require('mathjs');
const async = require('async');

module.exports = {
  getBasicUserMediaStatistics: (accessToken) => {
    return new Promise(
      (resolve, reject) => {
        getAllUserMedias(accessToken)
          .then(data => {
            const likes = data.map(media => media.likes.count);
            resolve({
              likes: {
                count: math.sum(likes),
                average: math.round(math.mean(likes)),
                median: math.round(math.median(likes)),
                mode: math.mode(likes)
              }
            });
          });
      }
    );
  }
};

/**
 * Returns all user media concatenating responses from pagination.
 */
const getAllUserMedias = (accessToken) => {
  return new Promise((resolve, reject) => {
    let medias = [];
    let nextMaxId = null;

    async.doWhilst(
      // do
      (next) => {
          InstagramAPI.Users.getRecentMedia({
            access_token: accessToken,
            max_id: nextMaxId,
            count: 50
          }).then(function (response, stats) {
            const pagination = response.data.pagination;
            nextMaxId = pagination && pagination.next_max_id
                ? pagination.next_max_id
                : null;

            medias = medias.concat(response.data.data);
            next(null, medias);
          });
      },
      // while
      () => nextMaxId !== null,
      // then
      (err, medias) => {
        return resolve(medias);
      }
    );
  });
};
