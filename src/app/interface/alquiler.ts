
export interface Alquiler{
    id?: number;
    idSocio: number;
    nombreSocio: string;
    idLibro: number;
    tituloLibro: string;
    //fecha: number | string;
    fecha: number;
    fechaMostrar: string;
    vigente: boolean;
    mostrarVigente: string;
    //fechaDevolucion?: number | string;
    fechaDevolucion?: number;
    fechaDevolucionMostrar?: string;
}