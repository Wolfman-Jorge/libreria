import { Injectable, ViewContainerRef } from '@angular/core';
import { Alquiler } from '../interface/alquiler';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, BehaviorSubject } from 'rxjs';
import { LibroService } from './libro.service';
import { UserService } from './user.service';
import { User } from '../interface/user';
import { Libro } from '../interface/libro';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  
  private alquilerUrl: string = 'http://localhost:8080/libreria/alquileres';
  public alquiler: Alquiler = {} as Alquiler;
  public selectedAlquiler: Alquiler = {} as Alquiler;
  //Copia de los alquileres en memoria para actualizar el componente sin refrescar la página
  alquileres: Alquiler[] = [];
  users: User[] = [];
  libros: Libro[] = [];
  private url: string = "";

  private alquilerSeleccionadoSource = new BehaviorSubject<Alquiler>(null);
  alquilerSeleccionado = this.alquilerSeleccionadoSource.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private libroService: LibroService
  ) { }

  seleccionarAlquiler(alquiler: Alquiler){
    this.alquilerSeleccionadoSource.next(alquiler);
  }

 // constructor(private viewContainer: ViewContainerRef) {}  loadContent() {    this.viewContainer.createComponent(LeafContent);  }



  getUser():void{
    /*Se utiliza el servicio para acceder al get que accede a datos
    this.userService.getUser()
      .subscribe(users => this.users = users); //Esto funciona de forma asíncrona
      //subscribe "convierte" el array que se recibe de forma asíncrona y lo almacena en la propiedad users[]
  */
      this.userService.getUsers().subscribe({
        next: (user)=>{
          this.users = user;
          console.log(user);
        }
      });
  
  }

  getLibros():void{
    /*Se utiliza el servicio para acceder al get que accede a datos
    this.libroService.getLibro()
      .subscribe(libro => this.libro = libro); //Esto funciona de forma asíncrona
      //subscribe "convierte" el array que se recibe de forma asíncrona y lo almacena en la propiedad libros[]
  */
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
          /*
          this.alquileres.forEach(alquiler=>{
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

            //let arrayFechaIni = (new Date(alquiler.fecha)).toLocaleDateString('es-ES');
            //let arrayFechaIni = (new Date(alquiler.fecha)).toLocaleString('es-ES').split(',')[0];
            //console.log(arrayFechaIni);
            //alquiler.fecha = arrayFechaIni;
            alquiler.fechaDevolucionMostrar = (new Date(alquiler.fechaDevolucion)).toISOString().split('T')[0];
            //return alquiler;
          }
        )*/
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

      //let arrayFechaIni = (new Date(alquiler.fecha)).toLocaleDateString('es-ES');
      //let arrayFechaIni = (new Date(alquiler.fecha)).toLocaleString('es-ES').split(',')[0];
      //console.log(arrayFechaIni);
      //alquiler.fecha = arrayFechaIni;
      alquiler.fechaDevolucionMostrar = (new Date(alquiler.fechaDevolucion)).toISOString().split('T')[0];
      //return alquiler;
    })

  }
  
  putAlquiler(alquiler: Alquiler): Observable<Alquiler[]>{

    /*
    this.alquilerUrl = `${this.alquilerUrl}/${alquiler.id}`;

    this.http.put<Alquiler>(this.alquilerUrl, null).pipe(
      tap(result=> alert(result))
    );*/
/*
    this.alquiler.fecha = (new Date(fechaEntrega)).getTime();
    this.alquiler.vigente = vigente;
    this.alquiler.fechaDevolucion = (new Date(fechaDevolucion)).getTime();


    if(alquiler.mostrarVigente === "Vigente"){
      alquiler.vigente = true;
    }else{
      alquiler.vigente = false;
    }
*/
    return this.http.put<Alquiler[]>(this.alquilerUrl, alquiler).pipe(
      //tap(result=> this.alquileres = this.alquileres.filter(f=> f.id === result.id))
      tap(result=> {
        /*
          result.fechaMostrar = (new Date(result.fecha)).toISOString().split('T')[0];  
          result.fechaDevolucionMostrar = (new Date(result.fechaDevolucion)).toISOString().split('T')[0];
          */
          this.alquileres = result;
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
        //return of(this.alquileres);
    );
  }
/*
  postAlquiler(idSocio: number, idLibro: number): Observable<Alquiler>{

    this.alquiler.idSocio = idSocio;
    this.alquiler.idLibro = idLibro;

    console.log("entrando en el post");

    return this.http.post<Alquiler>(this.alquilerUrl, this.alquiler).pipe(
      tap(result=>{
        console.log("dentro del tap");
        this.alquileres.push(result);
        this.setSocioLibro(this.alquileres);
      })
    );
  }
*/

postAlquiler(idSocio: number, idLibro: number): Observable<Alquiler>{

  this.alquiler.idSocio = idSocio;
  this.alquiler.idLibro = idLibro;

  console.log("entrando en el post");

  return this.http.post<Alquiler>(this.alquilerUrl, this.alquiler).pipe(
    tap(result=>{
      console.log("dentro del tap");
      this.alquileres.push(result);
      this.setSocioLibro(this.alquileres);
    })
  );
}


  unSelected(){
    this.selectedAlquiler = null;
  }

}


//Estudio conversión de formato fechas entre Angular y html
//Estudio de Pipes para presentar los datos recibidos del backend
//Estudio de Observables
//Estudio renderizar de forma independiente componentes Angular
// LLM studio

//actualizar libros(disponible) despues de alquilar
//no eliminar libro alquilado
//preguntar si está seguro antes de eliminar
//validar email

//al crear un alquiler no actualiza la lista de libros sin refrescar PROBAR CON LA VARIABLE QUE SE PASA A TRAVÉS DE LA OUTPUT()
//al devolver un libro no actualiza la lista de libros sin refrescar
//limpiar las cajas de texto cada vez que se pulsa un botón del dashboard

//modificaciones en la lógica de eliminación de registros
//implementar alertas y confirmaciones antes de eliminar registros
