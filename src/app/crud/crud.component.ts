

import { FormsModule } from '@angular/forms';
import { LibroService } from '../service/libro.service';
import { UserService } from '../service/user.service';
import { AlquilerService } from '../service/alquiler.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit/*, AfterViewInit*/{

  btName: string = "create";
  deptName = '';
  @Input() users = '';


  //LLamar a un componente de la plantilla
 // @ViewChild('idNombre') idNombre;

  //Propiedad que recibe del hijo a través de Emitter
  //userDetail: User;


  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private userService: UserService,
    private alquilerService: AlquilerService
  ){ 

    //Accede a los parámetros de la Url
    this.route.params.subscribe(params =>{
      //params es un objeto que contiene los parámetros de la URL

      this.deptName = this.route.snapshot.data["ruta"]; //BUSCAR DOCU PARA CONSULTAR LA RUTA
      /*
      snapshot: instantánea actual de la ruta
      title: Observable<string | undefined> devuelve un Observable del título de ruta resuelto
      url: Observable<UrlSegment[]> devuelve un Observable de los segmentos de URL que se combinan con esta ruta
      params: Observable<Params> devuelve un Observable de los parámetros de la matriz en este trazado
      queryParams: Observable<Params> devuelve un Observable de los parámetros de consulta compartidos por todas las rutas
      fragment: Observable<string | null> devuelve un Observable, fragmento de URL compartido por todas las rutas
      data: Observable<Data> devuelve un Observable de los datos estáticos y resueltos de esta ruta
      outlet: string devuelve una constante, el nombre de salida de la ruta
      component: Type<any> | null devuelve una constante, el componente de la ruta
      routeConfig: Route | null devuelve la configuración usada para coincidir con esta ruta
      root: ActivatedRoute devuelve la raíz del estado del router
      parent: ActivatedRoute | null devuelve el padre de esta ruta en el árbol del estado del router
      firstChild: ActivatedRoute | null devuelve el primer hijo de esta ruta en el árbol de estado del router
      children: ActivatedRoute[] devuelve los hijos de esta ruta en el árbol del estado del router
      pathFromRoot: ActivatedRoute[] devuelve el path de la raíz del árbol de estado del router a esta ruta
      paramMap: Observable<ParamMap>  devuelve un Observable que contiene un mapa de los parámetros necesarios y 
          opcionales específico de la ruta. El mapa admite recuperar valores individuales y múltiples del mismo parámetro
      queryParamMap: Observable<ParamMap> devuelve un Observable que contiene un mapa de los parámetros de consulta disponibles
          para todas las rutas.
      */
    
    });
  }


  ngOnInit(): void {
  }
/*
  ngAfterViewInit(): void {
    console.log(this.idNombre);
  }
*/
/*

  onCreate(): void{

    this.btName = 'create';

    switch(this.deptName){
      case("USUARIO"):
        this.userService.postUser(this.userService.selectedUser)
          .subscribe(user=>
        {
         console.log(this.userService.selectedUser.nombre);
        }
        );
        break;

      case("LIBRO"):
        this.libroService.postLibro(this.libroService.selectedLibro)
          .subscribe(libro=>
          {
            console.log(this.libroService.selectedLibro.titulo);

          }
        );
        break;
      case("ALQUILER"):
        this.alquilerService.postAlquiler(this.alquilerService.selectedAlquiler)
          .subscribe(alquiler=>
          {
            console.log(this.alquilerService.selectedAlquiler.id);
          }
        );
        break;

      default:
        console.error("No implementado", this.deptName);
    }
    
    
  }

  onUpdate(): void{
    this.btName = 'update';

    switch(this.deptName){
      case("usuario"):
        this.userService.putUser(this.userService.selectedUser)
          .subscribe(user=>
        {
          console.log(this.userService.selectedUser.nombre);
        }
        );
        break;

      case("libro"):
        this.libroService.putLibro(this.libroService.selectedLibro)
          .subscribe(libro=>
          {
            console.log(this.libroService.selectedLibro.titulo);

          }
        );
        break;
      case("alquiler"):
        this.alquilerService.putAlquiler(this.alquilerService.selectedAlquiler)
          .subscribe(alquiler=>
          {
            console.log(this.alquilerService.selectedAlquiler.id);
          }
        );
        break;

      default:
        console.error("No implementado", this.deptName);
    }
  }

  onDelete(): void{

    this.btName = 'delete';

    switch(this.deptName){
      case("usuario"):
        this.userService.deleteUser(this.userService.selectedUser)
          .subscribe(user=>
        {
          console.log(this.userService.selectedUser.nombre);
        }
        );
        break;

      case("libro"):
        this.libroService.deleteLibro(this.libroService.selectedLibro)
          .subscribe(libro=>
          {
            console.log(this.libroService.selectedLibro.titulo);

          }
        );
        break;
      case("alquiler"):
      this.alquilerService.deleteAlquiler(this.alquilerService.selectedAlquiler)
      .subscribe(alquiler=>
      {
        console.log(this.alquilerService.selectedAlquiler.id);
      }
    );
    break;
      
        break;

      default:
        console.error("No implementado", this.deptName);
    }
  }
*/
}
