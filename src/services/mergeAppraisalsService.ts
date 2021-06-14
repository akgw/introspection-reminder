import dayjs from "dayjs";
import { Appraisal } from "../@types/appraisal";

export class mergeAppraisalsService {
  private systemAppraisals: Appraisal[];
  private manualAppraisals: Appraisal[];
  private latestAppraisals: Appraisal[];
  constructor(systemAppraisals: Appraisal[], manualAppraisals: Appraisal[], latestAppraisals: Appraisal[]) {
    this.systemAppraisals = systemAppraisals;
    this.manualAppraisals = manualAppraisals
    this.latestAppraisals = latestAppraisals;
  }

  /**
   * システムシートの査定額一覧を基準に、手動シートでJANコード同一のものは項目をブランク以外上書きする
   */
  public execute(): Appraisal[] {
    const appraisals = this.overWriteAppraisal(this.systemAppraisals, this.manualAppraisals)
    const currentAppraisals = this.addDiffAppraisal(appraisals, this.manualAppraisals).map(appraisal => {
      appraisal.updatedAt = dayjs().format('YYYY-MM-DD')
      return appraisal;
    });

    if (this.latestAppraisals.length <= 0) {
      return currentAppraisals;
    }

    return this.overWriteAppraisal(this.latestAppraisals, currentAppraisals)
  }

  /**
   * JANコード非重複のデータを追加
   * 
   * @param appraisals 
   * @param addAppraisals 
   */
  private addDiffAppraisal(appraisals: Appraisal[], addAppraisals: Appraisal[]) {
    addAppraisals.map(addAppraisal => {
      if (appraisals.some(Appraisal => Appraisal.jan == addAppraisal.jan)) {
        return;
      }

      appraisals.push(addAppraisal);
    })
    return appraisals;
  }

  /**
   * JANコード重複の場合は空白でない項目を上書きする
   * 
   * @param baseAppraisals 
   * @param overwriteAppraisals 
   * @returns 
   */
  private overWriteAppraisal(baseAppraisals: Appraisal[], overwriteAppraisals: Appraisal[]) {
    return baseAppraisals.map(baseAppraisal => {
      const overwriteAppraisal = overwriteAppraisals.find(overwriteAppraisal => overwriteAppraisal.jan == baseAppraisal.jan);
      if (!overwriteAppraisal) {
        return baseAppraisal
      }

      Object.entries(overwriteAppraisal).forEach(([key, value]) => {
        if (!value) {
          return;
        }

        baseAppraisal = Object.assign(baseAppraisal, {
          [key]: value
        })
      });
      return baseAppraisal
    })
  }
}
