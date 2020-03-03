const path = require("path");
const webpack = require("webpack");

const CssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PugPlugin = require("html-webpack-pug-plugin");
const SpriteLoader = require("svg-sprite-loader/plugin");

module.exports = (_, options) => {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  const getFileName = ext => isDev
    ? `[name].${ ext }`
    : `[name].[hash].${ ext }`;

  const getOptimisations = () => {
    const prodOptimizations = {
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin()
      ],
      splitChunks: {
        chunks: "all"
      }
    };

    if (isProd) {
      return prodOptimizations
    }

    return {
      splitChunks: {
        chunks: "all"
      }
    };
  };

  const getStyleLoaders = extra => {
    const loaders = [
      {
        loader: CssExtractPlugin.loader,
        options: {
          hmr: true,
          reloadAll: true
        }
      },
      "css-loader",
    ];

    return extra && extra.length > 0
      ? [ ...loaders, ...extra ]
      : loaders;
  };

  const getHypertextLoaders = extra => {
    const loaders = [
      {
        loader: "pug-html-loader",
        options: {
          pretty: isDev
        }
      }
    ];

    return extra && extra.length > 0
      ? [ ...extra, ...loaders ]
      : loaders;
  };

  const getHtmlPlugin = (input, output) =>
    new HtmlPlugin({
      filename: output,
      template: input
    });

  const conf = {
    context: path.resolve(__dirname, "src"),
    mode: "development",

    entry: {
      main: [
        "@babel/polyfill",
        "./index.js"
      ]
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: getFileName("js"),
    },

    resolve: {
      extensions: [
        ".js",
        ".css", ".scss",
        ".eot", ".ttf", ".woff", ".woff2",
        ".png", ".jpeg", ".jpg", ".svg"
      ]
    },

    optimization: getOptimisations(),
    devServer: {
      overlay: true,
      hot: isDev
    },

    devtool: isDev
      ? "eval-sourcemap"
      : false,

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: "/node-mocules/",
          loader: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript"
              ]
            }
          }
        },
        {
          test: /\.js$/,
          loader: "babel-loader"
        },

        {
          test: /\.css$/,
          use: getStyleLoaders()
        },
        {
          test: /\.scss$/,
          use: getStyleLoaders(["sass-loader"])
        },

        {
          test: /\.(png|jpg|gif)$/,
          use: [
            "file-loader"
          ]
        },
        {
          test: /\.(woff2|woff|eot|ttf)$/,
          // use: [
          //   "file-loader"
          // ]
          loader: "file-loader",
          options: {
            name: "fonts/[path][name].[ext]"
          }
        },

        {
          test: /\.pug$/,
          use: getHypertextLoaders(["raw-loader"])
        },

        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                extract: true,
                publicPath: '/'
              }
            },
            "svg-transform-loader",
            "svgo-loader"
          ]
        }
      ]
    },

    plugins: [
      getHtmlPlugin("./index.pug", "index.html"),
      getHtmlPlugin("./page-uikit-colors.pug", "uikit-colors.html"),

      new PugPlugin(),

      new CleanPlugin(),

      new CssExtractPlugin({
        filename: getFileName("css")
      }),

      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),

      new SpriteLoader({
        plainSprite: true
      })
    ]
  };

  return conf;
};
