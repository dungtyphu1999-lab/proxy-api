export abstract class ExactClass<T> {
  constructor(properties: T) {
    Object.assign(this, properties);
  }
}

export abstract class PartialClass<T> {
  constructor(properties: Partial<T> = {}) {
    Object.assign(this, properties);
  }
}
