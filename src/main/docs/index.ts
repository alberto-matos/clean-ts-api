import { loginPath } from './paths/login-path'
import { accountSchema, loginParamsSchema, unauthorized, badRequest } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean API - by Alberto Matos',
    description: `Projeto destinado ao aprendizado de: \n
      * nodeJs \n
      * TypeScript \n      * 
      * Clean architecture \n
      * SOLID \n
      * TDD`,
    version: '1.0.0'
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
    unauthorized: unauthorized,
    badRequest: badRequest
  }
}
