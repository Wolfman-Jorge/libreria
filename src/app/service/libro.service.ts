import { Injectable } from '@angular/core';
import { Libro } from '../interface/libro';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private libroUrl: string = 'http://localhost:8080/library/libros';
  private url: string = "";
  public libro: Libro = {} as Libro;
  public selectedLibro: Libro = {} as Libro;
  //Copia de los libros en memoria para actualizar el componente
  libros: Libro[] = [];

  private libroSeleccionadoSource = new BehaviorSubject<Libro>(null);
  libroSeleccionado$ = this.libroSeleccionadoSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  seleccionarLibro(libro: Libro){
    this.libroSeleccionadoSource.next(libro);
  }

  setLibros(libros: Libro[]):void{
    this.libros = libros;
  }

  //Devuelve una fuente de datos
  getLibros(): Observable<Libro[]>{
    
    //return this.http.get<Libro[]>(this.libroUrl);
    if(this.libros.length === 0){
      return this.http.get<Libro[]>(this.libroUrl).pipe(
        tap(result=> {
          this.libros = result;
          this.setDisponible(this.libros);
        })
      )
    } else {
      //of convierte los argumentos en una secuencia Observable
      return of(this.libros);
    }      
  }

  postLibro(titulo: string): Observable<Libro[]>{

    this.libro.titulo = titulo;

    return this.http.post<Libro[]>(this.libroUrl, this.libro).pipe(
      //acutaliza el array de libros que se muestra en el componente
      tap(result=> {
        this.libros = result;
        this.setDisponible(this.libros);
      })
    );
  }

  setDisponible(libros: Libro[]){

    libros.forEach(libro =>{
      if(libro.alquilado){
        libro.mostrarAlquilado = "Alquilado";
      }else{
        libro.mostrarAlquilado = "Disponible";
      }
    },
    this.libros = libros
    );
  }

  putLibro(libro: Libro): Observable<Libro[]>{

    if(libro.mostrarAlquilado === "Alquilado"){
      libro.alquilado = true;
    }else{
      libro.alquilado = false;
    }

    return this.http.put<Libro[]>(this.libroUrl, libro).pipe(
      tap(result=>{
        this.libros = result;
        this.setDisponible(this.libros);
      })
    );
  }

  deleteLibro(libro: Libro): Observable<Libro[]>{

    this.url = `${this.libroUrl}/${libro.id}`;
    
    return this.http.delete<Libro[]>(this.url).pipe(
      //crea un array de usuarios que no coindiden con el eliminado
      tap(result=> {
        this.libros = result;
        this.setDisponible(this.libros);
      })
    );
  }

  unSelected(){
    this.libroSeleccionadoSource.next(null);
  }

}
