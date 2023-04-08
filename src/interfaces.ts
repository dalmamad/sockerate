export type Methods =
  | 'on'
  | 'once'
  | 'onAny'
  | 'prependAny'
  | 'onAnyOutgoing'
  | 'prependAnyOutgoing';

export interface ListenerData {
  eventName: string;
  method: Methods;
  parentEventName?: string;
  propertyKey: string;
  listener: any;
}

export interface Data {
  [key: string]: {
    listeners: ListenerData[];
  };
  noName: {
    listeners: ListenerData[];
  };
}

export interface Options {
  catchError?: boolean;
  prefix?: string;
}

export interface Input {
  listeners: any[];
  errorHandler: Function;
}
