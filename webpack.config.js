const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ],
  },
 
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  watch: true,
  devServer: {
    port: 3000,
    contentBase: "./dist",
    inline: true
  }
};
