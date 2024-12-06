import { Injectable } from '@angular/core';
import { Libro } from '../interface/libro';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private libroUrl: string = 'http://localhost:8080/libreria/libros';
  public selectedLibro: Libro = {} as Libro;
  //Copia de los libros en memoria para actualizar el componente
  libros: Array<Libro> = [];

  constructor(
    private http: HttpClient
  ) { }

  //Devuelve una fuente de datos
  getLibros(): Observable<Libro[]>{
    
    //return this.http.get<Libro[]>(this.libroUrl);
    if(this.libros.length === 0){
      return this.http.get<Libro[]>(this.libroUrl).pipe(
        tap(result=> {
          result.forEach(libro =>{
            if(libro.alquilado){
              libro.alquilado = "Alquilado";
            }else{
              libro.alquilado = "Disponible";
            }
          },
          this.libros = result
        )
        })
      )
    } else {
      //of convierte los argumentos en una secuencia Observable
      return of(this.libros);
    }      
  }

  postLibro(libro: Libro): Observable<Libro>{
    return this.http.post<Libro>(this.libroUrl, libro).pipe(
      //acutaliza el array de libros que se muestra en el componente
      tap(result=> {
        if(result.alquilado){
          result.alquilado = "Alquilado";
        }else{
          result.alquilado = "Disponible";
        }
        this.libros.push(result)
      })
    );
  }

  putLibro(libro: Libro): Observable<Libro>{

    return this.http.put<Libro>(this.libroUrl, libro).pipe(
      tap(result=> this.libros = this.libros.filter(f=> f.id === result.id))
    );
  }

  deleteLibro(libro: Libro): Observable<Libro>{
    this.libroUrl = `${this.libroUrl}/${libro.id}`;
    
    return this.http.delete<Libro>(this.libroUrl).pipe(
      //crea un array de usuarios que no coindiden con el eliminado
      tap(result=> this.libros = this.libros.filter(f=> f.id !== result.id))
    );
  }

}
