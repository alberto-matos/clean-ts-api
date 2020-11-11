export const notFoundComponent = {
  description: 'API não Encontrada',
  content: {
    'application/json': {
      example: 'Not Found',
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
