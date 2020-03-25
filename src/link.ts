export interface LinkOutput {
  uri: string,
  title: string,
  relation: string
}

export interface Link {
  uri (): string
  title(): string
  relation(): string
  toJSON(): LinkOutput
}
