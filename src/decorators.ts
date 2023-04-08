// import Reflect from './reflects';
// import { HandlerData } from './interfaces';
//
// export function Controller(path: string) {
//   return (target: Function) => {
//     Reflect.addControllerData(path, target.prototype);
//   };
// }
//
// export function Mw(func: Function): Function {
//   return (target: any, propertyKey: string) => {
//     Reflect.addMiddleWareData(func, target, propertyKey);
//   };
// }
//
// export function Get(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'get',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
//
// export function Post(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'post',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
//
// export function Delete(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'delete',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
//
// export function Put(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'put',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
//
// export function Patch(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'patch',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
//
// export function Head(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'head',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
//
// export function All(path: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const data: HandlerData = {
//       method: 'all',
//       handler: descriptor.value,
//       propertyKey,
//       path,
//     };
//     Reflect.addHandlerData(data, target);
//   };
// }
