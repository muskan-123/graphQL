const path = require("path");

module.exports = {
  entry: "./client/index.js", // Your React entry file
  output: {
    path: path.resolve(__dirname, "public"), // The directory where the bundled file will be saved
    filename: "bundle.js", // The name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // This rule applies to .js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel to transpile modern JS and JSX
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: "development", // Set Webpack to development mode
};
