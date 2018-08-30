import { YGOCard, YGOCardType } from './types';

export function getCardColor(card: YGOCard): string {
  switch (card.cardType) {
    case YGOCardType.fusion:
      return '#7E57C2';
    case YGOCardType.link:
      return '#42A5F5';
    case YGOCardType.monster:
      return '#8D6E63';
    case YGOCardType.pendulum:
      return '#8D6E63';
    case YGOCardType.spell:
      return '#26A69A';
    case YGOCardType.synchro:
      return '#CFD8DC';
    case YGOCardType.trap:
      return '#EC407A';
    case YGOCardType.xyz:
      return '#424242';
    default:
      throw new Error(`Unknown card type ${card.cardType}`);
  }
}

export function getCardImage(name: string): string {
  return `http://yugiohprices.com/api/card_image/${encodeURIComponent(name)}`;
}
