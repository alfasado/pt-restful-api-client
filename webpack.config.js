const path = require('path');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  entry: './src/pt-restful-api-client.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'pt-restful-api-client.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'PTRESTfulAPIClient',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};
