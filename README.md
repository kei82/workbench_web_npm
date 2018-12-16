# 新規用Web開発環境 (Git、Node.js)

新規サイト制作用に使えるようにしたWeb開発環境です。  
使う際はそのプロジェクト用に変更することが可能です。  
リクエストがあったときのみコンテンツをレンダリングするため比較的動作が軽いのが特徴です。

## 前提環境

Git、Node.jsとnpm を使用します。(npmは基本デフォルトでインストールされます)  
[Git](https://git-scm.com/) (最新推奨)  
[Node.js](https://nodejs.org/ja/) (package.jsonに記載のバージョン推奨)  

※Node.jsのバージョン管理を使用しています。上記のバージョンに合わせてください。  
Winの場合[nodist](https://github.com/marcelklehr/nodist/releases)  
Macの場合[ndenv](https://github.com/riywo/ndenv)  

## セットアップ

以下の作業は最初の一回だけ行います。

1. リポジトリのクローン：gitリポジトリのURLからリポジトリを任意のフォルダへクローンする。
2. パッケージのインストール：クローンが終わったら、クローンしたフォルダで `npm install` をコマンドラインを実行する。
3. エラーが無いか確認：クローンしたフォルダで `npm start` をコマンド実行して、エラー(Err)が出ず、ブラウザが起動すれば完了。

## 基本的な使い方

リポジトリをクローンしたフォルダで `npm start` または `npm run start` をコマンド実行すると設定されている開発用機能が使えます。

`npm run build` をコマンド実行すると、distフォルダにファイルがビルド出力されます。

## おもな機能

* ローカルサーバ機能 (https、ssi、自動リロード に対応)
* scssの変更を監視してコンパイルする機能 (autoprefixer、メディアクエリのマージ に対応)
* HTMLのリンター
* ejsのコンパイル
* babelのトランスパイラ + バンドラ (babel、minify に対応)
* JSのリンター + コード整形
* 細かい作業改善ツール群

## ファイル・フォルダ構造

### フォルダ構造

* srcフォルダに開発ファイルを格納します。
* srcフォルダ配下にejsファイルを格納します。  
  ワイルドカード表記：`src/**/*.ejs`
* src/assetsフォルダ内にサイト全体で使われるファイルを格納します。
* src/assets/sassフォルダ内にscssファイルを格納します(ファイル名はsrc/assets/cssと比較して一意のものにする)。  
  ビルドで同階層のcssフォルダに出力されます。  
  ワイルドカード表記：`src/**/sass/**/*.scss`
* src/assets/babelフォルダ内にbabelファイルを格納します(ファイル名はsrc/assets/jsと比較して一意のものにする)。  
  ビルドで同階層のbabelフォルダに出力されます。  
  ワイルドカード表記：`src/**/babel/**/*.js`

### ファイル

以下のファイルは設定ファイルです。プロジェクトごとに設定することをおすすめします。

* .editorconfig [設定](https://editorconfig.org/)
* .babelrc [設定](https://babeljs.io/docs/en/options)
* webpack.config.js [設定](https://webpack.js.org/configuration/)
* .htmlhintrc (HTMLHint) [設定](https://github.com/yaniswang/HTMLHint/wiki/Rules)
* .prettierrc (Prettier) [設定](https://prettier.io/docs/en/options.html)
* .gitattributes (Git) [設定](https://git-scm.com/docs/gitattributes)
* .gitignore (Git) [設定](https://git-scm.com/docs/gitignore)

## エディタ

[Visual Studio Code](https://code.visualstudio.com/) を使用することで、よりこの開発環境が使いやすくなります。

必須

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) エディタ設定を統一
* [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint) リントの結果をエディタ上に表示
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) リントの結果をエディタ上に表示
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) コードをフォーマットする

おすすめ

* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) 自動で対になったタグ名をリネーム
* [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) カッコを色付け
* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) Git機能サポート
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) AltJSで書いてもブレークポイントを貼れる
* [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion) CSS class名を補完

# 開発環境について (編集者向け)

以下、開発環境の編集者向け資料です。

## 現在の進捗

人の手で一つずつ確認作業をすると漏れが出たりするのでツールで補うことを趣旨としています  
マルチプラットフォーム & npm installで開発環境が使えるようになるのが理想

### 今後の予定

* typescriptの導入調査
* stylelintの導入調査

## npm scripts + node API

特定のパッケージになるべく依存しないように npm scripts でタスク管理・制御をしています。  

## ファイル・フォルダ構造

### フォルダ構造

* scriptsフォルダにnode実行用jsを格納します。
* scripts/libフォルダにエクスポートモジュール用jsを格納します。
* toolsフォルダに細かい作業改善ツール群の実行用jsを格納します。

### ファイル

* scripts/lib/entry_point.js webpackのエントリーポイントを設定する
* scripts/lib/server_middlewares.js webpack-dev-serverのミドルウェア設定
* scripts/ejs.js ejsをコンパイルする

## 使っているパッケージ

インストールしているパッケージは package.json を参照してください

### ビルドについて

ejsはリクエストがあったときのみレンダリング結果をサーバーに返します。

## 設定ルール

### タスク

package.json で設定するものは以下とします。  
細かい設定(コンパイル、モジュール など)は scriptsフォルダのjsのようにapiで設定を管理します。

* 標準タスク
* git hooks(husky,lint-staged)のタスク

#### メインタスク

`npm start` で開発に必要な機能すべてを起動します。  
`npm run build` でビルドファイルを作成します。

#### タスク名

* build:* (ビルド機能全般)
* tools (細かい作業改善ツール群)
