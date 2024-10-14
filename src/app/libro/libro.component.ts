import { Component, OnInit } from '@angular/core';
import { Libro } from '../interface/libro';
import { LibroService } from '../service/libro.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit{

  
  libros: Libro[];

  //Se inyecta el servicio
  constructor(private libroService: LibroService){}

  //permite inicializar el componente una vez ha recibido las propiedades de entrada
  ngOnInit(): void {
      this.getLibro();
  }

  getLibro():void{
    /*Se utiliza el servicio para acceder al get que accede a datos
    this.libroService.getLibro()
      .subscribe(libro => this.libro = libro); //Esto funciona de forma asíncrona
      //subscribe "convierte" el array que se recibe de forma asíncrona y lo almacena en la propiedad libros[]
  */
      this.libroService.getLibro().subscribe({
        next: (libro)=>{
          this.libros = libro;
          console.log(libro);
        }
      });
  
  }

}
