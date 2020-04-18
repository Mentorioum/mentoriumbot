import { Link, LinkOutput } from './link';

export class ConstLink implements Link {
  private readonly _uri: string;
  private readonly _title: string;
  private readonly _relation: string;

  constructor(uri: string, title: string, relation: string = '') {
    this._uri = uri;
    this._title = title;
    this._relation = relation;
  }

  uri (): string {
    return this._uri;
  }

  title(): string {
    return this._title;
  }

  relation(): string {
    return this._relation;
  }

  toJSON(): LinkOutput {
    return  {
      uri: this.uri(),
      title: this.title(),
      relation: this.relation()
    }
  }
}
