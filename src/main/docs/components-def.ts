import { apiKeyAuthsSchema } from './schemas'
import {
  badRequestComponent,
  unauthorizedComponent,
  serverErrorComponent,
  notFoundComponent,
  forbiddenComponent
} from './components'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthsSchema
  },
  badRequest: badRequestComponent,
  unauthorized: unauthorizedComponent,
  serverError: serverErrorComponent,
  notFound: notFoundComponent,
  forbidden: forbiddenComponent
}
