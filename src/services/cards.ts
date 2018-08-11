import request from './api';
import { YGOCard } from '../types';

export function getCard(name: string) {
  const encodedName = encodeURIComponent(name);

  return request(`card_info?name=${encodedName}`).then(response => response.card as YGOCard);
}

export function getNewCards(number = 6) {
  return request(`new_cards?num_cards=${number}`).then(response => {
    const cardNames: string[] = response.new_cards;

    return Promise.all(cardNames.map(getCard));
  });
}
