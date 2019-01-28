import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../poke-api.service';
import { Pokemon } from 'src/app/pokemon';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-findpokemons',
  templateUrl: './findpokemons.component.html',
  styleUrls: ['./findpokemons.component.css'],
  providers: [
    PokeApiService,
    FirebaseApiService
  ]
})
export class FindpokemonsComponent implements OnInit {

  getData: string;
  showButton = true;
  searchingPokemon = false;
  pokemon: Pokemon;
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

  constructor(private httpService: PokeApiService, private firebaseService: FirebaseApiService) {
    this.pokemon = new Pokemon();
   }

  getRandomPokemon() {
    this.searchingPokemon = true;
    this.httpService.getRandomPokemon()
    .subscribe(
       data => this.getData = data,
       error => alert(error),
       () => this.setPokemon(this.getData)
    );
  }

  setPokemon(data) {
    this.pokemon.id = data.id;
    this.pokemon.name = data.name;
    this.pokemon.height = data.height;
    this.pokemon.weight = data.weight;
    this.pokemon.stats = data.stats;
    this.pokemon.types = data.types;
    this.pokemon.moves = data.moves;
    this.pokemon.capture_date = new Date(Date.now()).toLocaleString();

    // RANDOM MOVE'S
    const numOfMoves = this.pokemon.moves.length;
    // Random number [0,numOfMoves]
    const numOfRemoves = Math.floor((Math.random() * numOfMoves));

    for (let i = 0; i < numOfRemoves; i++) {
      const r = Math.floor((Math.random() * this.pokemon.moves.length));
      this.pokemon.moves.splice(r, 1);
    }

    this.httpService.getPokemonById(data.id)
    .subscribe(
       data2 => this.getData = data2,
       error => alert(error),
       () => this.setPokemonInfo(this.getData)
    );
  }

  setPokemonInfo(data) {
    for (let index = 0; index < data.flavor_text_entries.length; index++) {
      if (data.flavor_text_entries[index].language.name === 'en') {
        this.pokemon.description = data.flavor_text_entries[index].flavor_text;
        index = 1000; // exit for
      }
    }
    this.pokemon.capture_rate = data.capture_rate * 100 / 255;

    let time = Math.floor((Math.random() * 10) + 1);
    time = time * 1000; // random time to find pokemon

    setTimeout(() => {
      this.searchingPokemon = false;
      this.toggleView();
    }, time);

  }

  toggleView() {
    this.showButton = !this.showButton;
  }

  catchPokemon() {
    this.firebaseService.addPokemon(this.pokemon);
    this.toggleView();
  }

  ngOnInit() {
  }

}
