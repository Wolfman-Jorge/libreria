import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, RouterModule} from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Input } from '@angular/core';
import { User } from '../interface/user';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [AppComponent, RouterModule, UsuarioComponent],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit{

  btName: string;
  deptName: string = "";
  @Input() users = '';

  //Propiedad que recibe del hijo a través de Emitter
  userDetail: User;

  constructor(
    private route: ActivatedRoute
  ){
    
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


}
