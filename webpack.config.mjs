import { resolve } from 'node:path';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const target = 'browserslist:browserslist config, not maintained node versions';
export default () => {
  return {
    entry: './website/root.tsx',
    target,
    output: {
      clean: true,
      path: path.resolve(process.cwd(), 'docs'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },

    devtool: 'eval-cheap-module-source-map',

    devServer: {
      open: true,
      client: {
        overlay: false
      },
      static: false
    },

    stats: {
      assets: false,
      entrypoints: false,
      modules: false
    },

    performance: {
      hints: false
    },

    resolve: {
      alias: {
        lodash: resolve('./node_modules/lodash-es')
      },
      extensions: ['.js', '.ts', '.tsx']
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: ['...', new CssMinimizerPlugin()]
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-nested']
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './website/index.html'
      })
    ]
  };
};
