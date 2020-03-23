export interface LinkOutput {
  uri: string,
  title: string
}

export interface Link {
  uri (): string
  title(): string
  toJSON(): LinkOutput
}
