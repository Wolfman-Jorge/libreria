import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { USUARIOS } from '../mock/mock-usuarios';
import { Observable, of } from 'rxjs';

//Injectable marca esta clase como participante en el sistema de inyección de dependencias
@Injectable({
  providedIn: 'root'
})

//UserService proporcionará servicios inyectables y puede tener dependencias
export class UserService {

  constructor() { }

  //Devuelve una fuente de datos
  getUser(): Observable<User[]>{
    return of(USUARIOS);
  }
}
