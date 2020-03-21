import { Links } from './links';
import { Link } from './link';

export class MarkdownLinks implements Links {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  iterate(): Iterable<Link> {
    return [];
  }
}
