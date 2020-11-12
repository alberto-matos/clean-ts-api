export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
      example: 'image.jpg'
    },
    answer: {
      type: 'string',
      example: 'NodeJs, Python, TypeScript'
    },
    count: {
      type: 'integer',
      example: '1'
    },
    percent: {
      type: 'number',
      example: '20'
    }
  },
  required: ['answer', 'count', 'percent']
}
