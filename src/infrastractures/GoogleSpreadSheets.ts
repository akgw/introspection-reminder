export class GoogleSpreadSheets {
  private spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(spreadsheetId: string) {
    this.spreadsheet =SpreadsheetApp.openById(spreadsheetId)
  }

  public fetchValueRange = (tabTitle: string): any[] => {
    return this.spreadsheet.getSheetByName(tabTitle)?.getDataRange().getValues() as any[];
  }

  public fetchHeader = (tabTitle: string) => {
    var last_col = this.spreadsheet.getSheetByName(tabTitle)?.getLastColumn() as number;
    return this.spreadsheet.getSheetByName(tabTitle)?.getRange(1, 1, 1, last_col).getValues().find(value => true) as string[];
  }

  public fetchBody = (tabTitle: string, includeHeader = false) => {
    const sheet = this.spreadsheet.getSheetByName(tabTitle)?.getDataRange().getValues() as unknown[];
    if (!includeHeader && sheet) {
      sheet.shift();
    }

    return sheet as string[][]
  }

  public putValue = (tabTitle: string, row: number, column: number, value: string): void => {        
    this.spreadsheet.getSheetByName(tabTitle)?.getRange(row, column).setValue(value)
  }

  public putValueRange = (tabTitle: string, values: Object[]): void => {
    const numRows = values.length;
    const numColumns = Object.keys(values.find(() => true) as Object).length
        
    this.spreadsheet.getSheetByName(tabTitle)?.getRange(1, 1, numRows, numColumns).setValues(this.toArray(values))
  }

  public clearContentsSheet = (tabTitle: string): void => {
    this.spreadsheet.getSheetByName(tabTitle)?.clearContents();
  }

  private toArray = (objectArray: Object[]) => {
    return objectArray.map((object: any) => {
      return typeof(object) === 'object' ? Object.values(object): object
    })
  }
}