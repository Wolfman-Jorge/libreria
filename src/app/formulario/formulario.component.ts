import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../service/libro.service';
import { Libro } from '../interface/libro';
import { AlquilerService } from '../service/alquiler.service';
import { Alquiler } from '../interface/alquiler';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { Observable } from 'rxjs';
import { LibroComponent } from "../libro/libro.component";

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, UsuarioComponent, LibroComponent, AlquilerComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  deptName = '';
  dateIni = new Date();
  public formUser: FormGroup;
  public formLibro: FormGroup;
  public formAlquiler: FormGroup;
  public users: User[] = [];
  public libros: Libro[] = [];
  public alquileres: Alquiler[] = [];

  btCrear: string;
  btUpdate: string;
  btDelete: string;

  manualInput: boolean = false;
  userSelect: boolean = false;
  libroSelect: boolean = false;


  constructor(
    protected userService: UserService,
    private libroService: LibroService,
    private alquilerService: AlquilerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){ 


    //Accede a los parámetros de la Url
    this.route.params.subscribe(params => {
      //params es un objeto que contiene los parámetros de la URL

      this.deptName = this.route.snapshot.data["ruta"]; //BUSCAR DOCU PARA CONSULTAR LA RUTA
      
    });

    this.formUser = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required]
    });


    this.formLibro = this.formBuilder.group({
      titulo: ['', Validators.required],
      mostrarAlquilado: ['']
    });

    this.formAlquiler = this.formBuilder.group({
      socio: ['', Validators.required],
      libro: ['', Validators.required]
   
    });
    
    switch(this.deptName){
      case("USUARIO"):
        this.btCrear = "Crear Socio";
        this.btUpdate = "Actualizar Socio";
        this.btDelete = "Eliminar Socio";
        break;

      case("LIBRO"):
        this.btCrear = "Crear Libro";
        this.btUpdate = "Actualizar Libro";
        this.btDelete = "Eliminar Libro";
        break;

      case("ALQUILER"):
        this.btCrear = "";
        this.btUpdate = "Devolver Libro";
        this.btDelete = "Eliminar Alquiler";
        break;
    }  
  }

  ngOnInit(){
    
    //suscribirse al servicio para obtener el usuario seleccionado
    this.userService.usuarioSeleccionado$.subscribe(usuario =>{
      if(usuario){
        this.manualInput = false;
        this.userSelect = true;
        //rellenamos el formulario con los datos del usuario
        this.formUser.patchValue({
          nombre: usuario.nombre,
          email: usuario.email
        });
      }
    });

    //suscribirse al servicio para obtener el libro seleccionado
    this.libroService.libroSeleccionado$.subscribe(libro =>{
      if(libro){
        this.manualInput = false;
        this.libroSelect = true;
        //rellenamos el formulario con los datos del libro
        this.formLibro.patchValue({
          titulo: libro.titulo,
          mostrarAlquilado: libro.mostrarAlquilado
        });
      }
    });

    //suscribirse al servicio para obtener el alquiler seleccionado
    this.alquilerService.alquilerSeleccionado$.subscribe(alquiler => {
      if(alquiler){
        this.manualInput = false;
        //rellenamos el formulario con los datos del alquiler
        this.formAlquiler.patchValue({
          socio: alquiler.nombreSocio,
          libro: alquiler.tituloLibro

        });
      }
    });

  }

  onManualInput():void{
    this.manualInput = true;
  }

  isAddDisabled(): boolean {

    switch(this.deptName){
      case("USUARIO"):
        return !this.formUser.valid || !(this.manualInput && !this.userSelect);
      case("LIBRO"):
        return !this.formLibro.valid || !(this.manualInput && !this.libroSelect);
      default:
        return false;
    }
    
  }

  isUpdate(): boolean {
    switch(this.deptName){
      case("USUARIO"):
        return !this.formUser.valid || !(this.manualInput && this.userSelect);
      case("LIBRO"):
        return !this.formLibro.valid || !(this.manualInput && this.libroSelect);
      case("ALQUILER"):
        return !this.formAlquiler.valid || this.manualInput;  
      default:
        return false;
    }
  }

  isDelete(): boolean{
    switch(this.deptName){
      case("USUARIO"):
        return !this.formUser.valid || this.manualInput;
      case("LIBRO"):
        return !this.formLibro.valid || this.manualInput;
      case("ALQUILER"):
        return !this.formAlquiler.valid || this.manualInput;  
      default:
        return false;
    }
  }

  //alquiler  !this.formAlquiler.valid || 
 

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

  onCreate(): void{

    switch(this.deptName){
      case("USUARIO"):
        this.userService.postUser(this.formUser.get("nombre").value, this.formUser.get("email").value)
        .subscribe({
          next: (user)=>{
            this.users = user;
          }
        });
        break;

      case("LIBRO"):
        this.libroService.postLibro(this.formLibro.get("titulo").value)
          .subscribe({
           next: (libro)=>{
            this.libros = libro;
           }
          });
        break;

      default:
        console.error("No implementado", this.deptName);
    }
    
    this.onSubmit();
    
  }

  onUpdate(): void{

    switch(this.deptName){
      case("USUARIO"):

        this.selectedUser.nombre = this.formUser.get("nombre").value;
        this.selectedUser.email = this.formUser.get("email").value;

        this.userService.putUser(this.selectedUser)
          .subscribe({
            next: (user)=>{
              this.users = user;
            }
        });
        break;

      case("LIBRO"):

        this.selectedLibro.titulo = this.formLibro.get("titulo").value;
        this.selectedLibro.mostrarAlquilado = this.formLibro.get("mostrarAlquilado").value;
        

        this.libroService.putLibro(this.selectedLibro)
          .subscribe({  
            next: (libro)=>{
              this.libros = libro;
            }
          });
        break;
      case("ALQUILER"):

        if(this.alquilerService.selectedAlquiler.vigente){
          this.alquilerService.putAlquiler(this.alquilerService.selectedAlquiler)
          .subscribe(()=>{
            this.getAlquileres();
            });
        } else {
          alert('No se puede devolver un libro con alquiler finalizado'); 
        }


        break;

      default:
        console.error("No implementado", this.deptName);
    }

    this.onSubmit();
  }

  getAlquileres(): void{
    this.alquilerService.getAlquileres().subscribe({
      next: (alquiler)=>{
        this.alquileres = alquiler;
      }
    });
  }

  onDelete(): void{

    switch(this.deptName){
      case("USUARIO"):
        const eliminarUsuario = confirm(`¿Estás seguro de que quieres eliminar al usuario:  ${this.userService.selectedUser.nombre}?`);
        
        if(eliminarUsuario){
          var confirmaEliminar = true;

          this.getAlquileres();

          for(const alquiler of this.alquileres){
            if((alquiler.idSocio === this.userService.selectedUser.id) && alquiler.vigente){
              alert('No se puede eliminar un socio con un alquiler vigente');
              confirmaEliminar = false;
              break;
            }
          }

          if(confirmaEliminar){
            this.userService.deleteUser(this.userService.selectedUser)
              .subscribe({
                next: (user)=>{
                  this.users = user;
                }
              });
          }
        }
        this.userService.unSelected();
        break;

      case("LIBRO"):
        const eliminarLibro = confirm(`¿Estás seguro de que quieres eliminar el libro:  ${this.libroService.selectedLibro.titulo}?`);
        
        if(eliminarLibro){
          var confirmaEliminar = true;

          this.getAlquileres();

          for(const alquiler of this.alquileres){
            if((alquiler.idLibro === this.libroService.selectedLibro.id) && alquiler.vigente){
              alert('No se puede eliminar un libro con un alquiler vigente');
              confirmaEliminar = false;
              break;
            }
          }

          if(confirmaEliminar){
            this.libroService.deleteLibro(this.libroService.selectedLibro)
              .subscribe({
                next: (libro)=>{
                  this.libros = libro;
                } 
              });
          }
        }
        this.libroService.unSelected();
        break;

      case("ALQUILER"):
        const eliminarAlquiler = confirm(`¿Estás seguro de que quieres eliminar el alquiler:  ${this.alquilerService.selectedAlquiler.id}?`);

        if(eliminarAlquiler){

          if(this.alquilerService.selectedAlquiler.vigente){
            alert('No se puede eliminar un alquiler vigente');
          }else{
            this.alquilerService.deleteAlquiler(this.alquilerService.selectedAlquiler)
            .subscribe({
              next: (alquiler)=>{
                this.alquileres = alquiler;
              } 
            });
          } 
        }
        this.alquilerService.unSelected();
        break;

      default:
        console.error("No implementado", this.deptName);
    }
    this.onSubmit();
  }

  onSubmit(){
    this.formUser.reset();
    this.formLibro.reset();
    this.formAlquiler.reset();

    this.manualInput = false;
  }

}
