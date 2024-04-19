const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const deps = require("./package.json").dependencies;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => ({
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "http://localhost:8080/",
  },
  experiments: {
    outputModule: true
},

  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        exclude: /node_modules/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        //test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|mp3|wav|mp4|webn)$/i,
        test: /\.(png|woff2|mp3)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
            filename: './assets/[name][ext]'
        }
    },
      {
        test: /\.(mp3)$/,
        exclude: /node_modules/,
                  use: [
                      {
                          loader: 'file-loader',
                          options: {
                              name: '[name].[ext]',
                              outputPath: 'sounds/'
                          }
                      }
                    ]
        },
        {
          test: /\.(json)$/,
          exclude: /node_modules/,
          type: 'asset/resource',
          generator: {
              filename: './[name][ext]'
          }
        }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        "tmp": "timer@http://localhost:3000/remoteEntry.js"
      },
      exposes: {},
      shared: {
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
    new MiniCssExtractPlugin ({
      filename: '[name].css'
  }),
  new CopyPlugin ({
    //filename: '[name].css'
    patterns: [
      {from: "./src/sw.js", to: "./"},
      // {from: "./src/images/screenshoots", to: "assets"}
    ]
})
  ],
});
