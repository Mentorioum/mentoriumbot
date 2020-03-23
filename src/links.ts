import { Link, LinkOutput } from './link';

export interface Links {

  iterate(): Iterable<Link>

  toJSON(): Iterable<LinkOutput>
}
