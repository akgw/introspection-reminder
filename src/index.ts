import { MANUAL_SHEET_ID, MANUAL_SHEET_NAME, SYSTEM_SHEET_ID, SYSTEM_SHEET_NAME } from "./infrastractures/environments";
import { GoogleSpreadSheets } from "./infrastractures/GoogleSpreadSheets";
import { mergeAssessmentsService } from "./services/mergeAssessmentsService copy";
import { sheetDataToAssessmentsService } from "./services/sheetDataToAssessmentsService";

declare var global: any;

global.main = async () => {
  const manualSheets = new GoogleSpreadSheets(MANUAL_SHEET_ID)
  const manualAssessments = new sheetDataToAssessmentsService(manualSheets.fetchValueRange(MANUAL_SHEET_NAME), true).execute();

  const systemSheets = new GoogleSpreadSheets(SYSTEM_SHEET_ID)
  const systemAssessments = new sheetDataToAssessmentsService(systemSheets.fetchValueRange(SYSTEM_SHEET_NAME), true).execute();

  const result = new mergeAssessmentsService(systemAssessments, manualAssessments).execute();
  console.log(result)
}
