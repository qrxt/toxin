const path = require("path");
const webpack = require("webpack");

const CssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PugPlugin = require("html-webpack-pug-plugin");
const SpriteLoader = require("svg-sprite-loader/plugin");
const Copy = require("copy-webpack-plugin");

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
      alias: {
        "jquery-ui": "jquery-ui/jquery-ui.js",
        modules: path.join(__dirname, "node_modules"),

        "@": path.join(__dirname, "src"),
        "@components": path.join(__dirname, "src", "components"),

        "@assets": path.join(__dirname, "src", "assets")
      },
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
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        },
        // {
        //   test: /\.svg
        // },
        {
          test: /\.(woff2|woff|eot|ttf|svg)$/,
          include: /fonts/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        },

        {
          test: /\.pug$/,
          use: getHypertextLoaders(["raw-loader"])
        },

        {
          test: /\.svg(\?.*)?$/, // /\.svg$/,
          exclude: /fonts/,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                extract: true,
                publicPath: "/assets/img/"
              }
            },
            // "svg-transform-loader",
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  // { removeNonInheritableGroupAttrs: true },
                  // { collapseGroups: true },
                  { removeUselessDefs: false },
                  { cleanupIDs: false },
                  { removeAttrs: { attrs: "(fill|stroke|fill-opacity)" } },
                ]
              }
            }
          ]
        },
      ]
    },

    plugins: [
      getHtmlPlugin("./page-index.pug", "index.html"),
      getHtmlPlugin("./page-uikit-colors.pug", "uikit-colors.html"),
      getHtmlPlugin("./page-uikit-forms.pug", "uikit-forms.html"),

      new PugPlugin(),

      new CleanPlugin(),

      new CssExtractPlugin({
        filename: getFileName("css")
      }),

      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),

      new SpriteLoader({
        plainSprite: true
      }),

      new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery",
        "window.jQuery": "jquery"
      }),

      new Copy([
        {
          from: path.resolve(__dirname, "src/assets/img"),
          to: path.resolve(__dirname, "dist/assets/img")
        }
      ])
    ]
  };

  return conf;
};
