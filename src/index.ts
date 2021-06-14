import { MANUAL_SHEET_ID, MANUAL_SHEET_NAME, MANUAL_SHEET_MASTER_NAME, VIEWS_SHEET_ID, VIEWS_SHEET_NAME, SLACK_WEBHOOK_URL, SLACK_CHANNEL } from "./infrastractures/environments";
import { loadJsonS3Service } from "./services/loadJsonS3Service";
import { GoogleSpreadSheets } from "./infrastractures/googleSpreadSheets";
import { mergeAppraisalsService } from "./services/mergeAppraisalsService";
import { sheetDataToAppraisalsService } from "./services/sheetDataToAppraisalsService";
import { considerAppraisalService } from "./services/considerAppraisalService";
import { sendMessageSlackService } from "./services/sendMessageSlackService";
import { saveJsonS3Service } from "./services/saveJsonS3Service";
import { loadLatestApprisalsService } from "./services/loadLatestApprisalsService";

declare var global: any;
global.main = () => {
  const slack = new sendMessageSlackService(SLACK_WEBHOOK_URL, SLACK_CHANNEL);
  slack.sendInfo('Camera Crawl Notification :start:', 'Output Google App Script Start.')

  try {
    const manualAppraisals = new sheetDataToAppraisalsService(
      new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_NAME),
      true
    ).execute();
   
    const systemAppraisals = new loadJsonS3Service().execute('mapcamera_scraping_result.json')
    const latestAppraisals = new loadLatestApprisalsService().execute()
    const mergedResult = new mergeAppraisalsService(systemAppraisals, manualAppraisals, latestAppraisals).execute();
  
    const viewsSheets = new GoogleSpreadSheets(VIEWS_SHEET_ID)
    const header: any = viewsSheets.fetchHeader(VIEWS_SHEET_NAME);

    // 係数など計算処理
    const considerdResult = new considerAppraisalService(
      new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_MASTER_NAME),
      mergedResult
    ).execute().filter(row => {
      return Object.keys(row).length == Object.keys(header).length
    }).sort((a, b) => {
      return a.jan > b.jan ? 1 : -1 
    })

    viewsSheets.clearContentsSheet(VIEWS_SHEET_NAME);
    viewsSheets.putValueRange(VIEWS_SHEET_NAME, [header].concat(considerdResult))
    
    slack.sendInfo('Camera Crawl Notification :successed:',
      `Output Google App Script Finished.\nmanual: ${manualAppraisals.length}, system: ${systemAppraisals.length}, output: ${considerdResult.length}`
    )
    new saveJsonS3Service().execute(considerdResult)
  } catch (e) {
    slack.sendError('Camera Crawl Notification :failed:', 'Output Google App Script Finished.', e)
  }
}
