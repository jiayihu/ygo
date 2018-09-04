import { YGOCard, YGOCardType } from './types';
import { BASE_URL } from '../services/api';

export function getCardColor(card: YGOCard): string {
  switch (card.cardType) {
    case YGOCardType.fusion:
      return '#7E57C2';
    case YGOCardType.ritual:
      return '#305488';
    case YGOCardType.link:
      return '#42A5F5';
    case YGOCardType.monster:
      return '#8D6E63';
    case YGOCardType.pendulum:
      return '#008190';
    case YGOCardType.spell:
      return '#26A69A';
    case YGOCardType.synchro:
      return '#CFD8DC';
    case YGOCardType.trap:
      return '#960c80';
    case YGOCardType.xyz:
      return '#525252';
    default:
      throw new Error(`Unknown card type ${card.cardType}`);
  }
}

export function getCardImage(name: string): string {
  /**
   * Use CORS also for images to avoid Opaque Responses
   * @see {@link https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses}
   */
  return `${BASE_URL}/card_image/${encodeURIComponent(name)}`;
}

export function isMonster(card: YGOCard): boolean {
  const cardType = card.cardType;

  return (
    cardType === YGOCardType.monster ||
    cardType === YGOCardType.fusion ||
    cardType === YGOCardType.ritual ||
    cardType === YGOCardType.link ||
    cardType === YGOCardType.pendulum ||
    cardType === YGOCardType.synchro ||
    cardType === YGOCardType.xyz
  );
}

export function isSpell(card: YGOCard): boolean {
  return card.cardType === YGOCardType.spell;
}

export function isTrap(card: YGOCard): boolean {
  return card.cardType === YGOCardType.trap;
}
