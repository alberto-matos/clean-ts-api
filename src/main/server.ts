import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/environments'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running on port: ${env.port}`))
  })
  .catch(console.error)
