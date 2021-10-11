import path from 'path';

const config = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    library: {
      type: 'module',
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};

export default config;
