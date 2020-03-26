import { Link, LinkOutput } from './link';
import { Links } from './links';
import { cloneDeep, map }from 'lodash'

export class ConstLinks implements Links {
  private array: Link[];

  constructor(array: Link[]) {
    this.array = array;
  }

  iterate(): Iterable<Link> {
    return cloneDeep(this.array);
  }

  toJSON(): Iterable<LinkOutput>{
    return map(this.array, link => link.toJSON());
  }
}
