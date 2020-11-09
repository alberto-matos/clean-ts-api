import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { ObjectId } from 'mongodb'
import { AddSurveyRepository, AddSurveyParams, MongoHelper, Collection } from './survey-mongo-repository-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  private async getSurveyCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('surveys')
  }

  async add (surveyData: AddSurveyParams): Promise<void> {
    await (await this.getSurveyCollection()).insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    return MongoHelper.mapCollection(await (await this.getSurveyCollection()).find().toArray())
  }

  async loadById (id: string): Promise<SurveyModel> {
    const _id = new ObjectId(id)
    const survey = await (await MongoHelper.getCollection('surveys')).findOne(_id)
    return survey && MongoHelper.map(survey)
  }
}
