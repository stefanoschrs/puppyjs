const version = require('../package').version

module.exports = () => `
version ${version}
puppy [argument] [options]
   arguments
   server:              start mock servers
   options
   -h  --help:          show this help
   -v:                  verbose
       --version:       version
       
       --ws:            web socket setup file
       --api:           api setup file
       --config:        config file
       
       --port:          static server port defaults to 8080
       --ws-port:       web socket server port defaults to --api-port
       --api-port:      api server port defaults to --port
       
       --ws-url:        web socket endpoint path defaults to /ws
       --index-file:    index file defaults to index.html
       --static-dir:    static files directory default to ./dist
`