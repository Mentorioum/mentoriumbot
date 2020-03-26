export class NotYetImplementedException extends Error {

  get name () {
    return this.constructor.name;
  }

}
