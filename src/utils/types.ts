export interface PokemonValues {
  name: string;
  url: string;
}

export interface PokemonData {
  sprites?: { front_default: string };
  types?: { type: { name: string; url: string } }[];
  height?: number;
  weight?: number;
  abilities?: { ability: { name: string } }[];
  stats?: { base_stat: number; effort: number; stat?: { name: string } }[];
  name?: string;
}
