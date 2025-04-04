import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserAdmin } from '../interface/userAdmin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private LOGIN_URL : string = 'http://localhost:8080/library/auth/login';
    private USER_URL : string = 'http://localhost:8080/library/auth/user';
    private tokenKey = 'authToken';
    private url: string = "";
    userAdmin: UserAdmin = {} as UserAdmin;
    user: string = "";

    constructor(private httpClient: HttpClient,
                private router: Router
    ){}

    //envía usuario y contraseña, recibe el token
    login(username: string, password: string): Observable<any>{
        return this.httpClient.post<any>(this.LOGIN_URL, {username, password}).pipe(
            tap(response => {
                //ese token es el nombre de la variable que almacena el token en el back
                if(response.token){
                    console.log(response.token);
                    this.setToken(response.token);
                    
                }
            })
        )
    }

    getUser(token: any): Observable<UserAdmin>{
        console.log(`token ${token}`);
        return this.httpClient.get<UserAdmin>(this.USER_URL).pipe(
            tap(result =>{
                this.userAdmin= result;
                console.log(`usuario ${this.userAdmin.username}`);
            })
        );
    }


    //para almacenar el token en local
    private setToken(token: string):void{
        localStorage.setItem(this.tokenKey, token);
    }

    //recupera el token desde el localStorage
    getToken(): string | null {
        if(typeof window !== 'undefined'){
            return localStorage.getItem(this.tokenKey);
        } else {
            return null;
        }
        
    }

    //para validar si el usuario está autenticado
    //valida el tiempo de expiración del token
    isAuthenticated(): boolean{
        
        //recupera el token desde localStorage
        const token = this.getToken();
        
        //si el token no existe
        if(!token){
            return false;
        }

        //decodifica a un object Json para recuperar el cuerpo del token
        //atob decodifica Base64, es de JS
        const payload = JSON.parse(atob(token.split('.')[1]));

        //valida la expiración
        //exp es el nombre de la variable que almacena la expiración en el token
        const exp = payload.exp * 1000;
        return Date.now() < exp;
    }



    //elimina el token del localStorage
    logout(): void{
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
    }

}
