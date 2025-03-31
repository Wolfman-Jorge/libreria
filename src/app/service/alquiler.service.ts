import { Injectable, ViewContainerRef } from '@angular/core';
import { Alquiler } from '../interface/alquiler';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, BehaviorSubject, delay } from 'rxjs';
import { LibroService } from './libro.service';
import { UserService } from './user.service';
import { User } from '../interface/user';
import { Libro } from '../interface/libro';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  
  private alquilerUrl: string = 'http://localhost:8080/library/alquileres';
  public alquiler: Alquiler = {} as Alquiler;
  public selectedAlquiler: Alquiler = {} as Alquiler;
  //Copia de los alquileres en memoria para actualizar el componente sin refrescar la página
  alquileres: Alquiler[] = [];
  users: User[] = [];
  libros: Libro[] = [];
  private url: string = "";

  private alquilerSeleccionadoSource = new BehaviorSubject<Alquiler>(null);
  alquilerSeleccionado$ = this.alquilerSeleccionadoSource.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private libroService: LibroService
  ) { }

  seleccionarAlquiler(alquiler: Alquiler){
    this.alquilerSeleccionadoSource.next(alquiler);
  }


  setAlquileres(alquileres: Alquiler[]):void{
    this.alquileres = alquileres;
  }

  getUser():void{

      this.userService.getUsers().subscribe({
        next: (user)=>{
          this.users = user;
          console.log(user);
        }
      });
  
  }

  getLibros():void{

      this.libroService.getLibros().subscribe({
        next: (libro)=>{
          this.libros = libro;
          console.log(libro);
        }
      });
  
  }

  //Devuelve una fuente de datos
  getAlquileres(): Observable<Alquiler[]>{
    
    this.getUser();
    this.getLibros();
    //return this.http.get<Alquiler[]>(this.alquilerUrl);

    if(this.alquileres.length === 0){
      return this.http.get<Alquiler[]>(this.alquilerUrl).pipe(
        tap(result=> {

          this.alquileres = result;
          this.setSocioLibro(this.alquileres);

        })
      )
    } else {
      return of(this.alquileres);
    }
  }

  setSocioLibro(alqui: Alquiler[]){

    this.getUser();
    this.getLibros();

    alqui.forEach(alquiler=>{
      alquiler.fechaMostrar = (new Date(alquiler.fecha)).toISOString().split('T')[0];
      if(alquiler.vigente){
        alquiler.mostrarVigente = "Vigente";
      } else {
        alquiler.mostrarVigente = "Finalizado";
      }
      
      this.users.forEach((user) => {
        if(alquiler.idSocio === user.id){
          alquiler.nombreSocio = user.nombre;
        }
      });

      this.libros.forEach((libro) => {
        if(alquiler.idLibro === libro.id){
          alquiler.tituloLibro = libro.titulo;
        }
      });

      alquiler.fechaDevolucionMostrar = (new Date(alquiler.fechaDevolucion)).toISOString().split('T')[0];
    })

  }
  
  putAlquiler(alquiler: Alquiler): Observable<any[]>{

    return this.http.put<any[]>(this.alquilerUrl, alquiler)
    .pipe(
      tap(result=>{

        this.libroService.setLibros(result.filter(item=> item.type === 'Libro'));
        this.alquileres = result.filter(item=> item.type === 'Alquiler');
        this.setSocioLibro(this.alquileres);
      })
    );

  }

  deleteAlquiler(alquiler: Alquiler): Observable<Alquiler[]>{
    this.url = `${this.alquilerUrl}/${alquiler.id}`;
    
    return this.http.delete<Alquiler[]>(this.url).pipe(
      tap(result=>{
        this.alquileres = result;
        this.setSocioLibro(this.alquileres);

      } )
    );
  }

  postAlquiler(idSocio: number, idLibro: number): Observable<any[]>{

    this.alquiler.idSocio = idSocio;
    this.alquiler.idLibro = idLibro;

    console.log("entrando en el post");

    return this.http.post<any[]>(this.alquilerUrl, this.alquiler)

    .pipe(
      tap(result=>{
        console.log("dentro de result");
        this.libroService.setLibros(result.filter(item=> item.type === 'Libro'));
        this.alquileres = result.filter(item=> item.type === 'Alquiler');
        this.setSocioLibro(this.alquileres);
      })
    );

  }

  unSelected(){
    this.alquilerSeleccionadoSource.next(null);
  }

}

