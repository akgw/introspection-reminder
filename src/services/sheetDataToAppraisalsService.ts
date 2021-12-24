import { Appraisal } from "../@types/appraisal";

export class sheetDataToAppraisalsService {
  private sheetData: any[];
  private deleteHeader: boolean;
  constructor(sheetData: any[], deleteHeader: boolean) {
    this.sheetData = sheetData;
    this.deleteHeader = deleteHeader
  }

  public execute(): Appraisal[] {
    const appraisals:Appraisal[] = []
    this.sheetData.map(row => {
      const [jan, name, images, manufacturer, largeCategory, category, appraisal, maxAppraisal, newAppraisal, condition3Appraisal, condition5Appraisal, condition6Appraisal, updatedAt, isOneprice, url, sort] = row;

      const Appraisal: Appraisal = {
        jan,
        name,
        images,
        manufacturer,
        largeCategory,
        category,
        appraisal,
        maxAppraisal,
        newAppraisal,
        condition3Appraisal,
        condition5Appraisal,
        condition6Appraisal,
        updatedAt,
        isOneprice,
        isManual: true,
        url,
        sort: sort || 999
      }
      appraisals.push(Appraisal)
    })
    if (this.deleteHeader) {
      appraisals.shift();
    }

    return appraisals
  }
}
