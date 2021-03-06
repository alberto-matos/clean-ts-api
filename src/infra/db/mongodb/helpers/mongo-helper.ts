import { Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  uri: null as string,
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      this.client.close()
      this.client = null
    }
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (data: any): any {
    if (data) {
      const { _id, ...dataWithoutId } = data
      return Object.assign({}, dataWithoutId, { id: _id })
    }
    return null
  },

  mapCollection (collection: any[]): any {
    return collection.map(item => MongoHelper.map(item))
  }
}
