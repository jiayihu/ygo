import request from './api';
import { YGOCard } from '../domain/types';

export function getCard(name: string): Promise<YGOCard> {
  const encodedName = encodeURIComponent(name);

  return request(`card_data/${encodedName}`).then(card => {
    const cardType: string = card.card_type;

    return {
      ...card,
      cardType
    } as YGOCard;
  });
}

export function getMostExpensiveCards(number = 10): Promise<string[]> {
  return request(`top_100_cards`).then((response: any[]) => {
    return response.slice(0, number).map(card => card.name);
  });
}
