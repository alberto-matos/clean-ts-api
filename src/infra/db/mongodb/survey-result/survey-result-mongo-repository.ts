import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel, MongoHelper } from './survey-result-mongo-repository-protocols'
import { Collection } from 'mongodb'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  private async getAccountCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('surveyResults')
  }

  async save (surveyData: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await (await this.getAccountCollection()).findOneAndUpdate({
      surveyId: surveyData.surveyId,
      accountId: surveyData.accountId
    }, {
      $set: {
        answer: surveyData.answer,
        date: surveyData.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return surveyResult && MongoHelper.map(surveyResult.value)
  }
}
