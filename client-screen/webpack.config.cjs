const path = require('path')
const webpack = require('webpack');

// import webpack from 'webpack'
// import path  from 'path';
// import { fileURLToPath } from 'url';


// workaround (cause __filename and __dirname are commonjs features)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */
module.exports = {
    target: 'web',
    entry: "./src/js/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist", "js"),
        publicPath:'/',
        sourceMapFilename: '[file].map',
    },        
    devServer: {
        static: {
            directory:path.resolve(__dirname, "dist", "js"),        
        },
        hot: true,
        open: true,
        port:3002,
        allowedHosts: "all",
        client: {
            overlay:false,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        sourceMaps: true
                    }
                },                
            },
        ],
    },
    mode: 'development', // this is unminified. for mini set to 'production'    
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
        // new Dotenv({
        //     path: "./.env"
        // })
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        //     Buffer: ['buffer', 'Buffer'], // Ensure Buffer is available in the browser
        //   }),
    ],        
}