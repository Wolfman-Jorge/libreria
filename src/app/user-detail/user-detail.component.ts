import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../interface/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  @Input() user: User;
}

