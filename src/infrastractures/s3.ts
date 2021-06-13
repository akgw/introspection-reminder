import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../infrastractures/environments';

declare var S3: any;
declare var S3v4: any;

export class s3 {
  private s3: typeof S3;
  private s3v4: typeof S3v4;
  private bucketName: string;
  public constructor(bucketName: string) {
    this.s3 = S3.getInstance(
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY
    );
    this.bucketName = bucketName

    this.s3v4 = S3v4.getInstance(
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY
    );
  }

  public fetch = (filepath: string): [] => {
    return JSON.parse(this.s3.getObject(this.bucketName, filepath))
  }

  public put = (filepath: string, data: any[]): void => {
    const blob = Utilities.newBlob(JSON.stringify(data), "text/json", "UTF-8");
    this.s3v4.putObject(this.bucketName, filepath, blob, {logRequests: true})
  }
}
