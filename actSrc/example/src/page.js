module.exports = [
	{
		title: "demo",
		filename: "index.html",
		template: "views/index.ejs", 
		chunks:["lib/g","index"],
		hash: true,
		cache: true
	},
	{
		title: "demo2",
		filename: "demo2.html",
		template: "views/demo2.ejs", 
		chunks:["b"],
		hash: true,
		cache: true
	}
];