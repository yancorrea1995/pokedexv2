import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ToggleToolsService } from 'src/app/services/ToggleTools/toggle-tools.service';
import { PokedexSearchService } from 'src/app/services/PokedexSearch/pokedex-search.service';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    FirebaseApiService
  ]
})
export class NavbarComponent implements OnInit {

  message: string;
  input: string;

  constructor(
    private firebaseService: FirebaseApiService,
    public router: Router, private service: ToggleToolsService,
    private searchText: PokedexSearchService
    ) { }

  ngOnInit() {
    this.service.currentMessage.subscribe(message => this.message = message);
    this.searchText.currentMessage.subscribe(message => this.input = message);
  }

  toggleTools() {
    if ( this.message === 'hide') {
      this.message = 'show';
    } else {
      this.message = 'hide';
    }
    this.service.changeMessage(this.message);
  }

  resetEditButton() {
    if (this.message === 'show') {
      this.toggleTools();
    }
  }

  deleteAllPokemons($key: string) {
    this.firebaseService.deleteAllPokemons();
  }

  onKey(event) {
    const inputValue = event.target.value;
    this.searchText.changeMessage(inputValue);
  }

}
