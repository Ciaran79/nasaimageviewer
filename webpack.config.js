 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      title: 'Nasa Image Viewer',
      template: 'src/index.html'
     }),
     new CopyPlugin({
      patterns: [
        { from: "images", to: "images" },
      ],
    }),
    new MiniCssExtractPlugin(),
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
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
