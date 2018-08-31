import request from './api';
import { YGOCard, YGOCardType, YGOCardPreview } from '../domain/types';
import { omit } from '../utils';

/**
 * Normalize API card type to YGOCardType
 */
function getCardType(card: any): YGOCardType {
  if (card.card_type === 'monster') {
    const type = card.type;

    if (type.includes('Fusion')) return YGOCardType.fusion;
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

  return request(`card_data/${encodedName}`).then(card => {
    const cardType: string = getCardType(card);

    return {
      ...omit(card, ['card_type', 'family']),
      cardType,
      attribute: card.family
    } as YGOCard;
  });
}

export function getMostExpensiveCards(number = 10): Promise<YGOCardPreview[]> {
  return request(`top_100_cards`).then((response: any[]) => {
    return response.slice(0, number);
  });
}
