import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, RouterModule} from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Input } from '@angular/core';
import { User } from '../interface/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [AppComponent, RouterModule, UsuarioComponent, CommonModule, FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit, AfterViewInit{

  btName: string = "create";
  deptName: string = "";
  @Input() users = '';
  //LLamar a un componente de la plantilla
  @ViewChild('idNombre') idNombre;

  //Propiedad que recibe del hijo a través de Emitter
  userDetail: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ){ }
  
  ngAfterViewInit(): void {
    console.log(this.idNombre);
  }
  ngOnInit(): void {
    //this.deptName = this.route.snapshot.paramMap.get('dept');

    //Accede a los parámetros de la Url
    this.route.params.subscribe(params =>{
      //params es un objeto que contiene los parámetros
      this.deptName = params['dept']; //dept debe coindicir con el nombre
                                      //del parámetro en la ruta
    
    });

  }

  onCreate(): void{
    this.btName = 'create';
  }

  onSearch(): void{
    this.btName = 'search';
  }

  onDelete(): void{
    this.btName = 'delete';
  }

  getUserDetail(userDetail: User){
    this.userDetail = userDetail;
  }

  // metodo publico que trabaja como una variable es como usar getter y setter
  get selectedUser(): User{
    //Si es nulo devuelve un objeto vacío
    return this.userService.selectedUser || {} as User;
  }



}
