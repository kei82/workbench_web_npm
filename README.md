# 新規構築用 Web 開発環境 (Git、Node.js)

新規サイト構築用に使えるようにした Web 開発環境です。  
使う際はそのプロジェクト用に変更することが可能です。  
リクエストがあったときのみコンテンツをレンダリングするため比較的動作が軽いのが特徴です。

## 前提環境

Git、Node.js と npm を使用します。(npm は基本デフォルトでインストールされます)  
[Git](https://git-scm.com/) (最新推奨)  
[Node.js](https://nodejs.org/ja/) (package.json に記載のバージョン推奨)

※Node.js のバージョン管理を使用しています。上記のバージョンに合わせてください。  
Win の場合 [nodist](https://github.com/marcelklehr/nodist/releases)  
Mac の場合 [ndenv](https://github.com/riywo/ndenv)

## セットアップ

以下の作業は最初の一回だけ行います。

1. リポジトリのクローン：git リポジトリの URL からリポジトリを任意のフォルダへクローンする。
2. パッケージのインストール：クローンが終わったら、クローンしたフォルダで `npm install` をコマンドラインを実行する。  
   (黒い画面が苦手な方は Visual Studio Code の ターミナル>タスクの実行 から `npm: install` が実行できます。)
3. エラーが無いか確認：クローンしたフォルダで `npm start` をコマンド実行して、エラー(Err)が出ず、ブラウザが起動すれば完了。  
   (同じく Visual Studio Code からも実行できます。)

## 基本的な使い方

リポジトリをクローンしたフォルダで `npm start` または `npm run start` をコマンド実行すると設定されている開発用機能が使えます。

`npm run build` をコマンド実行すると、dist フォルダにファイルがビルド出力されます。

## おもな機能

- ローカルサーバー機能 (https、ssi、自動リロード に対応)
- sass のコンパイル + コード整形 (autoprefixer、メディアクエリのマージ、minify に対応) ※SCSS 記法のみサポート
- HTML のリンター + コード整形
- ejs のコンパイル
- babel のトランスパイル + バンドラ (importバンドル、minify に対応)
- JS のリンター + コード整形

## ファイル・フォルダ構造

### フォルダ構造

- src/ (開発ファイルを格納します)
- dist/ (ビルドされたファイルが格納されます)
- src/ (より配下に ejs ファイルを格納します)  
  ワイルドカード表記：`src/**/!(_)*.ejs`
- src/assets/ (サイト全体で使われるファイルを格納します)
- src/assets/sass/ (sass ファイルを格納します)  
  ビルドで同階層の css フォルダに出力されるためファイル名は一意のものにする  
  ワイルドカード表記：`src/**/sass/**/!(_)*.scss`
- src/assets/babel/ (babel ファイルを格納します)  
  ビルドで同階層の js フォルダに出力されるためファイル名は一意のものにする  
  ワイルドカード表記：`src/**/babel/**/!(_)*.js`

### ファイル

以下のファイルは設定ファイルです。プロジェクトごとに設定することをおすすめします。

- .editorconfig [設定](https://editorconfig.org/)
- .babelrc (babel)[設定](https://babeljs.io/docs/en/options)
- webpack.config.js (webpack)[設定](https://webpack.js.org/configuration/)
- .htmlhintrc (HTMLHint) [設定](https://github.com/yaniswang/HTMLHint/wiki/Rules)
- .prettierrc (Prettier) [設定](https://prettier.io/docs/en/options.html)
- .gitattributes (Git) [設定](https://git-scm.com/docs/gitattributes)
- .gitignore (Git) [設定](https://git-scm.com/docs/gitignore)

## エディタ

[Visual Studio Code](https://code.visualstudio.com/) を使用することで、よりこの開発環境が使いやすくなります。

### Visual Studio Code 拡張機能

#### 必須

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) エディタ設定を統一
- [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint) リントの結果をエディタ上に表示
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) リントの結果をエディタ上に表示
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) コードをフォーマットする

#### おすすめ

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) 自動で対になったタグ名をリネーム
- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) カッコを色付け
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) Git 機能サポート
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) AltJS で書いてもブレークポイントを貼れる
- [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion) CSS class 名を補完

# 開発環境について (編集者向け)

以下、開発環境の編集者向け資料です。

## 現在の進捗

人の手で一つずつ確認作業をすると漏れが出たりするのでツールで補うことを趣旨としています  
マルチプラットフォーム & npm install で開発環境が使えるようになるのが理想

### 今後の予定

- [ ] typescript の導入調査
- [ ] stylelint の導入調査

## npm scripts + node API

特定のパッケージになるべく依存しないように npm scripts でタスク管理・制御をしています。

## ファイル・フォルダ構造

### フォルダ構造

- scripts/ (node 実行用 js を格納します)
- scripts/lib/ (エクスポートモジュール用 js を格納します)

### ファイル

- scripts/lib/entry_point.js (webpack のエントリーポイントを設定する)
- scripts/lib/server_middlewares.js (webpack-dev-server のミドルウェア設定)
- scripts/ejs.js (ejs をコンパイルする)

## 使っているパッケージ

インストールしているパッケージは package.json を参照してください

### ビルドについて

ejs はリクエストがあったときのみレンダリング結果をサーバーに返します。

## 設定ルール

### タスク

package.json で設定するものは以下とします。  
細かい設定(コンパイル、モジュール など)は scripts フォルダの js のように api で設定を管理します。

- 標準タスク
- git hooks(husky,lint-staged)のタスク

#### メインタスク

`npm start` で開発に必要な機能すべてを起動します。  
`npm run build` でビルドファイルを作成します。

#### タスク名

- build (最終ビルドを実行する)
- server (開発サーバーを起動する)
- build:\* (ビルド機能全般)
