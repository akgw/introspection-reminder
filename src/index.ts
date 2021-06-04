import { sendMessage } from "./chatwork";

declare var global: any;

global.main = async () => {
  console.log("execute")
  await sendMessage('testMessage')
  console.log("finished")
}

