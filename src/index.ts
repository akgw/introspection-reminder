import { MANUAL_SHEET_ID, MANUAL_SHEET_NAME, MANUAL_SHEET_MASTER_NAME, VIEWS_SHEET_ID, VIEWS_SHEET_NAME, SLACK_WEBHOOK_URL, SLACK_CHANNEL } from "./infrastractures/environments";
import { fetchJsonS3Service } from "./services/fetchJsonS3Service";
import { GoogleSpreadSheets } from "./infrastractures/googleSpreadSheets";
import { mergeappraisalsService } from "./services/mergeAppraisalsService";
import { sheetDataToappraisalsService } from "./services/sheetDataToAppraisalsService";
import { considerappraisalservice } from "./services/considerappraisalservice";
import { sendMessageSlackService } from "./services/sendMessageSlackService";

declare var global: any;
global.main = () => {
  const slack = new sendMessageSlackService(SLACK_WEBHOOK_URL, SLACK_CHANNEL);
  slack.sendInfo('Camera Crawl Notification :start:', 'Output Google App Script Start.')

  try {
    const manualAppraisals = new sheetDataToappraisalsService(
      new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_NAME),
      true
    ).execute();
   
    const systemAppraisals = new fetchJsonS3Service().execute('mapcamera_scraping_result.json')
    const mergedResult = new mergeappraisalsService(systemAppraisals, manualAppraisals).execute();
    mergedResult.sort((a, b) => {
      return a.jan > b.jan ? 1 : -1 
    })
  
    const result = new considerappraisalservice(
      new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_MASTER_NAME),
      mergedResult
    ).execute();
    
    const viewsSheets = new GoogleSpreadSheets(VIEWS_SHEET_ID)
    const header: any = viewsSheets.fetchHeader(VIEWS_SHEET_NAME);
    viewsSheets.clearContentsSheet(VIEWS_SHEET_NAME);
    viewsSheets.putValueRange(VIEWS_SHEET_NAME, [header].concat(result))
    
    slack.sendInfo('Camera Crawl Notification :successed:',
      `Output Google App Script Finished.\nmanual: ${manualAppraisals.length}, system: ${systemAppraisals.length}, merged: ${mergedResult.length}`
    )
  } catch (e) {
    slack.sendError('Camera Crawl Notification :failed:', 'Output Google App Script Finished.', e)
  }
}
