import request from './api';
import { shuffle } from '../utils';
import { YGOSet } from '../types';

export function getSet(name: string) {
  const encodedName = encodeURIComponent(name);

  return request(`set_info?name=${encodedName}`)
    .then(response => response.set)
    .then(set => {
      const engKey = Object.keys(set.language_release_dates).find(lang =>
        lang.startsWith('English')
      ) as string;
      const release_date = set.language_release_dates[engKey];
      const cards = set.language_cards[engKey];

      return {
        ...set,
        release_date,
        cards
      } as YGOSet;
    });
}

export function getFeaturedSets() {
  return request('all_sets').then(response => {
    const featuredNames = shuffle(response.sets as string[]).slice(0, 4);

    return Promise.all(featuredNames.map(getSet));
  });
}
