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
  ritual = 'ritual',
  link = 'link',
  monster = 'monster',
  pendulum = 'pendulum',
  spell = 'spell',
  synchro = 'synchro',
  trap = 'trap',
  xyz = 'xyz'
}

export enum YGOCardAttribute {
  dark = 'dark',
  divine = 'divine',
  earth = 'earth',
  fire = 'fire',
  light = 'light',
  water = 'water',
  wind = 'wind'
}

export interface YGOCardPreview {
  name: string;
  set: string;
  price: number;
  rarity: string;
}

export interface YGOCard {
  name: string;
  text: string;
  cardType: YGOCardType;
  type: string;
  attribute: YGOCardAttribute;
  atk: number;
  def: number;
  level: number;
  property: string;
}

export interface Price {
  high: number;
  low: number;
  average: number;
  updatedAt: string;
}

export interface YGOCardPrice {
  name: string;
  printTag: string;
  rarity: string;
  price: Price;
}
