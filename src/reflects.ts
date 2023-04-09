import { ListenerData } from './interfaces';

const namelessProperty = 'noName';
const listenersKey = 'listeners';
const allListeners = 'allListeners';

export default class Reflect {
  private static allData: Map<any, any> = new Map();

  public static getTargetData(target: any) {
    return this.allData.get(target);
  }

  public static addParentiData(parentEventName: string, target: any) {
    const listenersData: ListenerData[] = this.getData(listenersKey, target);
    listenersData.forEach((listenerData: ListenerData) => {
      listenerData.parentEventName = parentEventName;
    });
  }

  public static addListenerData(newListenerData: any, target: any) {
    if (!this.getData(listenersKey, target))
      this.setData(listenersKey, [], target);
    const listenersData: ListenerData[] = this.getData(listenersKey, target);
    listenersData.push(newListenerData);
  }

  public static setListener(
    listener: Function,
    target: Function,
    propertyKey: string
  ) {
    Reflect.setData(allListeners, listener, target, propertyKey);
  }

  public static getListener(target: Function, propertyKey: string) {
    return Reflect.getData(allListeners, target.prototype, propertyKey);
  }

  public static setData(
    dataKey: string,
    data: any,
    target: any,
    propertyKey?: string
  ) {
    if (!propertyKey) propertyKey = namelessProperty;
    if (!this.allData.get(target)) this.allData.set(target, {});
    const targetValue = this.allData.get(target);
    if (!targetValue[propertyKey]) targetValue[propertyKey] = {};
    const propertyValue = targetValue[propertyKey];
    propertyValue[dataKey] = data;
    return this.allData;
  }

  public static getData(key: string, target: any, propertyKey?: string) {
    if (!propertyKey) propertyKey = namelessProperty;
    const targetData = this.allData.get(target);
    return targetData?.[propertyKey]?.[key];
  }
}

export const { getListener } = Reflect;
