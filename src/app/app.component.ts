import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  


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
