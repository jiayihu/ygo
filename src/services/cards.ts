import request, { BASE_URL } from './api';
import { YGOCard, YGOCardType, YGOCardPreview, YGOCardPrice, Price } from '../domain/types';
import { omit } from '../utils';

/**
 * Normalize API card type to YGOCardType
 */
function getCardType(card: any): YGOCardType {
  if (card.card_type === 'monster') {
    const type = card.type;

    if (type.includes('Fusion')) return YGOCardType.fusion;
    if (type.includes('Ritual')) return YGOCardType.ritual;
    if (type.includes('Link')) return YGOCardType.link;
    if (type.includes('Pendulum')) return YGOCardType.pendulum;
    if (type.includes('Synchro')) return YGOCardType.synchro;
    if (type.includes('Xyz')) return YGOCardType.xyz;

    return YGOCardType.monster;
  }

  if (card.card_type === 'spell') return YGOCardType.spell;
  if (card.card_type === 'trap') return YGOCardType.trap;

  throw new Error(`Unknown card type ${card.card_type}`);
}

export function getCard(name: string): Promise<YGOCard> {
  const encodedName = encodeURIComponent(name);

  return request(`card_data/${encodedName}`).then((card: any) => {
    const cardType: string = getCardType(card);

    return {
      ...omit(card, ['card_type', 'family']),
      cardType,
      attribute: card.family
    } as YGOCard;
  });
}

export function getCardPrices(name: string): Promise<YGOCardPrice[]> {
  const encodedName = encodeURIComponent(name);

  return request(`get_card_prices/${encodedName}`).then((cards: any[]) => {
    return cards
      .map((card: any) => {
        return {
          ...omit(card, ['print_tag', 'price_data']),
          printTag: card.print_tag,
          price: card.price_data.data
            ? {
                ...omit(card.price_data.data.prices, ['updated_at']),
                updatedAt: card.price_data.data.prices.updated_at
              }
            : null
        } as YGOCardPrice;
      })
      .filter(x => x.price);
  });
}

export function getCardHistory(printTag: string, rarity: string): Promise<Price[]> {
  const encodedTag = encodeURIComponent(printTag);
  const encodedRarity = encodeURIComponent(rarity);

  return request(`price_history/${encodedTag}?rarity=${encodedRarity}`).then((prices: any[]) => {
    return prices
      .map((price: any) => {
        return {
          high: price.price_high,
          low: price.price_low,
          average: price.price_average,
          updatedAt: price.created_at
        } as Price;
      })
      .slice(0, 30) // Only last month
      .reverse();
  });
}

export function searchCard(cardName: string): Promise<string[]> {
  const encodedName = encodeURIComponent(cardName);
  const base = BASE_URL.replace('/api', '');

  /**
   * Autocomplete API is an exception with different URL and response
   */
  return fetch(`${base}/autocomplete_names?term=${encodedName}`, {
    mode: 'cors'
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json();
    }

    return response.json().then(error => {
      throw error;
    });
  });
}

export function getMostExpensiveCards(number = 23): Promise<YGOCardPreview[]> {
  return request(`top_100_cards`).then((response: any[]) => {
    return response.slice(0, number);
  });
}
