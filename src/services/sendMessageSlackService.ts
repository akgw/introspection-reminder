export class sendMessageSlackService {
  private webhook_url: any;
  private channel: any;
  public constructor(url: string, channel: string) {
    this.webhook_url = url;
    this.channel = channel;
  }

  public sendInfo = (authorName: string, authorLink: string, title: string, text: string) => {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: "application/json",
      payload: JSON.stringify({
        channel: this.channel,
        username:"1d1m",
        icon_emoji: ":man:",
        text: `<${authorLink}|1Day_1Meigen>`,
        unfurl_links: true,
        "attachments": [
          {
            "mrkdwn_in": ["text"],
              "color": "good",
              "author_name": authorName,
              "author_link": authorLink,
              "fields": [
                  {
                      "title": title,
                      "value": "```" + text + "```",
                      "short": false
                  }
              ],
              "footer": "設定ファイル： https://docs.google.com/spreadsheets/d/1MHQWo7-VqZGZqZ4qSEa02-bGZycbOGoohMuUvQvbo4E",
          }
      ]
      })
    }

    UrlFetchApp.fetch(this.webhook_url, options)
  }
}