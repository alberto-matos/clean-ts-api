export const surveyResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '5fa9463b489dd1671eb323db'
    },
    surveyId: {
      type: 'string',
      example: '5fa9463b489dd6171eb521db'
    },
    accountId: {
      type: 'string',
      example: '5fa9463b489dd6771eb401ba'
    },
    answer: {
      type: 'string',
      example: 'Resposta do usuário'
    },
    date: {
      type: 'string',
      example: '11/11/2020'
    }
  }
}
