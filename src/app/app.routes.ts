import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrudComponent } from './crud/crud.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'users', component: UsuarioComponent},
    {path: 'crud', component: CrudComponent}
];
