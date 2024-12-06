import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibroService } from '../service/libro.service';
import { Libro } from '../interface/libro';
import { AlquilerService } from '../service/alquiler.service';
import { Alquiler } from '../interface/alquiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

  deptName = '';
  dateIni = new Date();
  userName: string;
  public form: FormGroup;

  constructor(
    protected userService: UserService,
    private libroService: LibroService,
    private alquilerService: AlquilerService,
    private route: ActivatedRoute
  ){ 
        //Accede a los parámetros de la Url
        this.route.params.subscribe(params =>{
          //params es un objeto que contiene los parámetros de la URL
    
          this.deptName = this.route.snapshot.data["ruta"]; //BUSCAR DOCU PARA CONSULTAR LA RUTA
        
        });
  }

  ngOnInit(){
    /*
    this.form = this.formBuilder.group({
      text: ['']
    });
    */
  }

  // metodo publico que trabaja como una variable es como usar getter y setter
  get selectedUser(): User{
    //Si es nulo devuelve un objeto vacío
    return this.userService.selectedUser || {} as User;
  }

  // metodo publico que trabaja como una variable es como usar getter y setter
  get selectedLibro(): Libro{
    //Si es nulo devuelve un objeto vacío
    return this.libroService.selectedLibro || {} as Libro;
  }

  // metodo publico que trabaja como una variable es como usar getter y setter
  get selectedAlquiler(): Alquiler{
    //Si es nulo devuelve un objeto vacío
    return this.alquilerService.selectedAlquiler || {} as Alquiler;
  }


  //buscar input tipe date que devuelve
}
