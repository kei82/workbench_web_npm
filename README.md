# 新規用Web開発環境（Git、Node.js）

新規サイト制作用に使えるようにしたWeb開発環境です。  
使う際はそのプロジェクト用に変更することが可能です。  
リクエストがあったときのみコンテンツをレンダリングするため比較的動作が軽いのが特徴です。

## 前提環境

Git、Node.js を使用します。  
[Git](https://git-scm.com/) (最新推奨)  
[Node.js](https://nodejs.org/ja/) (Node,npmはpackage.jsonにあるバージョン 推奨)  

※Node.jsのバージョン管理を使用しています。上記のバージョンに合わせてください。  
Winの場合[nodist](https://github.com/marcelklehr/nodist/releases)  
Macの場合[ndenv](https://github.com/riywo/ndenv)  

## セットアップ

以下の作業は最初の一回だけ行います。

1. `gitリポジトリのURL` からリポジトリを任意のディレクトリへクローンする。
2. クローンが終わったら、クローンしたディレクトリで `npm install` をコマンド実行する。 (Winは任意の場所を右クリックで「Git Bash Here」が出ます)
3. クローンしたディレクトリで `npm start` をコマンド実行して、エラー(Err)が出なければ完了。

## 基本的な使い方

リポジトリをクローンしたディレクトリで `npm start` または `npm run start` をコマンド実行すると設定されている開発用機能が使えます。

`npm run build` をコマンド実行すると、distフォルダにファイルがビルド出力されます。

## おもな機能

* ローカルサーバ機能 (https、ssi、自動リロード に対応)
* scssの変更を監視してコンパイルする機能 (autoprefixer、メディアクエリのマージ に対応)
* HTMLに問題があればGitコミットできないようにする機能  
  (例外対応でコミットする場合は`@例外_HTML`とメッセージを入れるとそのコミットはチェックされません)
* ejsのコンパイル
* babelのトランスパイラ + バンドラ (babel、minify に対応)

## ファイル・ディレクトリ構成

### ファイル

以下のファイルは設定ファイルです。プロジェクトごとに設定することをおすすめします。

* .editorconfig [設定](https://editorconfig.org/)  
* .babelrc [設定](https://babeljs.io/docs/en/options)  
* .htmlhintrc (HTMLHint) [設定](https://github.com/yaniswang/HTMLHint/wiki/Rules)  
* .prettierrc (Prettier) [設定](https://prettier.io/docs/en/options.html)  
* .gitattributes (Git) [設定](https://git-scm.com/docs/gitattributes)  
* .gitignore (Git) [設定](https://git-scm.com/docs/gitignore)  

### ディレクトリ

* srcフォルダ内に開発ファイルを入れます。  
* src/assetsフォルダ内にサイト全体で使われるファイルを入れます。  
* src/assets/sassフォルダ内にscssファイルを入れます。ビルドで同階層のcssフォルダに出力されます。  
* src/assets/babelフォルダ内にbabelファイルを入れます。ビルドで同階層のbabelフォルダに出力されます。  

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

* prettierの導入予定
* eslintの導入予定
* typescriptの導入予定
* babelのバージョンアップ

## npm scripts + node API

gulpなど特定のパッケージに依存しないように npm scripts でタスク管理・制御をしています。  

### gulpよりnpm scripts + node APIで管理する主な理由

#### メリット

* npmはnode.jsの標準機能なのでgulp等のようにパッケージがタスクランナーに依存しない
* gulp等で使えるパッケージより数が多い
* gulp等よりnpm自体は学習コストが低め
* apiを使って細かく処理を制御できる
* gulp等より実行速度が速いのでトライアル&エラーしやすい

#### デメリット

* 細かく処理を制御できる反面、（apiを使った場合）gulp等より設定を書く量が少し多め
* package.json（パッケージの設定ファイル）が少し多め

## 使っているパッケージ

インストールしているパッケージは package.json を確認してください

### ビルドについて

scss、babel、ejsはリクエストがあったときのみレンダリング結果を返します。

## 設定ルール

### タスク

package.json で設定するものは以下とします。  
細かい設定(入出力場所、パッケージの設定 など)は config/scripts/ 内のjsのようにapiで設定を管理します。

* 標準タスク
* git hooks(husky)のタスク

#### メインタスク

`npm start` で開発に必要な機能すべてを起動します。  
`npm run build` でビルドファイルを作成します。

#### タスク名

* dev:*（開発機能全般）
* lint:*（リント機能全般）
* format:*（フォーマット機能全般）
* tools（細かい機能のツール群）
