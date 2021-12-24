import { s3 } from "../infrastractures/s3";
import dayjs from 'dayjs';

export class saveJsonS3Service {
  private s3: any;
  public constructor() {
    this.s3 = new s3('buysell-scraping-result')
  }

  public execute = (data: any[]): [] => {
    this.s3.put('mapcamera/display.json', data);
    const filepath = `mapcamera/logs/${dayjs().format('YYYYMMDD')}.json`
    return this.s3.put(filepath, data);
 }
}