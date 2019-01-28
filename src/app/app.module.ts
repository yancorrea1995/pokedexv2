import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { FindpokemonsComponent } from './pages/findpokemons/findpokemons.component';
import { MypokedexComponent } from './pages/mypokedex/mypokedex.component';

import { environment } from '../environments/environment';
import { ViewComponent } from './pages/view/view.component';
import { FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FindpokemonsComponent,
    MypokedexComponent,
    ViewComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
