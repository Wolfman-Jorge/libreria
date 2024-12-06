
export interface Alquiler{
    id?: number;
    idSocio: number;
    idLibro: number;
    fecha: number | string;
    vigente: string;
    fechaDevolucion?: number | string;
}