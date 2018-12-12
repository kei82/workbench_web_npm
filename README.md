# 新規用Web開発環境 (Git、Node.js)

新規サイト制作用に使えるようにしたWeb開発環境です。  
使う際はそのプロジェクト用に変更することが可能です。  
リクエストがあったときのみコンテンツをレンダリングするため比較的動作が軽いのが特徴です。

## 前提環境

GitとGit Bash、Node.jsとnpm を使用します。  
[Git](https://git-scm.com/) (Git Bashもインストールされる,最新推奨)  
[Node.js](https://nodejs.org/ja/) (npmもインストールされる,package.jsonに記載のバージョン推奨)  

※Node.jsのバージョン管理を使用しています。上記のバージョンに合わせてください。  
Winの場合[nodist](https://github.com/marcelklehr/nodist/releases)  
Macの場合[ndenv](https://github.com/riywo/ndenv)  

## セットアップ

以下の作業は最初の一回だけ行います。

1. `gitリポジトリのURL` からリポジトリを任意のディレクトリへクローンする。
2. クローンが終わったら、クローンしたディレクトリで `npm install` をコマンド実行する。 (任意の場所を右クリックで「Git Bash Here」が出ます)
3. クローンしたディレクトリで `npm start` をコマンド実行して、エラー(Err)が出なければ完了。

## 基本的な使い方

リポジトリをクローンしたディレクトリで `npm start` または `npm run start` をコマンド実行すると設定されている開発用機能が使えます。

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
* src/assetsフォルダ内にサイト全体で使われるファイルを格納します。  
* src/assets/sassフォルダ内にscssファイルを格納します(ファイル名はsrc/assets/cssと比較して一意のものにする)。ビルドで同階層のcssフォルダに出力されます。  
* src/assets/babelフォルダ内にbabelファイルを格納します(ファイル名はsrc/assets/jsと比較して一意のものにする)。ビルドで同階層のbabelフォルダに出力されます。  

### ファイル

以下のファイルは設定ファイルです。プロジェクトごとに設定することをおすすめします。

* .editorconfig [設定](https://editorconfig.org/)  
* .babelrc [設定](https://babeljs.io/docs/en/options)  
* .htmlhintrc (HTMLHint) [設定](https://github.com/yaniswang/HTMLHint/wiki/Rules)  
* .prettierrc (Prettier) [設定](https://prettier.io/docs/en/options.html)  
* .gitattributes (Git) [設定](https://git-scm.com/docs/gitattributes)  
* .gitignore (Git) [設定](https://git-scm.com/docs/gitignore)  

## エディタ

[Visual Studio Code](https://code.visualstudio.com/) を使用することで、よりこの開発環境が使いやすくなります。

必須

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) エディタ設定を統一
* [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint) チェックの結果をエディタ上に表示
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) コードをフォーマットする

おすすめ

* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) 自動で対になったタグ名をリネーム
* [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) カッコを色付け
* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) Git機能サポート
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) babelで書いてもブレークポイントを貼れる
* [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion) CSS class名 補完
* [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) 見やすい配色テーマ

# 開発環境について (編集者向け)

以下、開発環境の編集者向け資料です。

## 現在の進捗

人の手で一つずつ確認作業をすると漏れが出たりするのでツールで補うことを趣旨としています  
マルチプラットフォーム&npm installで開発環境が使えるようになるのが理想

### 課題

* 実装面でやり残しているものは「今後の予定」に記載
* ガイドラインを設計してそれに合わせてツールの設定を変える

### 今後の予定

* typescriptの導入予定
* Dev時にwebpackからファイルを出力させないようにする (できなさそう)

## npm scripts + node API

特定のパッケージになるべく依存しないように npm scripts でタスク管理・制御をしています。  

## ファイル・フォルダ構造

### フォルダ構造

* config/scriptsフォルダにnode実行用jsを格納します。
* config/scripts/modulesフォルダにエクスポート用jsを格納します。
* config/toolsフォルダに細かい作業改善ツール群の実行用jsを格納します。

### ファイル

記載中

## 使っているパッケージ

インストールしているパッケージは package.json を確認してください

### ビルドについて

scss、babel、ejsはリクエストがあったときのみレンダリング結果を返します。

## 設定ルール

### タスク

package.json で設定するものは以下とします。  
細かい設定(入出力場所、パッケージの設定 など)は config/scripts/ 内のjsのようにapiで設定を管理します。

* 標準タスク
* git hooks(husky,lint-staged)のタスク

#### メインタスク

`npm start` で開発に必要な機能すべてを起動します。  
`npm run build` でビルドファイルを作成します。

#### タスク名

* dev:* (開発機能全般)
* tools (細かい作業改善ツール群)
