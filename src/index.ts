import { MANUAL_SHEET_ID, MANUAL_SHEET_NAME, SYSTEM_SHEET_ID, SYSTEM_SHEET_NAME, VIEWS_SHEET_ID, VIEWS_SHEET_NAME } from "./infrastractures/environments";
import { GoogleSpreadSheets } from "./infrastractures/GoogleSpreadSheets";
import { mergeAssessmentsService } from "./services/mergeAssessmentsService copy";
import { sheetDataToAssessmentsService } from "./services/sheetDataToAssessmentsService";

declare var global: any;

global.main = async () => {
  const manualAssessments = new sheetDataToAssessmentsService(
    new GoogleSpreadSheets(MANUAL_SHEET_ID).fetchValueRange(MANUAL_SHEET_NAME),
    true
  ).execute();

  const systemAssessments = new sheetDataToAssessmentsService(
    new GoogleSpreadSheets(SYSTEM_SHEET_ID).fetchValueRange(SYSTEM_SHEET_NAME),
    true
  ).execute();
  
  const result = new mergeAssessmentsService(systemAssessments, manualAssessments).execute();
  result.sort((a, b) => {
    return a.jan > b.jan ? 1 : -1 
  })

  const viewsSheets = new GoogleSpreadSheets(VIEWS_SHEET_ID)
  const header: any = viewsSheets.fetchHeader(VIEWS_SHEET_NAME);
  viewsSheets.clearContentsSheet(VIEWS_SHEET_NAME);
  viewsSheets.putValueRange(VIEWS_SHEET_NAME, [header].concat(result))
}
