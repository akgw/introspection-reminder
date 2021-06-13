import { Appraisal } from "../@types/appraisal";

interface Reference {
  category: string;
  rate: string;
}

export class considerAppraisalService {
  private sheetData: any[];
  private appraisals: Appraisal[];
  constructor(sheetData: any[], appraisals: Appraisal[]) {
    this.sheetData = sheetData;
    this.appraisals = appraisals;
  }

  public execute(): Appraisal[] {
    const references: Reference[] = [];
    this.sheetData.map(row => {
      const [category, rate] = row;
      references.push({
        category,
        rate
      })
    })

    return this.appraisals.map(Appraisal => {
      if (!Appraisal.appraisal) {
        return Appraisal
      }

      const reference = references.find(reference => reference.category == Appraisal.category) || references.find(reference => reference.category == 'default') as Reference
      Appraisal.maxAppraisal = `${Number(Appraisal.appraisal) * Number(reference.rate)}`
      return Appraisal
    })
  }
}
