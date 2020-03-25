import MarkdownIt from 'markdown-it';
import { Links } from './links';
import { Link, LinkOutput } from './link';
import { ConstLink } from './const.link';

/**
 * @todo #39:1h/DEV Extend with parsing assignee and third task
 *
 *
 */
export class MarkdownitLinks implements Links {
  private content: string;
  private markdown: MarkdownIt;

  constructor(content: string, markdown: MarkdownIt) {
    this.content = content;
    this.markdown = markdown;
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

      let link;
      let isClosed = false;

      for (let subtoken of subtokens) {

        if (subtoken.type === 'link_open') {
          isClosed = false;
          const attrs = subtoken.attrs;

          if (attrs.length) {
            link = { uri: attrs[0][1] }
          }
        }

        if (!isClosed && link && subtoken.type === 'text') {
          let title = subtoken.content;
          link = { ...link, title }
        }


        if (!isClosed && link && subtoken.type === 'link_close') {
          isClosed = true;
        }

        if (link && isClosed && subtoken.type === 'text') {
          let text = subtoken.content;
          let relation = '';
          let relationPattern = /\((.*)\)/;

          let relationMatch = text.match(relationPattern);
          if (relationMatch && relationMatch.length >= 2) {
            relation = relationMatch[1];
          }

          links.push(new ConstLink(link.uri, link.title, relation));
          link = null
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
