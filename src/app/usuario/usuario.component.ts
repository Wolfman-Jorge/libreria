import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { FormsModule } from '@angular/forms';
import { USUARIOS } from '../mock/mock-usuarios';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from "../user-detail/user-detail.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, UserDetailComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{

  users = USUARIOS;
  selectedUser: User;

  ngOnInit(): void {
      
  }

  onSelect(user: User):void{
    this.selectedUser = user;
  }
}
