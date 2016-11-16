module.exports = {
  // Entry point
  entry: './client/app/main.js',
  output: {
    // Name of the file exported
    path: './client',
    filename: 'index.js'
  },
  devServer: {
    // hot reload
    contentBase: './client',
    inline: true,
    port: 3333
  },
  module: {
    // For the loaders
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};