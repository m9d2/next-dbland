export default class R<T> {
  code: number;
  data: T;
  message?: string;

  constructor(code: number, data: T, message?: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  static ok<T>(data: T, message?: string): R<T> {
    return new R(200, data, message ? message : 'success');
  }
  
}