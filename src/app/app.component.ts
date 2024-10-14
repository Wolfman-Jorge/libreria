import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsuarioComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  //EL ERROR DE CORS SE CORRIGE AÑADIENDO EN EL REST CONTROLLER:
  // @CrossOrigin(origins={"http://localhost:4200"})

  title = 'Libreria';

  constructor(private router: Router
  ){}

  onNav(arg0: string) {
    
    //this.router.navigate([`/crud/${arg0}`]);
    switch(arg0){
      case ('usuario'):
        this.router.navigate([`/crud`, arg0]);
        break;
      case ('libro'):
        this.router.navigate([`/crud`, arg0]);
        break;
      case ('alquiler'):
        this.router.navigate([`/crud`, arg0]);
        break;
    }
  
  }



}
