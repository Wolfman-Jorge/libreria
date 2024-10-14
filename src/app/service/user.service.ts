import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Injectable marca esta clase como participante en el sistema de inyección de dependencias
@Injectable({
  providedIn: 'root'
})

//UserService proporcionará servicios inyectables y puede tener dependencias
export class UserService {

  private socioUrl: string = 'http://localhost:8080/libreria/socios';

  constructor(
    private http: HttpClient
  ) { }

  //Devuelve una fuente de datos
  getUser(): Observable<User[]>{
    
    return this.http.get<User[]>(this.socioUrl);
  }

}
