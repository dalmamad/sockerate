/* eslint-disable no-unused-vars */
import Reflect from './reflects';
import { Data, Options, Input } from './interfaces';

class Sockerate {
  private static options: Options = {
    prefix: '',
    catchError: true,
  };

  private static errorHandler(err: any) {
    console.log(err);
  }

  private static catchError(
    socket: any,
    fn: Function,
    errorHandler: Function
  ): Function {
    if (this.options.catchError)
      return (data: any, callback: undefined) => {
        try {
          Promise.resolve(fn(socket, data, callback)).catch((err) => {
            errorHandler(err, callback);
          });
        } catch (err) {
          errorHandler(err, callback);
        }
      };
    return (data: any, callback: Function) => fn(socket, data, callback);
  }

  private static handleOptions(options: Options): void {
    const optionKeys = Object.keys(options) as [keyof Options];
    optionKeys.forEach((option) => {
      this.options[option] = options[option] as any;
    });
  }

  static setListeners(
    socket: any,
    { listeners, errorHandler }: Input,
    options?: Options
  ): void {
    if (options) Sockerate.handleOptions(options);

    if (errorHandler) Sockerate.errorHandler = errorHandler;

    listeners.forEach((listener) => {
      const target = listener.prototype;
      const data: Data = Reflect.getTargetData(target);

      data.noName.listeners.forEach((listenerData) => {
        const allName =
          Sockerate.options.prefix +
          (listenerData.parentEventName as string) +
          listenerData.eventName;

        socket[listenerData.method](
          allName,
          Sockerate.catchError(
            socket,
            listenerData.listener,
            Sockerate.errorHandler
          )
        );
      });
    });
  }
}

export const { setListeners } = Sockerate;
