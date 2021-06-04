# Google App Script
## 設定
.clasp.jsonを作成
```
{"scriptId":"xxxx","rootDir":"./dist"}
```
scriptIdは個人のアカウントで作成したIDを使用

.envを作成
```
CW_TOKEN=xxx
CW_ROOMID=yyy
```
環境に合わせて設定してください

## デプロイ
yarn deploy

## Q&A
初回PUSH時のエラー
```
GaxiosError: User has not enabled the Apps Script API. Enable it by visiting https://script.google.com/home/usersettings then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
...
```
手順の通りURLへ遷移してApp Script APIを有効かしてください。
