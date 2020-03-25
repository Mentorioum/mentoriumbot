import MarkdownIt from 'markdown-it';
import { MarkdownitLinks } from './markdownit.links';
import { ConstLink } from './const.link';

describe('MarkdownLinks', () => {
  let links, actual, expected, markit;

  beforeEach(() => {
    markit = new MarkdownIt();
  });

  it('create with empty content', () => {
    links = new MarkdownitLinks('', markit);

    expect(links.iterate()).toEqual([]);
  });

  it('create with one link', () => {
    links = new MarkdownitLinks(`
    1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md) [~3h]
    `,markit);
    expected = new ConstLink(
      'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
      'Chapter 1: What Is JavaScript?',
    ).toJSON();

    actual = links.iterate().pop().toJSON();
    expect(actual).toEqual(expected);
  });

  it('creates with two links', () => {
    links = new MarkdownitLinks(`
1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md)[~3h]
2. [Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md)[~3h]`,
    markit);

    expected = [
      new ConstLink(
        'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
        'Chapter 1: What Is JavaScript?'
      ).toJSON(),
      new ConstLink(
        'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md',
        'Chapter 2: Surveying JS'
      ).toJSON()
    ];

    actual = links.toJSON();
    expect(actual).toEqual(expected);
  });

  it('creates with two links and verification mentor', () => {
    // TODO: #41 parse attributes
    links = new MarkdownitLinks(`
1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md)[~3h]
1. [Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md)[~3h]
1. [Interview Checkpoint](@nesterone)(verify)
`, markit);

    expected = [
      new ConstLink(
        'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md',
        'Chapter 1: What Is JavaScript?'
      ).toJSON(),
      new ConstLink(
        'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md',
        'Chapter 2: Surveying JS'
      ).toJSON(),
      new ConstLink(
        '@nesterone',
        'Interview Checkpoint',
        'verify'
      ).toJSON()
    ];

    actual = links.toJSON();
    expect(actual).toEqual(expected);
  })

});
