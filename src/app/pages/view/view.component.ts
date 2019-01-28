import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Pokemon } from 'src/app/pokemon';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { PokedexSearchService } from 'src/app/services/PokedexSearch/pokedex-search.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [
    FirebaseApiService
  ]
})
export class ViewComponent implements OnInit {

  id: string;
  private sub: any;
  isLoading = false;
  pokemon: Pokemon;
  pokemonArray: any[];
  pokemonTypes: Array<string> = [];
  pokemonMoves: Array<string> = [];
  pokemonStats: Array<number> = [];
  search: string;
  private typeColors = {
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
    private route: ActivatedRoute,
    private input: PokedexSearchService,
    private _location: Location
    ) {
    this.pokemon = new Pokemon();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getPokemonById();
   });
   this.input.currentMessage.subscribe(message => this.search = message);
   this.input.changeMessage('');
  }

  getPokemonById() {
    this.firebaseService.getPokemonList().snapshotChanges()
    .subscribe(item => {
      this.pokemonArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        if (x['$key'] === this.id) {
          this.pokemonArray.push(x);
          this.pokemon.id = this.pokemonArray[0].id;
          this.pokemon.name = this.pokemonArray[0].name;
          this.pokemon.description = this.pokemonArray[0].description;
          this.pokemon.height = this.pokemonArray[0].height;
          this.pokemon.weight = this.pokemonArray[0].weight;
          this.pokemon.capture_rate = this.pokemonArray[0].capture_rate;
          this.pokemon.capture_date = this.pokemonArray[0].capture_date;
        }
      });

      setTimeout(() => {
        this.isLoading = false;
        this.pokemon.types = this.pokemonArray[0].types;
        this.pokemon.moves = this.pokemonArray[0].moves;
        this.pokemon.stats = this.pokemonArray[0].stats;

        const jsonTypes: string = JSON.stringify(this.pokemon.types);
        const json = JSON.parse(jsonTypes);
        for (let index = 0; index < (Object.keys(this.pokemon.types).length); index++) {
          this.pokemonTypes.push(String(json[index]['type']['name']));
        }

        const jsonMoves: string = JSON.stringify(this.pokemon.moves);
        const json2 = JSON.parse(jsonMoves);
        for (let index = 0; index < (Object.keys(this.pokemon.moves).length); index++) {
          this.pokemonMoves.push(String(json2[index]['move']['name']));
        }

        const jsonStats: string = JSON.stringify(this.pokemon.stats);
        const json3 = JSON.parse(jsonStats);
        for (let index = 0; index < (Object.keys(this.pokemon.stats).length); index++) {
          this.pokemonStats.push(Number(json3[index]['base_stat']));
        }

      }, (Math.floor((Math.random() * 2) + 1) * 500)); // random 0.5 to 1 second

    });
  }

  goBack() {
    this._location.back();
  }

}
