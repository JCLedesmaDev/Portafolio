export interface ILoggerDB {
    Tipo: string;
    Usuario: string;
    Fecha: Date;
    Url: string;
    Metodo: string;
    Request: object;
    Response: object;
}