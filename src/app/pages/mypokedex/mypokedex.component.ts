import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Pokemon } from 'src/app/pokemon';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { ToggleToolsService } from 'src/app/services/ToggleTools/toggle-tools.service';
import { PokedexSearchService } from 'src/app/services/PokedexSearch/pokedex-search.service';

@Component({
  selector: 'app-mypokedex',
  templateUrl: './mypokedex.component.html',
  styleUrls: ['./mypokedex.component.css'],
  providers: [
    FirebaseApiService
  ]
})
export class MypokedexComponent implements OnInit {

  pokemon: Pokemon;
  pokemonArray: any[];
  isLoading = true;
  message: string;
  search: string;
  pokemonKey: string;
  typeColors = {
    'grass': 'rgb(105, 194, 61)',
    'poison' : 'rgb(146, 58, 146)',
    'fire' : 'rgb(237, 109, 18)',
    'flying' : 'rgb(142, 111, 235)',
    'ghost' : 'rgb(100, 78, 136)',
    'psychic' : 'rgb(247, 54, 112)',
    'normal' : 'rgb(156, 156, 99)',
    'electric' : 'rgb(246, 201, 19)',
    'dragon' : 'rgb(94, 29, 247)',
    'fighting' : 'rgb(174, 42, 36)',
    'fairy' : 'rgb(232, 120, 144)',
    'bug' : 'rgb(151, 165, 29)',
    'ground' : 'rgb(219, 181, 77)',
    'water' : 'rgb(69, 120, 237)',
    'steel' : 'rgb(160, 160, 192)',
    'rock' : 'rgb(164, 143, 50)',
    'dark' : 'rgb(100, 78, 64)',
    'ice' : 'rgb(126, 206, 206)'
};

  constructor(
    private firebaseService: FirebaseApiService,
    public router: Router,
    private service: ToggleToolsService,
    private input: PokedexSearchService
    ) {
    this.pokemon = new Pokemon();
   }

  ngOnInit() {
    this.getPokemonList();
    this.service.currentMessage.subscribe(message => this.message = message);
    this.input.currentMessage.subscribe(message => this.search = message);
  }

  getPokemonList() {
    this.firebaseService.getPokemonList().snapshotChanges()
    .subscribe(item => {
      this.pokemonArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.pokemonArray.push(x);
      });

      setTimeout(() => {
        this.isLoading = false;
      }, (Math.floor((Math.random() * 2) + 1) * 500)); // random 0.5 to 1 second

    });
  }

  deletePokemon($key: string) {
    this.firebaseService.deletePokemon($key);
  }

  setPokemonKey($key: string) {
    this.pokemonKey = $key;
  }

  viewPokemon($key: string) {
    this.router.navigate(['/view', $key]);
  }

}
