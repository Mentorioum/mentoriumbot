import MarkdownIt from 'markdown-it';
import { Links } from './links';
import { Link, LinkOutput } from './link';
import { ConstLink } from './const.link';

export class MarkdownLinks implements Links {
  private content: string;
  private markdown: MarkdownIt;

  constructor(content: string) {
    this.content = content;
    this.markdown = new MarkdownIt();
  }

  iterate(): Iterable<Link> {

    const tokens = this.markdown.parseInline(this.content, {});

    let links = [];

    for (let token of tokens) {
      if (!token.children) {
        continue;
      }

      const subtokens = token.children.filter(child => {
        return child.type === 'link_open'
          || child.type === 'text'
          || child.type === 'link_close';
      });

      let uri;
      let title = '';
      let link;

      for (let subtoken of subtokens) {

        if (subtoken.type === 'link_open') {
          const attrs = subtoken.attrs;

          if (attrs.length) {
            uri = attrs[0][1];
          }
        }

        if (uri && subtoken.type === 'text') {
          title = subtoken.content;
        }


        if (subtoken.type === 'link_close') {

          if (uri) {
            link = new ConstLink(uri, title);
            links.push(link);
          }

          uri = '';
          title = '';
        }
      }
    }

    return links;
  }

  toJSON(): Iterable<LinkOutput> {
    const outputs = [];

    for (let link of this.iterate()){
      outputs.push(link.toJSON());
    }

    return outputs;
  }


}
