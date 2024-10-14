import { Injectable } from '@angular/core';
import { Libro } from '../interface/libro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  
  private libroUrl: string = 'http://localhost:8080/libreria/libros';

  constructor(
    private http: HttpClient
  ) { }

  //Devuelve una fuente de datos
  getLibro(): Observable<Libro[]>{
    
    return this.http.get<Libro[]>(this.libroUrl);
  }

}
