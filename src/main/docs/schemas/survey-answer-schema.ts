export const surveyAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
      example: 'image.jpg'
    },
    answer: {
      type: 'string',
      example: 'NodeJs, Python, TypeScript'
    }
  }
}
