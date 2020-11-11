export const forbiddenComponent = {
  description: 'Acesso Negado',
  content: {
    'application/json': {
      example: 'Forbidden',
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
