import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { LibroService } from '../service/libro.service';
import { AlquilerService } from '../service/alquiler.service';
import { FormularioComponent } from "../formulario/formulario.component";
import { UserDetailComponent } from "../user-detail/user-detail.component";
import { UserAdmin } from '../interface/userAdmin';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormularioComponent, UserDetailComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  title = 'BIBLIOTECA';
  deptName = '';
  userAdmin: UserAdmin = {} as UserAdmin;
  nombre: string = "";
  @Output() btUpdate = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private libroService: LibroService,
    private alquilerService: AlquilerService,
    private route: ActivatedRoute
  ){
        //Accede a los parámetros de la Url
        this.route.params.subscribe(params => {
          //params es un objeto que contiene los parámetros de la URL
    
          this.deptName = this.route.snapshot.data["ruta"]; //BUSCAR DOCU PARA CONSULTAR LA RUTA


          if (params['userAdmin']) {
            try {
              //se deserializa el objeto
              this.userAdmin = JSON.parse(params['userAdmin']);
              this.nombre = (this.userAdmin.username).toUpperCase();
              
              console.log(`Dashboard params ${this.nombre}`);
            } catch (e) {
              console.error('Error al deserializar userAdmin:', e);
            }
          }
        });
    }      

  ngOnInit(): void {
    this.router.navigate([`dashboard/formulario/usuario`]);
  }



  onNav(arg0: string) {
    
    //this.router.navigate([`/crud/${arg0}`]);
    switch(arg0){
      case ('usuario'):
        this.router.navigate([`dashboard/formulario`, arg0]);
        this.userService.unSelected();
        break;
      case ('libro'):
        this.router.navigate([`dashboard/formulario`, arg0]);
        this.libroService.unSelected();
        break;
      case ('alquiler'):
        this.router.navigate([`dashboard/formulario`, arg0]);
        this.alquilerService.unSelected();
        break;
      case ('addUsuario'):
        this.router.navigate([`dashboard/nuevoalquiler`, arg0]);
        this.userService.unSelected();
        break;  
    }
  
  }

  logout(): void{
    this.authService.logout();
  }

}


//investigar docker y tomcat
//como desplegar la app en la nube