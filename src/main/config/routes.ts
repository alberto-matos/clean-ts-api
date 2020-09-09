import { Express, Router } from 'express'
import fb from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  fb.sync('**/src/main/routes/**routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
