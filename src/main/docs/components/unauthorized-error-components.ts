export const unauthorizedComponent = {
  description: 'Autenticação Requerida',
  content: {
    'application/json': {
      example: 'Unauthorized',
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
