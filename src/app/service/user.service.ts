import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable, tap, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

//Injectable marca esta clase como participante en el sistema de inyección de dependencias
@Injectable({
  providedIn: 'root'
})

//UserService proporcionará servicios inyectables y puede tener dependencias
export class UserService {

  private socioUrl: string = 'http://localhost:8080/library/socios';
  selectedUser: User = {} as User;
  //Copia de los usuarios en memoria para actualizar el componente sin refrescar toda la página
  users: Array<User> = [];
  private url: string = "";

  private usuarioSeleccionadoSource = new BehaviorSubject<User>(null);
  usuarioSeleccionado$ = this.usuarioSeleccionadoSource.asObservable();


getUserPrueba(){
  return this.users;
}

  constructor(
    private http: HttpClient
  ) { 
  }

  seleccionarUsuario(usuario: User){
    this.usuarioSeleccionadoSource.next(usuario);
  }


  putUser(user: User): Observable<User[]>{

    return this.http.put<User[]>(this.socioUrl, user).pipe(
      tap(result=> this.users = result)
    );
  }

  postUser(nombre: string, email: string): Observable<User[]>{
    //alquiler.fecha = (new Date(alquiler.fecha)).getTime();
    //pipe: permite realizar transformaciones de los datos
    return this.http.post<User[]>(this.socioUrl, {nombre, email}).pipe(
      //tap: el Observable devuelto por tap es un espejo exacto de la fuente
      //actualiza el array de usuarios que se muestra en el componente
      tap(result=> this.users = result)
    );
  }

    //Devuelve una fuente de datos
    getUsers(): Observable<User[]>{
    
      //return this.http.get<User[]>(this.socioUrl);
      // Cuando el array de usuarios en memoria está vacío se consume de la API   
      if(this.users.length === 0){
       //pipe permite realizar cambios en los datos
       //y tap hace una copia del resultado de la API  en memoria
       return this.http.get<User[]>(this.socioUrl).pipe(
         tap(result=> this.users = result)
       )
      } else {
       //of convierte los argumentos en una secuencia Observable
       return of(this.users);
      }
     }
  
  deleteUser(user: User): Observable<User[]>{
    this.url = `${this.socioUrl}/${user.id}`;
    
    return this.http.delete<User[]>(this.url).pipe(
      tap(result=> {
        this.users = result;
      })
      );
  }

  unSelected(){
    this.usuarioSeleccionadoSource.next(null);
  }

}



