export class CustonError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustonError(400, message);
  }

  static unaUtherized(message: string) {
    return new CustonError(401, message);
  }
  static forbidden(message: string) {
    return new CustonError(403, message);
  }

  static notFound(message: string) {
    return new CustonError(404, message);
  }
  static internalServer(message: string) {
    return new CustonError(500, message);
  }
}
