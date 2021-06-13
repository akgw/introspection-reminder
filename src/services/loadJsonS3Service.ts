import { s3 } from "../infrastractures/s3";
export class loadJsonS3Service {
  private s3: any;
  public constructor() {
    this.s3 = new s3('buysell-scraping-result')
  }

  public execute = (): [] => {
    return this.s3.fetch('mapcamera_scraping_result.json');
 }
}