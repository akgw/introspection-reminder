export const sendMessage = async (body: string) => {
  const roomId = process.env.CW_ROOMID as string
  const token = process.env.CW_TOKEN as string
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    "method" : "post",
    "payload" : {
      "body" : body
    },
    "headers" : {
      "X-ChatWorkToken" : token
    }
  };
  try {
   UrlFetchApp.fetch(`https://api.chatwork.com/v2/rooms/${roomId}/messages`, options);
  } catch (error) {
    console.log(error)
  }
}
