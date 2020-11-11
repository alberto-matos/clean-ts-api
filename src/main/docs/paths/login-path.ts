export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticação de usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/badRequest'
            }
          }
        }
      },
      401: {
        description: 'Error: Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/unauthorized'
            }
          }
        }
      }
    }
  }
}
