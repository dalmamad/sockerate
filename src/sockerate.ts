/* eslint-disable no-unused-vars */
import Reflect from './reflects';
import { Data, Options, Input } from './interfaces';

class Sockerate {
  private static options: Options = {
    prefix: '',
    catchError: true,
  };

  private static catchError(fn: Function, errorHandler: Function): Function {
    if (this.options.catchError)
      return (payload: any, callback: Function) => {
        try {
          Promise.resolve(fn(payload, callback)).catch((err) => {
            errorHandler(err, callback);
          });
        } catch (err) {
          errorHandler(err, callback);
        }
      };
    return fn;
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
    options: Options
  ): void {
    if (options) Sockerate.handleOptions(options);

    listeners.forEach((listener) => {
      const target = listener.prototype;
      const data: Data = Reflect.getTargetData(target);

      data.noName.listeners.forEach((listenerData) => {
        const allName =
          this.options.prefix +
          (listenerData.parentEventName as string) +
          listenerData.method;

        socket[listenerData.method](
          allName,
          Sockerate.catchError(listenerData.listener, errorHandler)
        );
      });
    });
  }
}

export const { setListeners } = Sockerate;
