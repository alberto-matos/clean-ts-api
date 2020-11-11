export const addSurveySchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string',
      example: 'Qual sua linguagem preferida?'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    }
  }
}
