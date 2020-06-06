const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const CssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PugPlugin = require("html-webpack-pug-plugin");
const SpriteLoader = require("svg-sprite-loader/plugin");
const ImageminWebpPlugin = require("imagemin-webp-webpack-plugin");

const getHtmlPlugin = (input, output) =>
  new HtmlPlugin({
    filename: output,
    template: input
  });

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
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/u,
            chunks: "initial",
            name: "vendor",
            enforce: true
          }
        }
      },

      runtimeChunk: true
    };

    if (isProd) {
      return prodOptimizations;
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
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            autoprefixer()
          ],
          sourceMap: isDev
        }
      }
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
      filename: getFileName("js")
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
      // - https: true,
      overlay: true,
      compress: isProd,
      hot: isDev,
      port: 3000,
      host: "192.168.1.60"
    },

    devtool: isDev
      ? "eval-sourcemap"
      : false,

    module: {
      rules: [
        {
          test: /\.ts$/u,
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
          test: /\.js$/u,
          loader: "babel-loader"
        },

        {
          test: /\.css$/u,
          use: getStyleLoaders()
        },
        {
          test: /\.scss$/u,
          use: getStyleLoaders([ "sass-loader" ])
        },

        {
          test: /\.(?:png|jpg|gif)$/u,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                query: {
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },
                  gifsicle: {
                    interlaced: true
                  },
                  optipng: {
                    optimizationLevel: 7
                  }
                }
              }
            }]
        },
        {
          test: /\.(?:woff2|woff|eot|ttf|svg)$/u,
          include: /fonts/u,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        },

        {
          test: /\.pug$/u,
          use: getHypertextLoaders([ "raw-loader" ])
        },

        {
          test: /\.svg(?:\?.*)?$/u,
          exclude: /fonts/u,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                extract: true,
                publicPath: "/assets/img/"
              }
            },
            "svg-transform-loader",
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  // { removeNonInheritableGroupAttrs: true },
                  // { collapseGroups: true },
                  { removeUselessDefs: false },
                  { cleanupIDs: false },
                  { removeAttrs:
                    {
                      attrs: "(fill|stroke|fill-opacity)"
                    }}
                ]
              }
            }
          ]
        }
      ]
    },

    plugins: [
      getHtmlPlugin("./page-index.pug", "index.html"),

      getHtmlPlugin("./page-uikit-colors.pug", "uikit-colors.html"),
      getHtmlPlugin("./page-uikit-forms.pug", "uikit-forms.html"),
      getHtmlPlugin("./page-uikit-cards.pug", "uikit-cards.html"),
      getHtmlPlugin(
        "./page-uikit-header-footer.pug",
        "uikit-header-footer.html"
      ),

      getHtmlPlugin("./page-landing.pug", "landing.html"),
      getHtmlPlugin("./page-sign-in.pug", "sign-in.html"),
      getHtmlPlugin("./page-sign-up.pug", "sign-up.html"),
      getHtmlPlugin("./page-catalog.pug", "catalog.html"),
      getHtmlPlugin("./page-details.pug", "details.html"),

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
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),

      new ImageminWebpPlugin({
        config: [{
          test: /\.(?:jpe?g|png)/u,
          options: {
            quality: 85
          }
        }]
      })
    ]
  };

  return conf;
};
