export type EventHandler = (e: Event) => void;

export interface YGOSet {
  name: string;
  cards: YGOCardPreview[];
}

export interface YGOCardPreview {
  card_name: string;
  set_number: string;
  rarities: string[];
}

export enum YGOCardType {
  fusion = 'fusion',
  link = 'link',
  monster = 'monster',
  pendulum = 'pendulum',
  spell = 'spell',
  synchro = 'synchro',
  trap = 'trap',
  xyz = 'xyz'
}

export enum YGOCardFamily {
  dark = 'dark',
  divine = 'divine',
  earth = 'earth',
  fire = 'fire',
  light = 'light',
  water = 'water',
  wind = 'wind'
}

export interface YGOCard {
  name: string;
  text: string;
  cardType: YGOCardType;
  type: string;
  family: YGOCardFamily;
  atk: number;
  def: number;
  level: number;
  property: string;
}
