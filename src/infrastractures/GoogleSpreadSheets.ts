export class GoogleSpreadSheets {
  private spreadsheetId: string = '';

  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
  }

  fetchValueRange = (tabTitle: string): any[] => {
    const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId)
    return spreadsheet.getSheetByName(tabTitle)?.getDataRange().getValues() as any[];
  }

  putValueRange = () => {
    // TODO
  }
}