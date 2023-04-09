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

// export function OnAny() {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: ListenerData = {
//       method: 'onAny',
//       listener: descriptor.value,
//       propertyKey,
//     };
//     Reflect.addListenerData(data, target);
//   };
// }
//
// export function PrependAny() {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: ListenerData = {
//       method: 'prependAny',
//       listener: descriptor.value,
//       propertyKey,
//     };
//     Reflect.addListenerData(data, target);
//   };
// }
//
// export function OnAnyOutgoing() {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: ListenerData = {
//       method: 'onAnyOutgoing',
//       listener: descriptor.value,
//       propertyKey,
//     };
//     Reflect.addListenerData(data, target);
//   };
// }
//
// export function PrependAnyOutgoing() {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: ListenerData = {
//       method: 'prependAnyOutgoing',
//       listener: descriptor.value,
//       propertyKey,
//     };
//     Reflect.addListenerData(data, target);
//   };
// }
