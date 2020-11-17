import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyResult, LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'
import { SaveSurveyResultParams, SaveSurveyResultRepository, SaveSurveyResult } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult, LoadSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return await this.load(data.surveyId)
  }

  async load (surveyId: string): Promise<SurveyResultModel> {
    return await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}
