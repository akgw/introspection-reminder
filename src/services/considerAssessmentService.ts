import { Assessment } from "../@types/assessments";

interface Reference {
  category: string;
  rate: string;
}

export class considerAssessmentService {
  private sheetData: any[];
  private assessments: Assessment[];
  constructor(sheetData: any[], assessments: Assessment[]) {
    this.sheetData = sheetData;
    this.assessments = assessments;
  }

  public execute(): Assessment[] {
    const references: Reference[] = [];
    this.sheetData.map(row => {
      const [category, rate] = row;
      references.push({
        category,
        rate
      })
    })

    return this.assessments.map(assessment => {
      if (!assessment.appraisal) {
        return assessment
      }

      const reference = references.find(reference => reference.category == assessment.category) || references.find(reference => reference.category == 'default') as Reference
      assessment.maxAppraisal = `${Number(assessment.appraisal) * Number(reference.rate)}`
      return assessment
    })
  }
}
