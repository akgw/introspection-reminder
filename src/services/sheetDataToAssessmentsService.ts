import { Assessment } from "../@types/assessments";

export class sheetDataToAssessmentsService {
  private sheetData: any[];
  private deleteHeader: boolean;
  constructor(sheetData: any[], deleteHeader: boolean) {
    this.sheetData = sheetData;
    this.deleteHeader = deleteHeader
  }

  public execute(): Assessment[] {
    const assessments:Assessment[] = []
    this.sheetData.map(row => {
      const [jan, name, images, manufacturer, category, appraisal, maxAppraisal, newAppraisal, condition3Appraisal, condition5Appraisal, condition6Appraisal, isDeleted, isOneprice, url] = row;

      const assessment: Assessment = {
        jan,
        name,
        images,
        manufacturer,
        category,
        appraisal,
        maxAppraisal,
        newAppraisal,
        condition3Appraisal,
        condition5Appraisal,
        condition6Appraisal,
        isDeleted,
        isOneprice,
        isManual: true,
        url
      }
      assessments.push(assessment)
    })
    if (this.deleteHeader) {
      assessments.shift();
    }

    return assessments
  }
}
