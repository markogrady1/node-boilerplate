module.exports = require('pino')({
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  enabled: process.env.NODE_ENV !== 'test',
  mixin() {
    return {
      app: 'boilerplate',
    };
  },
});
