import { MANUAL_SHEET_ID, MANUAL_SHEET_NAME, MANUAL_SHEET_MASTER_NAME, VIEWS_SHEET_ID, VIEWS_SHEET_NAME } from "./infrastractures/environments";
import { fetchJsonS3Service } from "./services/fetchJsonS3Service";
import { GoogleSpreadSheets } from "./infrastractures/googleSpreadSheets";
import { mergeappraisalsService } from "./services/mergeAppraisalsService";
import { sheetDataToappraisalsService } from "./services/sheetDataToAppraisalsService";
import { considerappraisalservice } from "./services/considerappraisalservice";

declare var global: any;

global.main = () => {
  const manualAppraisals = new sheetDataToappraisalsService(
    new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_NAME),
    true
  ).execute();
 
  const systemAppraisals = new fetchJsonS3Service().execute('mapcamera_scraping_result.json')

  const mergedResult = new mergeappraisalsService(systemAppraisals, manualAppraisals).execute();
  mergedResult.sort((a, b) => {
    return a.jan > b.jan ? 1 : -1 
  })
  console.log(`[INFO] manualAppraisals:${manualAppraisals.length}`);
  console.log(`[INFO] systemAppraisals:${systemAppraisals.length}`);
  console.log(`[INFO] mergedResult:${mergedResult.length}`);

  const result = new considerappraisalservice(
    new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_MASTER_NAME),
    mergedResult
  ).execute();
  
  const viewsSheets = new GoogleSpreadSheets(VIEWS_SHEET_ID)
  const header: any = viewsSheets.fetchHeader(VIEWS_SHEET_NAME);
  viewsSheets.clearContentsSheet(VIEWS_SHEET_NAME);
  viewsSheets.putValueRange(VIEWS_SHEET_NAME, [header].concat(result))
}
