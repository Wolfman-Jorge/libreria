import { Component, OnInit } from '@angular/core';
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
export class UsuarioComponent implements OnInit{


  //users = USUARIOS;
  users: User[];
  //selectedUser: User;
  //@Output() detailUser = new EventEmitter<User>();

  //Se inyecta el servicio
  constructor(private userService: UserService){}

  //permite inicializar el componente una vez ha recibido las propiedades de entrada
  ngOnInit(): void {
      this.getUser();
  }

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

  onSelect(user: User){/*
    this.detailUser.emit(user);
    console.log(user);
*/
    //envia una copia del objeto
    this.userService.selectedUser = JSON.parse(JSON.stringify(user));
  }

  get selectedUserId(){
    return this.userService.selectedUser?.id;
  }

  onEdit() {
    throw new Error('Method not implemented.');
  }


}
