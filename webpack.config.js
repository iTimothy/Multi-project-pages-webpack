var path = require('path');
var base = require("./base");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var mode = base.mode
var isProd = base.isProd;
var publicPath = base.publicPath
var isDevProd = mode === 'devprod'
// var kkwap = base.kkwap

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
        //publicPath: isProd ? (publicPath ?( !kkwap ? '/acts/projects/'+base.projectName+'/' : '/kkwap/acts/projects/'+base.projectName+'/' ): "./") : "/",
        //publicPath: (isProd || isDevProd) ? (publicPath === 'true' ? ('/acts/projects/'+base.projectName+'/') :  ( (publicPath !== '' && publicPath) ? '/'+publicPath+'/acts/projects/'+base.projectName+'/' : '/acts/projects/'+base.projectName+'/' )  ) : '/'
        publicPath: (isProd || isDevProd) ? (publicPath === 'true' ? ('/acts/projects/'+base.projectName+'/') :  ( (publicPath !== '' && publicPath) ? publicPath+'/' : '/acts/projects/'+base.projectName+'/' )  ) : '/'
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
	            loader: extractSASS.extract(['css','postcss','sass']),
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
		outputPath: dist,
		colors: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port:8088,
		autoOpenBrowser: true,
		proxy: {
	        '/kkapi': {
	          target: 'http://192.168.1.240/',
	          pathRewrite: {'^/kkapi' : '/kkapi'},
	          changeOrigin: true
	        },
	        '/Kkzc': {
	          target: 'http://192.168.1.240/',
	          pathRewrite: {'^/Kkzc' : '/Kkzc'},
	          changeOrigin: true
	        },
	        '/resources': {
	          target: 'http://192.168.1.240/',
	          pathRewrite: {'^/resources' : '/resources'},
	          changeOrigin: true
	        }
	    }
	},
	devtool: (isProd && !isDevProd) ? '' : 'source-map'
}