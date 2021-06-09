import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../infrastractures/environments';
declare var S3: any;

export class fetchJsonS3Service<T> {
  private s3: typeof S3;
  public constructor() {
    this.s3 = S3.getInstance(
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY
    );
  }

  public execute = (filepath: string): any[] => {
    const str = this.s3.getObject('buysell-scraping-result', filepath);
    
    return JSON.parse(str);
 }
}