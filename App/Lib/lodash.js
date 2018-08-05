// https://github.com/lodash/lodash/wiki/FP-Guide#convert

import {
  each as eachCapped,
  map as mapCapped,
  filter as filterCapped,
} from 'lodash/fp';

export const map = mapCapped.convert({ cap: false });
export const each = eachCapped.convert({ cap: false });
export const filter = filterCapped.convert({ cap: false });
