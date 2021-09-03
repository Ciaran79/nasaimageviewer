 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
     index: './src/index.js',
    //  print: './src/print.js',
   },
   devtool: 'inline-source-map',
  devServer: {
    static: './dist',
 },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
      template: 'src/index.html'
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
    module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
};
