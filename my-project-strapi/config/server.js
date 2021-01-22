module.exports = ({ env }) => ({
  host: env('HOST', '178.248.1.62'),
  port: env.int('PORT', 8080),

  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9034c72d66312fe2fa754c0c68ed0554'),
    },
  },
});
