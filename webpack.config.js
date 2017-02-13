
var path = require('path');
var base = require("./base");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var isProd = base.isProd;

var dist = path.join(__dirname, base.root, base.projectName);
var projectSrc = path.join(__dirname, base.root, base.projectName,'src/');

var extractCSS = new ExtractTextPlugin('css/[name].css?[hash:8]');
var extractSASS = new ExtractTextPlugin('css/[name].css?[hash:8]');

var plugins = [];
var entryObj = {};

if(isProd){
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
	);
}
plugins.push(extractCSS);
plugins.push(extractSASS);

base.pageConfig.map(function(item,i) {
	base.pageConfig[i].template = projectSrc+base.pageConfig[i].template;
	base.pageConfig[i].chunks.map(function(_item,_i){
		if(entryObj[_item] != base.sourceList.jsList[_item]){
			entryObj[_item] = base.sourceList.jsList[_item]	
		}
	})
	plugins.push(new HtmlWebpackPlugin(base.pageConfig[i]));
});

module.exports = {
    entry: entryObj,
    output: {
        path: dist,
        filename: "js/[name].js",
        chunkFilename: "js/[chunkhash].js",
        publicPath: isProd ? "./" : "/"
    },
    resolve: {
	    extensions: ['', '.coffee', '.js','.es6','.css','.scss','.png','.jpg','.jpeg','.gif']
	},
    module: {
        loaders: [
	        {
	            test: /\.css$/,
	            loader: extractCSS.extract(['css','postcss'])
	        },
	        {
	        	test: /\.ejs$/, 
	        	loader: 'ejs-compiled?src='+path.join(projectSrc,'views/')
	        },
	        {
	            test: /\.js$/,
	            exclude: /node_modules/,
	            loader: 'babel-loader',
	            query: {
	                presets: ['es2015', 'stage-2'],
	                cacheDirectory:'',
	                plugins: ["transform-runtime"]
	            }
	        }, 
	        {
	            test: /\.scss$/,
	            loader: extractSASS.extract(['css','sass','postcss']),
	            exclude: /node_modules/
	        },
	        {
				test: /\.(png|gif|jpe?g|svg|eot|ttf|woff|woff2)$/,
				loader: 'url?limit=8192&name=images/[name].[ext]?[hash:8]!image-webpack?{ progressive:true, optimizationLevel: 7 }',
				exclude: /node_modules/
			}
        ]
    },
    'ejs-compiled-loader': {
		'htmlmin': false,
		'htmlminOptions': {
			removeComments: false
		}
	},
    postcss:[autoprefixer()],
    plugins:plugins,
	devServer: {
		contentBase:dist,
		colors: true,
		historyApiFallback: true,
		inline: true
		//progress: true
	},
	devtool: isProd ? '' : 'source-map'
}
