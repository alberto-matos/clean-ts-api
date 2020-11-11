import swaggerConfig from '@/main/docs'
import { swaggerNoCache } from '@/main/middlewares/swagger-no-cache'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/api-docs', swaggerNoCache, serve, setup(swaggerConfig))
}
