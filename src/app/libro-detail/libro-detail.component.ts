import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../service/alquiler.service';
import { UserService } from '../service/user.service';
import { LibroService } from '../service/libro.service';
import { Libro } from '../interface/libro';
import { Alquiler } from '../interface/alquiler';

@Component({
  selector: 'app-libro-detail',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './libro-detail.component.html',
  styleUrl: './libro-detail.component.css'
})
export class LibroDetailComponent {

  toast = inject(ToastrService);

    constructor(
      private router: Router,
      private alquilerService: AlquilerService,
      private userService: UserService,
      private libroService: LibroService
    ){}
  
  onBack(arg0: string){
      this.router.navigate([`dashboard/nuevoalquiler`, arg0]);    
  }

  onFinish(arg0: string){

    if(this.libroService.selectedLibro.alquilado === true){
      alert("No se puede alquilar un libro ya alquilado");
    }else{

      this.alquilerService.postAlquiler(this.userService.selectedUser.id, this.libroService.selectedLibro.id)
      .subscribe(result=>{
        //this.alquilerService.setAlquileres(result.filter(item=> item.type === 'Alquiler'));
        //this.libroService.setLibros(result.filter(item=> item.type === 'Libro'));
        console.log("de vuelta en finish");

              //Hay que injectar Toastr en el fichero style.css y se configura en app.config.ts
      this.toast.success('Libro alquilado', 'Éxito');
      this.router.navigate([`dashboard/formulario`, arg0]);
      });


    }







  }
  
}
