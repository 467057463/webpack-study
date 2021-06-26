module.exports = {
  apps : [
    {
      name: 'blog_front',
      script: 'npm',
      args: 'run start:prod',
      env: {
        "COMMON_VARIABLE": "true"
      },
      env_production: {
        "NODE_ENV": "production" // 环境变量
      }
    }
  ],

  deploy : {
    production : {
      user : 'root',
      host : '95.179.164.10',
      ref  : 'origin/master',
      repo : 'git@github.com:467057463/blog_front.git',
      path : '/var/www/blog_front',
      'pre-deploy-local': '',
      'post-deploy' : 'npm --production=false install && npm run build',
      'pre-setup': '',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};
