import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  title = 'Libreria';

  constructor(
    private router: Router,
    private authService: AuthService
  ){}


  onNav(arg0: string) {
    
    //this.router.navigate([`/crud/${arg0}`]);
    switch(arg0){
      case ('usuario'):
        this.router.navigate([`dashboard/crud`, arg0]);
        break;
      case ('libro'):
        this.router.navigate([`dashboard/crud`, arg0]);
        break;
      case ('alquiler'):
        this.router.navigate([`dashboard/crud`, arg0]);
        break;
    }
  
  }

  logout(): void{
    this.authService.logout();
  }

}
