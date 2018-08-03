# 新規用Web開発環境（Git、Node.js）

新規サイト制作用に使えるようにしたWeb開発環境です。  
使う際はそのプロジェクト用に変更することも可能です。

## 前提環境

Git、Node.js を使用します。  
[Git](https://git-scm.com/) (ver2.18 推奨)  
[Node.js](https://nodejs.org/ja/) (Node ver8.11.3, npm 5.6.0 推奨)  

※Node.jsのバージョン管理を使用しています。上記のバージョンに合わせてください。  
Winの場合[nodist](https://github.com/marcelklehr/nodist/releases)  
Macの場合[ndenv](https://github.com/riywo/ndenv)  

## セットアップ

以下の作業は最初の一回だけ行います。

1. `git repository URL` からリポジトリを任意のディレクトリへクローンする。
2. クローンが終わったら、クローンしたディレクトリで `npm install` をコマンド実行する。 (Winは任意の場所でShift+右クリックで「コマンド ウィンドウをここで開く」が出ます)
3. クローンしたディレクトリで `npm start` をコマンド実行して、エラー(Err)が出なければ完了。

## 基本的な使い方

リポジトリをクローンしたディレクトリで `npm start` または `npm run start` を  
コマンド実行すると設定されている開発用機能が使えます。

`npm run build` をコマンド実行すると、distフォルダにファイルがビルド出力されます。

## おもな機能

* ローカルサーバ機能 (http&https、ssi、自動リロード に対応)
* scssファイルの変更を監視してコンパイルする機能 (autoprefixer、メディアクエリのマージ に対応)
* Git コミット時にファイルをチェックをして問題があればコミットできないようにする機能 (例外対応でコミットする場合はpackage.jsonの `"husky" {...}` を一旦無効化（削除）することで対応できます)
* ejsのコンパイル
* トランスパイラ＋バンドラ (babel、minify に対応)

## ファイル・ディレクトリ構成

### ファイル

以下のファイルは設定ファイルです。プロジェクトごとに設定することをおすすめします。

* .htmlhintrc (htmlHint) [設定](https://github.com/yaniswang/HTMLHint/wiki/Rules)  
* .prettierrc (Prettier) [設定](https://prettier.io/docs/en/options.html)  
* .gitattributes (Git) [設定](https://git-scm.com/docs/gitattributes)  
* .gitignore (Git) [設定](https://git-scm.com/docs/gitignore)  

### ディレクトリ

* srcフォルダ内に開発ファイルを入れます。  
* src/assetsフォルダ内にサイト全体で使われるファイルを入れます。  
* src/assets/sassフォルダ内にscssファイルを入れます。ファイルはdist階層のcssフォルダに出力されます。  
* src/assets/babelフォルダ内にbabelファイルを入れます。ファイルはdist階層のbabelフォルダに出力されます。  

## エディタ

[Visual Studio Code](https://code.visualstudio.com/) を使用することで、よりこの開発環境が使いやすくなります。

必須

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) エディタ設定を統一
* [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint) チェックの結果をエディタ上に表示
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) コードをフォーマットする

おすすめ

* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) 自動で対になったタグ名をリネーム
* [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) カッコを色付け
* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) Git機能サポート
* [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion) CSS class名 補完
* [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) 見やすい配色テーマ

## package.jsonについて (編集者向け)

編集者向け資料は以下のファイルをご覧下さい。  
README_editor.md
