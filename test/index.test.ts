import { createServer } from 'http';
import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import { setListeners, On, Listener, getListener, Once } from '../src/index';

describe('my project', () => {
  let serverIo: any;
  let serverSocket: any;
  let clientSocket: any;

  function errorHandler(err: any, res: any) {
    expect(err).toBe(true);
    res({ err });
  }

  beforeEach((done) => {
    const httpServer = createServer();
    serverIo = new Server(httpServer);
    httpServer.listen(3000, () => {
      clientSocket = io('http://localhost:3000');
      serverIo.on('connection', (socket: any) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterEach(() => {
    serverIo.close();
    clientSocket.close();
  });

  test('testing on method', (done) => {
    @Listener('/msg')
    class MyClass {
      @On('/new')
      async fn(socket: any, data: any, callback: any) {
        expect(data).toBe(true);
        callback({ status: true });
      }
    }
    setListeners(serverSocket, { listeners: [MyClass] });

    clientSocket.emit('/msg/new', true, (data: any) => {
      expect(data.status).toBe(true);
      done();
    });
  });

  test('decorators without arg and with prefix', (done) => {
    class MyClass {
      @On()
      async fn(socket: any, data: any, callback: any) {
        expect(data).toBe(true);
        callback({ status: true });
      }
    }
    setListeners(serverSocket, { listeners: [MyClass] }, { prefix: '/socket' });

    clientSocket.emit('/socket', true, (data: any) => {
      expect(data.status).toBe(true);
      done();
    });
  });

  test('testing errorHandler', (done) => {
    @Listener('/msg')
    class MyClass {
      @On('/new')
      async fn(socket: any, data: any, callback: any) {
        throw true;
      }
    }
    setListeners(
      serverSocket,
      { listeners: [MyClass], errorHandler },
      { prefix: '' }
    );

    clientSocket.emit('/msg/new', true, (data: any) => {
      expect(data.err).toBe(true);
      done();
    });
  });
  test('testing get listeners', (done) => {
    @Listener('/msg')
    class MyClass {
      @On('/new')
      async fn(socket: any, data: any, callback: any) {
        throw true;
      }
    }
    setListeners(serverSocket, { listeners: [MyClass] });
    let ls = getListener(MyClass, 'fn');
    expect(ls).toBeTruthy();
    done();
  });
});
