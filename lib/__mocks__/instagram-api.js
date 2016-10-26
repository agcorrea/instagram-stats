const fs = require('fs');

module.exports = {
  Users: {
    getRecentMedia: (params) => {
      return new Promise((resolve, reject) => {
        let fileName = params.max_id === null
          ? 'lib/__mocks__/userRecentMedia.json'
          : 'lib/__mocks__/userRecentMedia-2.json';

        resolve({
          data: JSON.parse(fs.readFileSync(fileName, 'utf8'))
        });
      });
    }
  }
};
