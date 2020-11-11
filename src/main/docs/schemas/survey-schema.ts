export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '5fa9463b489dd1671eb323db'
    },
    question: {
      type: 'string',
      example: 'Qual sua linguagem preferida?'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    },
    date: {
      type: 'string',
      example: '11/11/2020'
    }
  }
}
