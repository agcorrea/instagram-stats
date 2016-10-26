const Mappersmith = require('mappersmith/node');
Mappersmith.Env.USE_PROMISES = true;

module.exports = Mappersmith.forge(
  {
      host: 'https://api.instagram.com',
      resources: {
          Users: {
              getRecentMedia: '/v1/users/self/media/recent'
          }
      }
  },
  Mappersmith.node.NodeVanillaGateway
);
