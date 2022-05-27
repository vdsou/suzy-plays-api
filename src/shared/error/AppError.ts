class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly data?: object;
  constructor(message: string, statusCode = 400, data?: object) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default AppError;
