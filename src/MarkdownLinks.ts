import { Links } from './links';
import { Link } from './link';

export class MarkdownLinks implements Links {
  iterate(): Iterable<Link> {
    return [];
  }
}
