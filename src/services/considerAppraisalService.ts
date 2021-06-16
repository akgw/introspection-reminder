import { Appraisal } from "../@types/appraisal";

interface RateMaster {
  category: string;
  rate: string;
}

interface CategoryMaster {
  largeCategory: string;
  category: string;
}

export class considerAppraisalService {
  private rateMaster: any[];
  private categoryMaster: any[];
  private appraisals: Appraisal[];

  constructor(rateMaster: string[], categoryMaster: string[], appraisals: Appraisal[]) {
    this.rateMaster = this.masterToArray<RateMaster>(rateMaster, ['category', 'rate']);
    this.categoryMaster = this.masterToArray<CategoryMaster>(categoryMaster, ['largeCategory', 'category']);
    this.appraisals = appraisals;
  }

  public execute(): Appraisal[] {
    return this.appraisals.map(appraisal => {
      // 画像データはs.jpgからl.jpgへ変更する
      appraisal.url = appraisal.url.replace('s.jpg', 'l.jpg')

      // 大カテゴリをマスタに合わせて更新する
      appraisal.largeCategory = this.findOrDefault<CategoryMaster>(this.categoryMaster, appraisal, 'category').largeCategory;
      if (!appraisal.appraisal) {
        return appraisal
      }

      const rate = this.findOrDefault<RateMaster>(this.rateMaster, appraisal, 'category').rate;
      appraisal.maxAppraisal = `${Number(appraisal.appraisal) * Number(rate)}`
      return appraisal
    })
  }

  /**
   * [{[keys[0]]: input[0], [keys[1]]: input[1]... という配列に変換
   */
  private masterToArray<T>(input: any[], keys: string[]): T[] {
    return input.map(row => {
      return row.reduce((value: string, currentValue: Object, currentIndex: number) => {
        return Object.assign(value, {[keys[currentIndex]]: currentValue})
      }, '')
    }) as T[]
  }

  private findOrDefault<T>(masters: T[], input: any, key: string): T {
    return masters.find((master: any) => master[key] == input[key]) || masters.find((master: any) => master[key] == 'default') as T
  }
}
