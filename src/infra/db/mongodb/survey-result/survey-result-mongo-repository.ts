import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultParams, MongoHelper, getQuery } from './survey-result-mongo-repository-protocols'
import { Collection, ObjectId } from 'mongodb'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  private async getSurveyResultCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('surveyResults')
  }

  async save (surveyData: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await (await this.getSurveyResultCollection()).findOneAndUpdate({
      surveyId: new ObjectId(surveyData.surveyId),
      accountId: new ObjectId(surveyData.accountId)
    }, {
      $set: {
        answer: surveyData.answer,
        date: surveyData.date
      }
    }, {
      upsert: true
    })
    return await this.loadBySurveyId(surveyData.surveyId)
  }

  private async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    const query = (await this.getSurveyResultCollection()).aggregate(getQuery(surveyId))
    const surveyResult = await query.toArray()
    return surveyResult[0]
  }
}
