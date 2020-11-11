import { loginPath } from './paths'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas'
import { badRequestComponent, unauthorizedComponent, serverErrorComponent, notFoundComponent } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean API - by Alberto Matos',
    description: `Projeto destinado ao aprendizado de: \n
      * nodeJs \n
      * TypeScript \n      * 
      * Clean architecture \n
      * SOLID \n
      * TDD `,
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api',
    description: 'Prefixo padrão para todas as APIs'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    serverError: serverErrorComponent,
    notFound: notFoundComponent
  }
}
