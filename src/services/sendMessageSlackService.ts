export class sendMessageSlackService {
  private webhook_url: any;
  private channel: any;
  public constructor(url: string, channel: string) {
    this.webhook_url = url;
    this.channel = channel;
  }

  public sendInfo = (title: string, text: string) => {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: "application/json",
      payload: JSON.stringify({
        channel: this.channel,
        username:"Output Ojisan",
        icon_emoji: ":panda_face:",
        attachments: [
          {
            title: title,
            text: text,
            color: "good",    
          }
        ],
      })
    }

    UrlFetchApp.fetch(this.webhook_url, options)
  }

  public sendError = (title: string, text: string, error: Error) => {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: "application/json",
      payload: JSON.stringify({
        channel: this.channel,
        username:"Output Ojisan",
        icon_emoji: ":panda_face:",
        attachments: [
          {
            title: title,
            text: text,
            color: "danger",
            fields: [
              {
                title: "error name",
                value: error.name,
                short: true
              },
              {
                title: "error message",
                  value: error.message,
                  short: true
              },
              {
                title: "stack trace",
                value: error.stack as string,
              }
            ]
          }
        ]
      })
    }

    UrlFetchApp.fetch(this.webhook_url, options)
  }
}