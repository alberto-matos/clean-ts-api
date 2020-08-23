export class ServerError extends Error {
  constructor () {
    super('Server error, try again a feel minutes')
    this.name = 'ServerError'
  }
}
