const path = require("path");

module.exports = {
	entry: "./src/analytics.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		loaders: [
			{
				test: /\.js?/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["env"]
				}
			}
		]
	},
	devtool: "source-map"
};