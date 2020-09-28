export interface AddSurveyModel {
  body: {
    question: string
    answers: [{
      image?: string
      answer: string
    }]
  }
}

export interface AddSurvey {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
