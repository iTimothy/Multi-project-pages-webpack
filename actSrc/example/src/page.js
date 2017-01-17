module.exports = [
	{
		title: "demo",
		filename: "index.html",
		template: "views/index.ejs", 
		chunks:["lib/g","index"],
		hash: true,
		cache: true
	}
];