# Sockerate

This minimal package helps you to create [socket.io](https://socket.io/) listeners using decorators in Typescript.

## Features

- very minimal and lightweight
- catching both synchronous and asynchronous errors which are not handled in [socket.io](https://socket.io/docs/v4/listening-to-events/#error-handling)
- makes your code cleaner

## Installation

1. install `socket.io` and `sockerate`:

```bash
npm install sockerate --save-exact
npm install socket.io
```

2. in `tsconfig.json` set these options:

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Usage

1. create a class and use `@On` decorator on your method. you can also use `@Listener` decorator to add a prefix for your class methods.
   let's take a look at an example:

```typescript
// in messageListener.ts file
import { On, Listener } from 'sockerate';

@Listener('/message')
export default class MyClass {
  @On('/new')
  newMsg(socket: any, data: any, callback: any) {
    // your logic
  }
}

// or you can ignore Listener decorator
export default class MyClass {
  @On('/message/new')
  newMsg(socket: any, data: any, callback: any) {
    // your logic
  }
}
```

each method takes 3 arguments:

- **socket**
- **data:** which you take from client. client also need to put all the data in this argument.
- **callback:** which you can use as the last argument to be the [Acknowledgement](https://socket.io/docs/v3/emitting-events/#acknowledgements)

2. now you need to pass your `listeners` as an array to `setListeners` as example:

```typescript
// in socket.ts file
import { Server } from 'socket.io';
import { setListeners } from 'sockerate';
import MyClass from './messageListener';

const io = new Server(3000);

io.on('connection', (socket) => {
  console.log('new connection');
  setListeners(socket, { listeners: [MyClass] });
});
```

now you should be able to exchange data with cleints in `/message/new` eventName:

```typescript
const { io } = require('socket.io-client');

const socket = io('ws://localhost:3000');

socket.emit('/msg', 'msg', (res) => {
  console.log(res);
});
```

## Methods

for now only `@On` and `@Once` decorators (whcich are equivalent of `socket.on()` and `socket.once()` methods) are handled. but you can use other [socket.io methods](https://socket.io/docs/v4/listening-to-events/) as before alongside this package.

## ErrorHandler

by default both synchronous and asynchronous errors will be catched. but it is recommended to define your `errorrHandler` and pass it to `setListeners` as below:

```typescript
// define your errorHandler
function errorHandler(err: any, callback: any) {
  console.log(err);
  /* MAKE SURE to check callback type to be a function
     cuz it also depends on client to use it
     and your app will have UNCATCHED ERROR  if client don't use it */
  if (typeof callback === 'function') callback({ err });
}

//pass it to setListeners
setListeners(socket, { listeners: [MyClass], errorHandler });
```

## GetLisener

to use some of the methods such as `socket.off()` ([see here](https://socket.io/docs/v4/listening-to-events/#socketoffeventname-listener)) you need your listeners.

for this you can use `getLisener(Class, propertyKey)` to get the listener. for example to get the listener defiend in first example:

```typescript
import MyClass from './messageListener';
import { getLisener } from 'sockerate';

const listener = getLisener(MyClass, 'newMsg');

// now you can use it in socket.off()
socket.off('/message/new', listener);
```

## Options

two options are provided:

- **catchError:** default value is `true`. you can disable this option and handle error in each method by your own
- **prefix:** you can set it to add a prefix behind all eventNames

you can change them in `setListeners`:

```typescript
const options = {
  catchError: true,
  prefix: 'something',
};
setListeners(socket, { listeners, err }, options);
```
