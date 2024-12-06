import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable, tap, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

//Injectable marca esta clase como participante en el sistema de inyección de dependencias
@Injectable({
  providedIn: 'root'
})

//UserService proporcionará servicios inyectables y puede tener dependencias
export class UserService {

  private socioUrl: string = 'http://localhost:8080/libreria/socios';
  public selectedUser: User = {} as User;
  //Copia de los usuarios en memoria para actualizar el componente sin refrescar toda la página
  users: Array<User> = [];

  constructor(
    private http: HttpClient
  ) { 
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

  putUser(user: User): Observable<User>{

    return this.http.put<User>(this.socioUrl, user).pipe(
      tap(result=> this.users = this.users.filter(f=> f.id === result.id))
    );
  }

  postUser(user: User): Observable<User>{
    //alquiler.fecha = (new Date(alquiler.fecha)).getTime();
    //pipe: permite realizar transformaciones de los datos
    return this.http.post<User>(this.socioUrl, user).pipe(
      //tap: el Observable devuelto por tap es un espejo exacto de la fuente
      //actualiza el array de usuarios que se muestra en el componente
      tap(result=> this.users.push(result))
    );
  }

  deleteUser(user: User): Observable<User>{
    this.socioUrl = `${this.socioUrl}/${user.id}`;
    
    return this.http.delete<User>(this.socioUrl).pipe(
      //crea un array de usuarios que no coindiden con el eliminado
      tap(result=> this.users = this.users.filter(f=> f.id !== result.id))
    );
  }

}



