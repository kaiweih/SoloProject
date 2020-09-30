const path = require('path');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {extensions: [".js", ".jsx"]},
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
            ]
          }
        }
      }
    ]
  },
  devServer: {
    publicPath: "/build",
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
}