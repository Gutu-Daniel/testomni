module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'socialmedia',
      script    : 'web.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'deploy',
      host : '104.236.17.231',
      ref  : 'origin/master',
      repo : 'https://27b646f56e2594351634803254d002f7179145b0@github.com/peterhan92/social-media.git',
      path : '/home/deploy/crm',
      'post-deploy' : 'nvm install && npm install && /home/deploy/.nvm/versions/node/v8.7.0/bin/pm2 reload ecosystem.config.js --env production'
    }
  }
};
