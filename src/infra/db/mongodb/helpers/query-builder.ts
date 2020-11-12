export class QueryBuild {
  private readonly query = []

  match (data: object): QueryBuild {
    this.query.push({
      $match: data
    })
    return this
  }

  group (data: object): QueryBuild {
    this.query.push({
      $group: data
    })
    return this
  }

  unwind (data: object): QueryBuild {
    this.query.push({
      $unwind: data
    })
    return this
  }

  lookup (data: object): QueryBuild {
    this.query.push({
      $lookup: data
    })
    return this
  }

  addFields (data: object): QueryBuild {
    this.query.push({
      $addFields: data
    })
    return this
  }

  project (data: object): QueryBuild {
    this.query.push({
      $project: data
    })
    return this
  }

  build (): object[] {
    return this.query
  }
}
