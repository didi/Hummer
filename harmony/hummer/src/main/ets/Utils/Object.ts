
export class ObjectBridge {
  static assign<T extends {}, U>(target: T, source: U): T & U

  static assign<T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;

  static assign<T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

  static assign(target: object, ...sources: any[]): any {
    return Object.assign(target, ...sources);
  }
}