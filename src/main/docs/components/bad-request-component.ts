export const badRequestComponent = {
  description: 'Requisição Inválida',
  content: {
    'application/json': {
      example: 'Bad Request',
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
