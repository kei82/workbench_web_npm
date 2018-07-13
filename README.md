# 新規用Web開発環境（Git、Node.js）

新規サイト制作用につかえるようにしたWeb開発環境です。  
使う際はそのプロジェクト用に変更することも可能です。

## 前提環境

Git、Node.js を使用します。  
インストールされていなければいれてください。  
[Git](https://git-scm.com/) (ver2.18 以上推奨)  
[Node.js](https://nodejs.org/ja/) (ver8.11 以上推奨)

## セットアップ

以下の作業は最初の一回だけ行います。

1. `git repository URL` からリポジトリを任意のディレクトリへクローンする。
2. クローンが終わったら、クローンしたディレクトリで `npm install` をコマンド実行する。 (Winは任意の場所でShift+右クリックで「コマンド ウィンドウをここで開く」が出ます)
3. クローンしたディレクトリで `npm start` をコマンド実行して、エラーが出なければ完了。

## 基本的な使い方

リポジトリをクローンしたディレクトリで `npm start` を  
コマンド実行すると設定されているすべての機能が使えます。  
(コミット時のチェックなどは自動で実行されます)

## おもな機能 (随時追加更新)

* ローカルサーバ機能 (http&https、ssi、自動リロード に対応)
* scssファイルの変更を監視してコンパイルする機能 (autoprefixer、メディアクエリのマージ に対応)
* Git コミット時にファイルをチェックをして問題があればコミットできないようにする機能 (例外対応場合はpackage.jsonの `"husky"とその{}内` を一旦削除し、package.json以外のファイルをステージングしてコミットします。そしてpackage.jsonの一旦削除した部分を元に戻すことで対応できます。)

## ファイル・ディレクトリ構成

**ファイル**  
.htmlhintrc (htmlHint) [設定](https://github.com/yaniswang/HTMLHint/wiki/Rules)  
.jsbeautifyrc (Beautify) [設定](https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md)  
.gitattributes (Git) [設定](https://git-scm.com/docs/gitattributes)  
.gitignore (Git) [設定](https://git-scm.com/docs/gitignore)  
のファイルは設定ファイルです。プロジェクトごとに設定することをおすすめします。

**ディレクトリ**  
srcフォルダ内に開発ファイルを入れます。srcフォルダ内がローカルサーバのrootになります。  
assetsフォルダ内に全体で使われるファイルを入れます。  
assets/sass内にscssファイルを入れます。コンパイルされたファイルは同階層のcssフォルダに出力されます。  

## エディタ

エディタの指定はありませんが [Visual Studio Code](https://code.visualstudio.com/) を使用することで、よりこの開発環境が使いやすくなります。  

**チェックの結果をエディタ上に表示**  
[HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)  
をインストールする。 (インストールすると自動で起動します)

**インデントやコードをフォーマットする**  
[Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)  
をインストールする。 (左クリック「ドキュメントのフォーマット」で使用できます)

## package.json (編集者向け)

[編集者向け資料](README_editor.md)
