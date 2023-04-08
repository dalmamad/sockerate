// import { io } from 'socket.io-client';
// import { Server } from 'socket.io';
// import { setListeners, On, Listener } from '../src/index';
//
// const socketClient = io('ws://localhost:3000');
//
// beforeAll(() => {
//   @Listener('/msg')
//   class Class {
//     @On('/new')
//     async method(socket: any, data: any, callback: any) {
//       console.log(socket);
//       console.log(data);
//       // callback({ status: 'ok' });
//     }
//   }
//
//   const ioServer = new Server(3000);
//   ioServer.on('connection', (socket) => {
//     socket.on('hii', (data) => {
//       console.log(data);
//     });
//   });
// });
//
// describe('User controllers', () => {
//   test('Get data', () => {
//     socketClient.emit('hii', { hi: 'world' });
//     expect(1).toEqual(1);
//     // const res = await request(app).get('/api/data/get');
//     // expect(res.body.status).toEqual(200);
//   });
// });
//
//
//
// import { Server } from 'socket.io';
// import { setListeners, On, Listener } from '../src/index';
//
// @Listener('/msg')
// class Class {
//   @On('/new')
//   method(socket: any, data: any, callback: any) {
//     throw 'xxxxxxxxx';
//     console.log('44444');
//     // console.log(socket);
//     console.log(data);
//     callback({ status: 'ok' });
//   }
// }
//
// const io = new Server(3000);
// function errorHandler(err: any, res: any) {
//   console.log('ssssssss');
//   console.log(err);
//   res({ err });
// }
// io.on('connection', (socket) => {
//   socket.on('hii', (data) => {
//     console.log(data);
//   });
//
//   setListeners(socket, { listeners: [Class] });
// });
