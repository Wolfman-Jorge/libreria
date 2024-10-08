import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrudComponent } from './crud/crud.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UsuarioComponent},
    {path: 'crud', component: CrudComponent}
];
