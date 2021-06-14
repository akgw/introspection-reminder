import dayjs from "dayjs";
import { Appraisal } from "../@types/appraisal";
import { loadJsonS3Service } from "./loadJsonS3Service";

// 前回実行結果を取得
// gasのs3ライブラリだとlist取得できないためマッチするまで複数回リクエスト
export class loadLatestApprisalsService {
  public execute = (): Appraisal[] => {
    let ret: Appraisal[] = [];
    for(let day = 0; day < 10; day++) {
      const filename = dayjs().subtract(day, 'day').format('YYYYMMDD') + '.json'
      ret = new loadJsonS3Service().execute(`mapcamera/logs/${filename}`)
      if (ret.length > 0) {
        break;
      }
    }
    return ret;
  }
}