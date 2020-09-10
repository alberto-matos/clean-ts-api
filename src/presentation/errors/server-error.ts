export class ServerError extends Error {
  constructor (stack: string) {
    super('Server error, try again a feel minutes')
    this.name = 'ServerError'
    this.stack = stack
  }
}
