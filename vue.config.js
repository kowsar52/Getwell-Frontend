module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 4000,
    public: '0.0.0.0:4000'
},
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
}

