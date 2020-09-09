import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from '../main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://192.168.0.5:${env.port}`))
  })
  .catch(console.error)
