# puppyjs 

![npm](https://img.shields.io/npm/l/puppyjs.svg?style=flat-square)
![npm](https://img.shields.io/npm/v/puppyjs.svg?style=flat-square)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/michaelthe/puppyjs/master.svg?style=flat-square)
![CircleCI branch](https://img.shields.io/circleci/project/github/michaelthe/puppyjs/master.svg?style=flat-square)

## puppeteer + jest + awesome-code = puppyjs

Puppyjs is a framework agnostic e2e testing and mocking tool for front end developers.
Puppy depends on jest for tests and puppeteer for the testing environment, if you know jest and puppeteer then you 80% know puppy.
Puppy also lets you mock http APIs and web socket events so you both; 
develop your application until the backend is ready; 
and, run your e2e test against the same mock API and socket events you used for development.  

## Install  
```bash
npm install puppyjs --save-dev
```

### Install globally
```bash
npm install puppyjs --global
```

## Get some help
```bash
puppy --help
```

## Run mocking servers
```bash
puppy serve
```

## Run tests
```bash
puppy test
```

## The puppy config file `puppy.config.js`

```javascript
const path = require('path')

module.exports = {
  'ws': path.resolve(process.cwd(), 'puppy.ws.js'),
  'api': path.resolve(process.cwd(), 'puppy.api.js'),

  'port': 8080,
  'ws-port': 8080,
  'api-port': 8080,

  'verbose': false,
  'headless': false,

  'ws-url': '/ws',
  'index-file': 'index.html',
  'static-dir': path.resolve(process.cwd(), 'dist'),
}

```

## The puppy web socket file `puppy.ws.js`

API

   * Events: Array(Object)
   
   * Event: 
      * label: String **optional**
      * delay: Number **optional**
      * interval: Number **optional**
      * messages: \<Object | function>[] | Object | Function

```javascript
const users = [
  {name: 'Andrew', email: '9pitop@gmail.com', age: 44},
  {name: 'Kostis', email: 'yolo@gmail.com', age: 35}
]

module.exports = [
  {
    delay: 1000,
    interval: 1000,
    messages: [
      users,
      {seen: false, createdAt: Date.now(), text: 'I am a notification'}
    ]
  },
  {
    messages: async () => {
      const items = [12,3,52,23]
      return items[Math.floor(Math.random()*items.length)]
    },
    interval: 3000
  }
]
```

## The puppy api file `puppy.api.js`

```javascript
// TODO: add sample 
```
