import { Injectable } from '@angular/core';
import { Alquiler } from '../interface/alquiler';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  
  private alquilerUrl: string = 'http://localhost:8080/libreria/alquileres';
  public selectedAlquiler: Alquiler = {} as Alquiler;
  //Copia de los alquileres en memoria para actualizar el componente sin refrescar la página
  alquileres: Array<Alquiler> = [];

  constructor(
    private http: HttpClient
  ) { }

  //Devuelve una fuente de datos
  getAlquileres(): Observable<Alquiler[]>{
    
    //return this.http.get<Alquiler[]>(this.alquilerUrl);

    if(this.alquileres.length === 0){
      return this.http.get<Alquiler[]>(this.alquilerUrl).pipe(
        tap(result=> {
          
          result.forEach(alquiler=>{
            alquiler.fecha = (new Date(alquiler.fecha)).toISOString().split('T')[0];
            if(alquiler.vigente){
              alquiler.vigente = "Alquilado";
            } else {
              alquiler.vigente = "Disponible";
            }

            //let arrayFechaIni = (new Date(alquiler.fecha)).toLocaleDateString('es-ES');
            //let arrayFechaIni = (new Date(alquiler.fecha)).toLocaleString('es-ES').split(',')[0];
            //console.log(arrayFechaIni);
            //alquiler.fecha = arrayFechaIni;
            alquiler.fechaDevolucion = (new Date(alquiler.fechaDevolucion)).toISOString().split('T')[0];
            return alquiler;
          },
          this.alquileres = result
        )
        })
      )
    } else {
      return of(this.alquileres);
    }
  }
  
  postAlquiler(alquiler: Alquiler): Observable<Alquiler>{
    //alquiler.fecha = (new Date(alquiler.fecha)).getTime();
    return this.http.post<Alquiler>(this.alquilerUrl, alquiler).pipe(
      tap(result=>{
        result.fecha = (new Date(result.fecha)).toISOString().split('T')[0];
        if(result.vigente){
          result.vigente = "Alquilado";
        }else{
          result.vigente = "Disponible";
        }
        result.fechaDevolucion = (new Date(result.fechaDevolucion)).toISOString().split('T')[0];
        this.alquileres.push(result);
      } 
    ))
  }

  putAlquiler(alquiler: Alquiler): Observable<Alquiler>{

    /*
    this.alquilerUrl = `${this.alquilerUrl}/${alquiler.id}`;

    this.http.put<Alquiler>(this.alquilerUrl, null).pipe(
      tap(result=> alert(result))
    );*/

    alquiler.fecha = (new Date(alquiler.fecha)).getTime();
    alquiler.fechaDevolucion = (new Date(alquiler.fechaDevolucion)).getTime();
    return this.http.put<Alquiler>(this.alquilerUrl, alquiler).pipe(
      //tap(result=> this.alquileres = this.alquileres.filter(f=> f.id === result.id))
      tap(result=> {
          result.fecha = (new Date(result.fecha)).toISOString().split('T')[0];  
          result.fechaDevolucion = (new Date(result.fechaDevolucion)).toISOString().split('T')[0];
          this.deleteAlquiler(alquiler);
          this.alquileres.push(result);
      })
    );
  }

  deleteAlquiler(alquiler: Alquiler): Observable<Alquiler>{
    this.alquilerUrl = `${this.alquilerUrl}/${alquiler.id}`;
    
    return this.http.delete<Alquiler>(this.alquilerUrl).pipe(
      //crea un array de usuarios que no coindiden con el eliminado
      tap(result=> {
        this.alquileres = this.alquileres.filter(f=> f.id != result.id);
        return of(this.alquileres);
      })
    );
  }






}


//Estudio conversión de formato fechas entre Angular y html
//Estudio de Pipes para presentar los datos recibidos del backend
//Estudio de Observables
//Estudio renderizar de forma independiente componentes Angular
