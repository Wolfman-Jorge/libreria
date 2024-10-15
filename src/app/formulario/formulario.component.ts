import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  constructor(
    private userService: UserService
  ){ }

    // metodo publico que trabaja como una variable es como usar getter y setter
    get selectedUser(): User{
      //Si es nulo devuelve un objeto vacío
      return this.userService.selectedUser || {} as User;
    }

}
