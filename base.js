var files = [];
var path = require('path'),
    fs = require('fs'),
    minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
    string: ['src', 'mode']
});
var src = argv.src;
var mode = argv.mode;
var isProd = argv.mode === 'prod' ? true : false;

var ScanDir = function(path) {
    var that = this
    if (fs.statSync(path).isFile()) {
        return files.push(path)
    }
    try {
        fs.readdirSync(path).forEach(function(file) {
            ScanDir.call(that, path + '/' + file)
        })
    } catch (e) {}
};

var projectList = fs.readdirSync('./actSrc');

if (projectList.indexOf(src) < 0) {
    console.error('project not found');
    process.exit();
}

var project = path.join(__dirname,'actSrc',src);
var pageConfigPath = path.join(project,'src','page.json');

var isExists = fs.existsSync(pageConfigPath);
if(!isExists){
	console.error('page.json not found!');
	process.exit()
}

var pageConfig = JSON.parse(fs.readFileSync(pageConfigPath,'utf-8')).pageList;

ScanDir(project);

var sourceList = {
	jsList:{},
	imgList:{},
	scssList:{},
	cssList:{},
	htmlList:{}
};
files.map((item,i)=>{

	var extname = path.extname(item);
	var basename = path.basename(item,extname);
	switch(extname){
		case '.js':
			sourceList.jsList[basename] = item;
			break;
		case '.gif':
			sourceList.imgList[basename] = item;
			break;
		case '.jpg':
			sourceList.imgList[basename] = item;
			break;
		case '.png':
			sourceList.imgList[basename] = item;
			break;
		case '.jpeg':
			sourceList.imgList[basename] = item;
			break;
		case '.scss':
			sourceList.scssList[basename] = item;
			break;
		case '.css':
			sourceList.cssList[basename] = item;
			break;
		case '.html':
			sourceList.htmlList[basename] = item;
			break;
	}
});

module.exports = {
	projectName: src,
	sourceList: sourceList,
	pageConfig: pageConfig,
	isProd: isProd
};
