export const signupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Nome do usuário'
    },
    email: {
      type: 'string',
      example: 'user@email.com'
    },
    password: {
      type: 'string',
      example: 's&n#@666'
    },
    passwordConfirmation: {
      type: 'string',
      example: 's&n#@666'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation']
}
