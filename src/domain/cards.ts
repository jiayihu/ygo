import { YGOCard, YGOCardType } from './types';

export function getCardType(card: YGOCard): YGOCardType {
  if (card.is_fusion) return YGOCardType.fusion;
  if (card.is_link) return YGOCardType.link;
  if (card.is_monster) return YGOCardType.monster;
  if (card.is_pendulum) return YGOCardType.pendulum;
  if (card.is_spell) return YGOCardType.spell;
  if (card.is_synchro) return YGOCardType.synchro;
  if (card.is_trap) return YGOCardType.trap;
  if (card.is_xyz) return YGOCardType.xyz;

  throw new Error(`Unknown card type`);
}

export function getCardColor(card: YGOCard): string {
  if (card.is_fusion) return '#7E57C2';
  if (card.is_link) return '#42A5F5';
  if (card.is_monster) return '#8D6E63';
  if (card.is_pendulum) return '#8D6E63';
  if (card.is_spell) return '#26A69A';
  if (card.is_synchro) return '#CFD8DC';
  if (card.is_trap) return '#EC407A';
  if (card.is_xyz) return '#424242';

  throw new Error(`Unknown card type`);
}
