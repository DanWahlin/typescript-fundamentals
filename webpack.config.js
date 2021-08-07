const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlPlugins = generateHtmlPlugins('./src');
const entryPoints = generateEntryPoints('./src', 'index.ts');

module.exports = {
  entry: entryPoints,
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name]/style.css' }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false,
    }),
  ].concat(htmlPlugins),
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
  },
};

// Create dist/templateDir/*.html file for each templateDir found in root
// Only include bundle/chunk associated with HTML file
function generateHtmlPlugins(root) {
  let plugins = [];
  const rootDir = fs.readdirSync(path.resolve(__dirname, root));
  // Find directories in root folder
  rootDir.forEach((templateDir) => {
    const stats = fs.lstatSync(path.resolve(__dirname, root, templateDir));
    if (stats.isDirectory() && templateDir !== 'css') {
      // Read files in template directory
      const dirName = templateDir;
      const templateFiles = fs.readdirSync(path.resolve(__dirname, root, templateDir));
      templateFiles.forEach((item) => {
        // Split names and extension
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        // If we find an html file then create an HtmlWebpackPlugin
        if (extension === 'html') {
          // Create new HTMLWebpackPlugin with options
          plugins.push(
            new HtmlWebpackPlugin({
              filename: `${dirName}/index.html`,
              template: path.resolve(__dirname, `${root}/${templateDir}/${name}.${extension}`),
              inject: 'body',
              // Only include bundle/chunk associated with the templateDir directory
              chunks: [`${dirName}`],
            })
          );
        }
      });
    }
  });
  return plugins;
}

// Create an entry point for each directory found in 'root'.
// This will also create a bundle/chunk for each directory
// and place it in the dist/[templateDir] directory.
function generateEntryPoints(root, entryScript) {
  const rootDir = fs.readdirSync(path.resolve(__dirname, root));
  let entryPoints = { css: './src/css/style.scss' };
  rootDir.forEach((templateDir) => {
    const stats = fs.lstatSync(path.resolve(__dirname, root, templateDir));
    if (stats.isDirectory() && templateDir !== 'css') {
      entryPoints[templateDir] = `${root}/${templateDir}/${entryScript}`;
    }
  });
  return entryPoints;
}
