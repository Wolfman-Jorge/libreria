import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Injectable marca esta clase como participante en el sistema de inyección de dependencias
@Injectable({
  providedIn: 'root'
})

//UserService proporcionará servicios inyectables y puede tener dependencias
export class UserService {

  private socioUrl: string = 'http://localhost:8080/libreria/socios';
  public selectedUser: User;

  constructor(
    private http: HttpClient
  ) { }

  //Devuelve una fuente de datos
  getUsers(): Observable<User[]>{
    
   // return this.http.get<User[]>(this.socioUrl);
    return this.http.get<User[]>(this.socioUrl).pipe(
      tap(result=> this.selectedUser = result[2])
    )
  }

}



