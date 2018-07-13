# 新規用Web開発環境（Git、Node.js）

開発環境の編集者向け資料です。

## 開発環境

gulpなど特定のプラグインに依存しないように npm scripts でタスク管理をしています。  
package.json で設定するものは タスク、監視タスク、git hooks(husky)のタスク とします。  
細かい設定(入出力場所 など)は config/scripts 内のjsのように設定を管理します。