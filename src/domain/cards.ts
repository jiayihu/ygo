import { YGOCard, YGOCardType } from './types';

export function getCardColor(card: YGOCard): string {
  if (card.cardType === YGOCardType.fusion) return '#7E57C2';
  if (card.cardType === YGOCardType.link) return '#42A5F5';
  if (card.cardType === YGOCardType.monster) return '#8D6E63';
  if (card.cardType === YGOCardType.pendulum) return '#8D6E63';
  if (card.cardType === YGOCardType.spell) return '#26A69A';
  if (card.cardType === YGOCardType.synchro) return '#CFD8DC';
  if (card.cardType === YGOCardType.trap) return '#EC407A';
  if (card.cardType === YGOCardType.xyz) return '#424242';

  throw new Error(`Unknown card type ${card.cardType}`);
}

export function getCardImage(name: string): string {
  return `http://yugiohprices.com/api/card_image/${encodeURIComponent(name)}`;
}
