import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(); //adminを初期化
const db = admin.firestore(); //admin権限でfirestoreを操作する

 /**
 * APIを叩くと必ずレスポンスを返すのだが、そのレスポンスを返すための関数を作ってあげる
 * Cloud Functions内でしか呼び出されないので、exportはいらない。
 */
const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
}

export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
    if (req.method !== 'POST') {
        sendResponse(res, 405, { error: 'Invalid Request!' });
    } else {
        const dataset = req.body;
        for (const key of Object.keys(dataset)) {
            /**
             * await: 非同期処理の実行を一時停止し、Promiseが決定・履行された後に処理を再開する。即時関数ともいうらしい。
             * https://qiita.com/katsukii/items/cfe9fd968ba0db603b1e
             * questions: firestoreにquestionsというコレクションを作成する。その中にデータを入れていく
             * doc: documentの意。keyを引数に入れたので、initやjob_offerといったkeyのdocumentがfirestoreに作成される。
             * そしてその中に各データが格納されていく
             * https://firebase.google.com/docs/firestore?hl=ja
             */
            const data = dataset[key];
            await db.collection('questions').doc(key).set(data);
        }
        sendResponse(res, 200, { message: 'Successfully added dataset!' });
    }
});