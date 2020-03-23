import { Link, LinkOutput } from './link';

export class ConstLink implements Link {
  private readonly _uri: string;
  private readonly _title: string;

  constructor(uri: string, title: string) {
    this._uri = uri;
    this._title = title;
  }

  uri (): string {
    return this._uri;
  }

  title(): string {
    return this._title;
  }

  toJSON(): LinkOutput {
    return  {
      uri: this.uri(),
      title: this.title()
    }
  }
}
