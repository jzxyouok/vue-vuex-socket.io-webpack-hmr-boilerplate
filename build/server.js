'use strict'
const fs = require('fs')
const path = require('path')
const app = require('express')()
const server = require('http').Server(app);
const webpack = require('webpack')
const fse = require('fs-extra')
const webpackConfig = require('./webpack.dev')
const io = require('socket.io')(server)
const config = require('./config')


const port = config.port
webpackConfig.entry.client = [
	`webpack-hot-middleware/client`,
	webpackConfig.entry.client
]

const compiler = webpack(webpackConfig)

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}
})

// Use webpack stuff
app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler))

const mfs = devMiddleWare.fileSystem
const file = path.join(webpackConfig.output.path, 'index.html')

devMiddleWare.waitUntilValid(() => {
	const html = mfs.readFileSync(file)
	fse.ensureDirSync(path.dirname(file))
	fs.writeFile(file, html, 'utf8', err => {
		if (err) console.log(err)
	})
})

server.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})

app.get('*', (req, res) => {
	devMiddleWare.waitUntilValid(() => {
		const html = mfs.readFileSync(file)
		res.end(html)
	})
})

// Socket.io middleware
io.use((socket, next) => {
	if (socket.request.headers.cookie) {
		console.log("auth")
		return next()
	}

	console.log("not-auth")
	next(new Error('Authentication error'))
})

io.on('connection', function(socket) {
	console.log(`Someone connected on socket id: ${ socket.id }`)

	socket.on('sign-in', credentials => {
		console.log('sign-in')
	})
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
