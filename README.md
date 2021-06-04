# Google App Script
## 設定
.clasp.jsonを作成
```
{"scriptId":"xxxx","rootDir":"./dist"}
```
scriptIdは個人のアカウントで作成したIDを使用


## デプロイ
yarn deploy

## Q&A
初回PUSH時のエラー
```
GaxiosError: User has not enabled the Apps Script API. Enable it by visiting https://script.google.com/home/usersettings then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
...
```
手順の通りURLへ遷移してApp Script APIを有効化してください。

## 実行時
GASのプロパティサービスで下記を設定してください。
```
MANUAL_SHEET_ID: 手動シートのシートID
MANUAL_SHEET_NAME: 手動シートのシート名
SYSTEM_SHEET_ID: システムシートのシートID
SYSTEM_SHEET_NAME: システムシートのシート名
```
