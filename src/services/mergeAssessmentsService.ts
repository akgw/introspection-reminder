import { Assessment } from "../@types/assessments";

export class mergeAssessmentsService {
  private systemAssessments: Assessment[];
  private manualAssessments: Assessment[];
  constructor(systemAssessments: Assessment[], manualAssessments: Assessment[]) {
    this.systemAssessments = systemAssessments;
    this.manualAssessments = manualAssessments
  }

  /**
   * システムシートの査定額一覧を基準に、手動シートでJANコード同一のものは項目をブランク以外上書きする
   * TODO 既存の参照用データも取得して、削除フラグを加える
   */
  public execute(): Assessment[] {
    const assessments = this.overWriteAssessment(this.systemAssessments, this.manualAssessments);

    return this.addDiffAssessment(assessments, this.manualAssessments);
  }

  /**
   * JANコード非重複のデータを追加
   * 
   * @param assessments 
   * @param addAssessments 
   */
  private addDiffAssessment(assessments: Assessment[], addAssessments: Assessment[]) {
    addAssessments.map(addAssessment => {
      if (assessments.some(assessment => assessment.jan == addAssessment.jan)) {
        return;
      }

      assessments.push(addAssessment);
    })
    return assessments;
  }

  /**
   * JANコード重複の場合は空白でない項目を上書きする
   * 
   * @param baseAssessments 
   * @param overwriteAssessments 
   * @returns 
   */
  private overWriteAssessment(baseAssessments: Assessment[], overwriteAssessments: Assessment[]) {
    return baseAssessments.map(baseAssessment => {
      const overwriteAssessment = overwriteAssessments.find(overwriteAssessment => overwriteAssessment.jan == baseAssessment.jan);
      if (!overwriteAssessment) {
        return baseAssessment
      }

      Object.entries(overwriteAssessment).forEach(([key, value]) => {
        if (!value) {
          return;
        }

        baseAssessment = Object.assign(baseAssessment, {
          [key]: value
        })
      });
      return baseAssessment
    })
  }
}
