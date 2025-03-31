import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../interface/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, OnDestroy{

  @Input() users: User[] = [];




  //Se inyecta el servicio
  constructor(private userService: UserService){}

  //permite inicializar el componente una vez ha recibido las propiedades de entrada
  ngOnInit(): void {
      this.getUser();
  }

  ngOnDestroy():void{
    
  }

  getUser():void{

      this.userService.getUsers().subscribe({
        next: (user)=>{
          this.users = user;
          console.log(user);
        }
      });
  
  }

  onSelect(user: User){

    //envia una copia del objeto
    this.userService.selectedUser = JSON.parse(JSON.stringify(user));
    this.userService.seleccionarUsuario(user);
  }

  get selectedUserId(){
    return this.userService.selectedUser?.id;
  }

  get usuarioSeleccionado(){
    return this.userService.usuarioSeleccionado$;
  }



}
