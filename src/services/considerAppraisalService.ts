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

    return this.appraisals.map(appraisal => {
      // 画像データはs.jpgからl.jpgへ変更する
      appraisal.url = appraisal.url.replace('s.jpg', 'l.jpg')

      if (!appraisal.appraisal) {
        return appraisal
      }

      const reference = references.find(reference => reference.category == appraisal.category) || references.find(reference => reference.category == 'default') as Reference
      appraisal.maxAppraisal = `${Number(appraisal.appraisal) * Number(reference.rate)}`
      return appraisal
    })
  }
}
