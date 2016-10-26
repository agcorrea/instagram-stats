// mock dependencies
jest.mock('../instagram-api');

let InstagramStats;
let accessToken;

describe('instagram stats', () => {

  beforeEach(() => {
    InstagramStats = require('../instagram-stats');
    accessToken = 'fake-token';
  });

  it('should contain total number of likes', () => {
    return InstagramStats.getBasicUserMediaStatistics(accessToken)
      .then(result => expect(result.likes.count).toBe(387));
  });

  it('should contain likes average', () => {
    return InstagramStats.getBasicUserMediaStatistics(accessToken)
      .then(response => {
        expect(response.likes.average).toBe(19);
      });
  });

  it('should contain likes median', () => {
    return InstagramStats.getBasicUserMediaStatistics(accessToken)
      .then(response => {
        expect(response.likes.median).toBe(17);
      });
  });

  it('should contain likes mode', () => {
    return InstagramStats.getBasicUserMediaStatistics(accessToken)
      .then(response => {
        expect(response.likes.mode).toEqual([15, 16]);
      });
  });

});
