import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Pokemon } from 'src/app/pokemon';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  pokemon: Pokemon;
  pokemonList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) {
    this.pokemon = new Pokemon();
   }

  getPokemonList() {
    this.pokemonList = this.firebasedb.list('pokemons');
    return this.pokemonList;
  }

  addPokemon(pokemon: Pokemon) {
    this.pokemonList = this.firebasedb.list('pokemons');
    this.pokemonList.push(pokemon);
  }

  deletePokemon($key: string) {
    this.pokemonList = this.firebasedb.list('pokemons');
    this.pokemonList.remove($key);
  }

  deleteAllPokemons() {
    this.pokemonList = this.firebasedb.list('pokemons');
    this.pokemonList.remove(null);
  }

}
