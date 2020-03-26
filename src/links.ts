import { Link, LinkOutput } from './link';

export interface Links {

  iterate(): Array<Link>

  toJSON(): Array<LinkOutput>
}
