interface ISource {
  message: string;
  stack: string;
}

interface IConstructor {
  message: string;
  source?: any;
  status?: number
}

export class ApplicationError extends Error {
  name: string;
  status: number;
  message: string;
  source!: ISource; // El signo ! indica que puede ser undefined

  constructor(DataConstructor: IConstructor) {
    const { message, source, status } = DataConstructor
    super(message)

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name
    this.message = message || 'Ocurrio un error al querer hacer esta operacion'
    this.status = status || 500
    if (source) {
      this.source = {
        message: source.message ?? source,
        stack: source.stack ?? 'No tiene stack porque no es un objecto error',
      }
    }
    Error.captureStackTrace(this, this.constructor)
  }
}
