# 自治体・地域クイズ

## プライベートクイズ

公開できない画像はリポジトリへ追加せず、ローカル専用の `.prefquiz` パックとして読み込みます。パックは読み込んだ端末のブラウザ内（IndexedDB）だけに保存され、アプリからサーバーへ送信されません。PCとスマートフォンでは、それぞれの端末で同じパックを一度ずつ読み込んでください。

### パックの作り方

1. リポジトリ直下に `private-assets/my-pack/` を作ります。`private-assets/` は `.gitignore` によりGit管理対象外です。
2. `private-pack-tools/manifest-example.json` を `private-assets/my-pack/manifest.json` にコピーします。
3. `manifest.json` を編集し、同じフォルダ以下に画像を置きます。画像形式は PNG、JPEG、WebP、GIF に対応しています。
4. 次のコマンドで単一のパックを生成します。

```powershell
python private-pack-tools/build-private-pack.py private-assets/my-pack/manifest.json private-assets/my-pack.prefquiz
```

5. アプリの設定画面で「パックを読み込む」を押し、生成した `.prefquiz` を選びます。

パック内の `prefectures` には正式な都道府県名を指定します。複数回答の場合は ` ["東京都", "神奈川県"] ` のように列挙します。別のパックを読み込むと、端末内で有効なパックは新しいものに置き換わります。「端末から削除」はブラウザ内のコピーだけを削除し、元の `.prefquiz` ファイルは削除しません。

### 2つの画像の複合クイズ

2つの画像クイズの全組合せから、答えとなる都道府県の共通部分が1つ以上ある問題だけを自動生成できます。元の問題を繰り返し記述する必要はありません。

```json
{
  "id": "quiz-diamond-tomare",
  "type": "intersection-pair",
  "title": "ダイヤ × 止まれ標示 → 共通する都道府県",
  "prompt": "2つの画像に共通する都道府県は？",
  "answerLabel": "2つの画像",
  "imageAlts": ["横断歩道ダイヤ", "止まれ標示"],
  "sourceQuizIds": ["quiz-diamond", "quiz-tomare"]
}
```

`sourceQuizIds`には、同じパック内にある通常の画像クイズ2件の`id`を指定します。各画像の`prefectures`を比較し、共通する県がない組合せは出題されません。地方を限定した場合は、共通する県のうち選択した地方に属する県だけが回答になります。

### 公開防止の注意

- `private-assets/` と `.prefquiz` はコミットしないでください。
- ブラウザのデータを消すと読み込み状態も消えるため、元のパックは端末内の安全な場所に保管してください。
- すでにGitへコミットした画像は、`.gitignore` を追加しただけでは履歴から消えません。必要に応じて公開物とGit履歴の両方から除去してください。
- この機能は端末内の素材を公開サイト上で読み込むためのものです。画像利用の適法性そのものを保証する機能ではありません。

## 市外局番データについて

地図から市外局番を当てるクイズの市外局番データは、総務省「市外局番の一覧（令和8年3月1日現在）」PDFを参照して作成しています。

参照元: https://www.soumu.go.jp/main_content/001072440.pdf

## 市区町村の読みについて

正誤メッセージで表示する市区町村の読みは、e-Stat 統計ダッシュボード API の地域情報を参照して作成しています。

参照元: https://dashboard.e-stat.go.jp/api/1.0/Json/getRegionInfo

## 国立大学データについて

国立大学名クイズの大学名と所在地は、文部科学省の「令和6年度全国大学一覧」に含まれる「01国立大学一覧」を参照して作成しています。東京医科歯科大学と東京工業大学は令和6年10月1日に東京科学大学へ統合されたため、クイズでは東京科学大学として扱っています。

参照元: https://www.mext.go.jp/a_menu/koutou/ichiran/mext_00038.html
東京科学大学: https://www.isct.ac.jp/ja/news/aoldn2aafk3r

## 公立大学・私立大学データについて

公立大学名クイズと私立大学名クイズの大学名と所在地は、文部科学省の「令和6年度全国大学一覧」に含まれる「02公立大学一覧」と「03-1～03-8私立大学一覧」を参照して作成しています。

参照元: https://www.mext.go.jp/a_menu/koutou/ichiran/mext_00038.html

## 地図データについて

地図クイズでは、`map-quiz-data.js` 内で jpn-atlas の日本市区町村境界 TopoJSON と、ウェザーニューズの市区町村コード一覧を使用しています。

市区町村地図の表示は、JetPunk の都道府県別市区町村SVG地図から取得したHTMLタグを参照して作成した `prefecture-map-overrides.js` で上書きしています。このデータでは、市区町村パス自体が湖岸を含む形状になります。`lake-data.js` は上書き地図データがない場合の補助データとして残しています。

町丁目地図クイズでは、`local-place-map-data.js` を市区町村ごとの分割データのマニフェストとして使用し、実際の地図データは `local-place-data/` 内に分けて配置しています。ローカル分割データがない市区町村は、クイズ開始時に CODH の TopoJSON を市区町村単位で取得します。データは CODH 作成の「国勢調査町丁・字等別境界データセット」を使用しています。このデータは「令和2年国勢調査町丁・字等別境界データ」（e-Stat）を加工したものです。

町丁目データを追加する場合は、`generate-local-place-data.py --code 13112` のように市区町村単位で生成できます。

参照元: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-2025.html
参照元: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-W09.html
参照元: https://www.jetpunk.com/series/1557301/01
参照元: https://geoshape.ex.nii.ac.jp/ka/resource/13112.html
