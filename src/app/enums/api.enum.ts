import { IApiObject } from "../interfaces";

export const POKE_API_URL: Record<string, IApiObject> = {
  GET_DATA: {
    url: 'pokemons',
    method: 'GET'
  },
  GET_DETAIL: {
    url: 'pokemons/:id',
    method: 'GET'
  },
  GET_POKE_TYPE: {
    url: 'types',
    method: 'GET'
  },
  GET_SPRITE: {
    url: 'pokemons/:id/sprite',
    method: 'GET'
  },
};
