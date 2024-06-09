class ErrorHandler {
  public getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;

    return String(error);
  }
}

export const errorHandler = new ErrorHandler();
