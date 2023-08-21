module.exports = {
    entry: './src/index.tsx',
    output: {
      path: __dirname + '/build',
      publicPath: '/tayio-assignment',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './build',
    },
    module: {
      rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
      ]
    },
  };