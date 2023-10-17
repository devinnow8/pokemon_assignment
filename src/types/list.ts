export interface Ability {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

// An array of PokemonAbility objects
export type PokemonAbilities = PokemonAbility[] | [];

interface Forms {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: Version;
}

// An array of GameIndex objects
type GameIndices = GameIndex[];

// An array of Pokemon objects
interface MoveObject {
  name: string;
  url: string;
}
type PokemonList = Forms[];
export interface Move {
  move: MoveObject;
}

type MovesList = Move[];
type SpeciesList = PokemonSpecies[];

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

interface RazorWindData {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

interface PokemonSpecies {
  name: string;
  url: string;
}

// sprites

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface DreamWorldSprites {
  front_default: string | null;
  front_female: string | null;
}

interface HomeSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface OfficialArtworkSprites {
  front_default: string | null;
  front_shiny: string | null;
}

interface GenerationISprites {
  red_blue: PokemonSprites;
  yellow: PokemonSprites;
}

interface GenerationIISprites {
  crystal: PokemonSprites;
  gold: PokemonSprites;
  silver: PokemonSprites;
}

interface GenerationIIISprites {
  emerald: PokemonSprites;
  firered_leafgreen: PokemonSprites;
  ruby_sapphire: PokemonSprites;
}

interface GenerationIVSprites {
  diamond_pearl: PokemonSprites;
  heartgold_soulsilver: PokemonSprites;
  platinum: PokemonSprites;
}

interface GenerationVSprites {
  animated: PokemonSprites;
  black_white: PokemonSprites;
}

interface GenerationVISprites {
  omegaruby_alphasapphire: PokemonSprites;
  x_y: PokemonSprites;
}

interface GenerationVIISprites {
  icons: PokemonSprites;
  ultra_sun_ultra_moon: PokemonSprites;
}

interface GenerationVIIISprites {
  icons: PokemonSprites;
}

interface VersionsSprites {
  generation_i: GenerationISprites;
  generation_ii: GenerationIISprites;
  generation_iii: GenerationIIISprites;
  generation_iv: GenerationIVSprites;
  generation_v: GenerationVSprites;
  generation_vi: GenerationVISprites;
  generation_vii: GenerationVIISprites;
  generation_viii: GenerationVIIISprites;
}

interface PokemonSpritesData {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: DreamWorldSprites;
    home: HomeSprites;
    official_artwork: OfficialArtworkSprites;
  };
  versions: VersionsSprites;
}

interface Stat {
  name: string;
  url: string;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

// An array of PokemonStat objects
type PokemonStats = PokemonStat[];

//types
interface Type {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: Type;
}

// An array of PokemonType objects
type PokemonTypes = PokemonType[];
export interface List {
  abilities: PokemonAbilities;
  base_experience: number;
  forms: Forms;
  game_indices: GameIndex;
  height: number;
  held_items: any;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MovesList;
  name: string;
  order: number;
  past_types: any;
  species: SpeciesList;
  sprites: PokemonSprites | [];
  stats: PokemonStats;
  types: PokemonTypes;
  weight: number;
}
