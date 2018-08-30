export type EventHandler = (e: Event) => void;

export interface YGOSet {
  name: string;
  type: string;
  regions: string[];
  languages: string[];
  release_date: string;
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

export interface YGOCard {
  name: string;
  image_path: string;
  thumbnail_path: string;
  text: string;
  type: string;
  number: string;
  price_low: string;
  price_avg: string;
  price_high: string;
  tcgplayer_link: string;
  is_fusion: boolean;
  is_link: boolean;
  is_monster: boolean;
  is_pendulum: boolean;
  is_spell: boolean;
  is_synchro: boolean;
  is_trap: boolean;
  is_xyz: boolean;
  has_name_condition: boolean;
  property: string;
}
