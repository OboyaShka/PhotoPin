module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 20000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9034c72d66312fe2fa754c0c68ed0554'),
    },
  },
});
