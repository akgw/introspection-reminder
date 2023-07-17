import { Row } from "./@types/row";
import { SHEET_ID, SHEET_NAME, SLACK_WEBHOOK_URL, SLACK_CHANNEL } from "./infrastractures/environments";
import { GoogleSpreadSheets } from "./infrastractures/googleSpreadSheets";
import { sendMessageSlackService } from "./services/sendMessageSlackService";
import dayjs from 'dayjs';

declare var global: any;
global.main = () => {
  const slack = new sendMessageSlackService(SLACK_WEBHOOK_URL, SLACK_CHANNEL);

  try {   
    const sheet = new GoogleSpreadSheets(SHEET_ID)
    const header: string[] = sheet.fetchHeader(SHEET_NAME);
    const body: string[][] = sheet.fetchBody(SHEET_NAME);
    const contents = body.map(row => {
      //reduce
      return row.reduce((accumulator: any, current: any, index: number) => {
        const key = header[index]
        return {...accumulator, [key]: current}
      }, {}) as Row
    })

    const content = contents.slice().sort((a,b) => {
      if (!dayjs(a.sended_at).isValid()) return -1
      if (!dayjs(b.sended_at).isValid()) return 1
      return dayjs(a.sended_at).isBefore(dayjs(b.sended_at))? -1 : 1
    })[0]

    slack.sendInfo(content.author, content.url, content.title, content.introspection)

    sheet.putValue(SHEET_NAME, contents.findIndex(row => {
      return row === content
    }) + 2, Object.keys(content).length, dayjs().format('YYYY/MM/DD')
    )

    console.log('finished')
  } catch (e) {
    console.error('Error', e)
  }
}
