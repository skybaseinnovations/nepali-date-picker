const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/nepaliDatePicker.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'datepicker.min.js',
    library: 'NepaliDatePicker',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: 'source-map',
}; 