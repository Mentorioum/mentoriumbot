import { Link, LinkOutput } from './link';
import { Links } from './links';
import { cloneDeep, map }from 'lodash'

export class ConstLinks implements Links {
  private readonly array: Link[];

  constructor(array: Link[]) {
    this.array = array;
  }

  iterate() {
    return cloneDeep(this.array);
  }

  toJSON() {
    return map(this.array, link => link.toJSON());
  }
}
