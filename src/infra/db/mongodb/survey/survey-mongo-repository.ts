import { AddSurveyRepository, AddSurveyModel, MongoHelper, Collection } from './survey-mongo-repository-protocols'

export class SurveyMongoRepository implements AddSurveyRepository {
  private async getAccountCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('surveys')
  }

  async add (surveyData: AddSurveyModel): Promise<void> {
    await (await this.getAccountCollection()).insertOne(surveyData)
  }
}
