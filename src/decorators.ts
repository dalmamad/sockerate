import Reflect from './reflects';
import { ListenerData } from './interfaces';

export function Listener(event = '') {
  return (target: Function) => {
    Reflect.addParentiData(event, target.prototype);
  };
}

export function On(eventName = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const data: ListenerData = {
      method: 'on',
      listener: descriptor.value,
      propertyKey,
      eventName,
    };
    Reflect.addListenerData(data, target);
  };
}

export function Once(eventName = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const data: ListenerData = {
      method: 'once',
      listener: descriptor.value,
      propertyKey,
      eventName,
    };
    Reflect.addListenerData(data, target);
  };
}

export function OnAny(eventName = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const data: ListenerData = {
      method: 'onAny',
      listener: descriptor.value,
      propertyKey,
      eventName,
    };
    Reflect.addListenerData(data, target);
  };
}

export function PrependAny(eventName = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const data: ListenerData = {
      method: 'prependAny',
      listener: descriptor.value,
      propertyKey,
      eventName,
    };
    Reflect.addListenerData(data, target);
  };
}

export function OnAnyOutgoing(eventName = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const data: ListenerData = {
      method: 'onAnyOutgoing',
      listener: descriptor.value,
      propertyKey,
      eventName,
    };
    Reflect.addListenerData(data, target);
  };
}

export function PrependAnyOutgoing(eventName = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const data: ListenerData = {
      method: 'prependAnyOutgoing',
      listener: descriptor.value,
      propertyKey,
      eventName,
    };
    Reflect.addListenerData(data, target);
  };
}
