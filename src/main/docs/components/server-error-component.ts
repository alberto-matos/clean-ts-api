export const serverErrorComponent = {
  description: 'Falha no Servidor',
  content: {
    'application/json': {
      example: 'Server Error',
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
