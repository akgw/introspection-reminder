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

## 環境設定
### プロパティサービスの設定
GASのプロパティサービスで下記を設定してください。
2021/06時点で、プロパティサービスは旧エディタからでしか変更できないため注意

| key | value description |
| -- | -- |
| AWS_ACCESS_KEY_ID | S3へのwrite権限のあるアクセスキー|
| AWS_SECRET_ACCESS_KEY | S3へのwrite権限のあるシークレットキー|
| MANUAL_SHEET_ID | 手動更新用スプレッドシートのシートID |
| MANUAL_SHEET_NAME | 手動更新用スプレッドシートのシート名 |
| MANUAL_SHEET_MASTER_NAME | MAX買取価格の係数マスタのシート名 |
| VIEWS_SHEET_ID | 閲覧用(出力先)のシートID |
| VIEWS_SHEET_NAME | 閲覧用(出力先)のシート名 |
| SLACK_WEBHOOK_URL | Slackへの通知用 |
| SLACK_CHANNEL | Slackの通知先 |

### 使用ライブラリの設定
dist/appsscript.jsonに使用ライブラリの記載があり、deploy時に自動的に選択される。
S3操作のライブラリはv3がget用、v4がput用となっており使用には注意が必要(ライブラリ側で明記されていないが、目的外の使用でエラーが発生する)