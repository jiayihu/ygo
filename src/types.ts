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
  is_monster: boolean;
  is_spell: boolean;
  is_illegal: boolean;
  is_trap: boolean;
  has_name_condition: boolean;
  property: string;
}
