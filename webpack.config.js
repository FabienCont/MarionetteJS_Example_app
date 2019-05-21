const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

module.exports = (env,argv)=>{


if(argv.mode === 'production'){
   console.log("PRODUCTION")
}

var config = {
  entry: './src/main.js',
  plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'MarionetteJs'
     }),
     new webpack.ProvidePlugin({
       $: 'jquery',
       _: 'underscore'
     })
   ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
   module: {
     rules: [
       {
         test: /\.m?js$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env']
           }
         }
       },
       {
         test: /\.scss$/,
         use: [
          argv.mode !== 'production' ? 'style-loader' :MiniCssExtractPlugin.loader, // creates style nodes from JS strings
           'css-loader', // translates CSS into CommonJS
           "sass-loader" // compiles Sass to CSS, using Node Sass by default
         ]
       },
       {
          test: /\.svg$/,
          loader:'svg-inline-loader'
        },
       {
         test: /\.dot$/,
         use: {
           loader :'dot-loader',
           options: {
            // let this empty to avoid compiled bug
          }
         },
       }
     ]
   },
   resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
    }
  }
};

if (argv.mode !== 'production') {
   config.devtool= 'inline-source-map',
   config.devServer= {contentBase: './docs'}
 }else{
    config.plugins.push(new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }));
 }

 return config;
};
