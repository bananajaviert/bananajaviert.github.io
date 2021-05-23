const http = require('http')
const port = 5500

const server = http.createServer((request, response) => {
  response.setHeader('Content-type', 'application/json')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.writeHead(200)// the server is okay
})

server.listen(port, (error) => {
  if(error) {
    console.log(`Error ${error}`)
  } else {
    console.log(`Server is listening!`)
  }
})
