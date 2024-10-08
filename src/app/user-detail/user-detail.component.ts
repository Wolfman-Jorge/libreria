import { Component, Input } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { User } from '../interface/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, UsuarioComponent, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  @Input() user: User;
}
