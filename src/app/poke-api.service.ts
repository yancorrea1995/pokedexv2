import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private _http: Http) { }

  getRandomPokemon() {
    const id = Math.floor((Math.random() * 150) + 1);
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const url = baseUrl.concat(id.toString(), '/');

    return this._http.get(url).pipe(map(res => res.json()));
  }

  getPokemonById(pokemonid: number) {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
    const url = baseUrl.concat(pokemonid.toString(), '/');

    return this._http.get(url).pipe(map(res => res.json()));
  }
}
