import { MypokedexComponent } from './pages/mypokedex/mypokedex.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FindpokemonsComponent } from './pages/findpokemons/findpokemons.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  { path: 'home', component: FindpokemonsComponent },
  { path: 'mypokedex', component: MypokedexComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

RouterModule.forRoot(routes, {useHash: true});
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {useHash: true})]
})

export class AppRoutingModule { }
