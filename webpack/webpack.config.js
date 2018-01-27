const path = require('path');
const devServer = require('webpack-dev-server');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const entry = require('./webpack_config/entry_webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry:entry,
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:"http://localhost:8081"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader:"css-loader",
                        options:{
                            importLoaders:1
                        }
                    },"postcss-loader"]
                })
            },{
                test:/\.(jpg|jpeg|png|gif)/,
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:500,
                        outputPath:'/images/'
                    }
                }]
            },
            {
                test:/\.html$/i,
                use:['html-withimg-loader']
            },
            {
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"],

                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                })
            },
            {
                test:/\.js$/,
                use:[{
                    loader:"babel-loader",
                    options:{
                        presets:['env']
                    }
                }],
                exclude:'/node_modules/'
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:"./src/index.html",
            chunks:['index']
        }),
        new ExtractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync("./src/*.html")
        }),
        new webpack.BannerPlugin("何云莲所有。。。。。"),
        /* new webpack.ProvidePlugin({
            $:'jquery'
        }), */
        new webpack.optimize.CommonsChunkPlugin({
            name:'jquery',
            filename:'assets/js/jquery.js',
            minChunks:2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:['jquery','vue'],
            filename:'assets/js/vue.js',
            minChunks:2
        }),
        new CopyWebpackPlugin([{
            from:__dirname+'/src/index.html',
            to:'./index1.html'
        }])


        // new UglifyJsPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8081'
    }
}