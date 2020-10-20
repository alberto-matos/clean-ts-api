import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyRepository, AddSurveyModel, MongoHelper, Collection } from './survey-mongo-repository-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  private async getAccountCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('surveys')
  }

  async add (surveyData: AddSurveyModel): Promise<void> {
    await (await this.getAccountCollection()).insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    return await (await this.getAccountCollection()).find().toArray()
  }
}
