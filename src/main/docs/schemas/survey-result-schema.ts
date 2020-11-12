export const surveyResultSchema = {
  type: 'object',
  properties: {
    surveyId: {
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
        $ref: '#/schemas/surveyResultAnswer'
      }
    },
    date: {
      type: 'string',
      example: '11/11/2020'
    }
  },
  required: ['surveyId', 'question', 'answers', 'date']
}
