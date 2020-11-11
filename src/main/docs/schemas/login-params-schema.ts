export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'user@email.com'
    },
    password: {
      type: 'string',
      example: 's&n#@666'
    }
  },
  required: ['email', 'password']
}
