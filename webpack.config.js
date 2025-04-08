const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/renderer.js',
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'renderer.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
