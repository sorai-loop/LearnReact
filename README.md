#LearnReact
## 前回までのJS！！
### &&
左辺の条件が真の場合にのみ右辺の処理を実行する。

### ||
左の値が真なら左の値を、偽なら右の値を使用する。

### スプレッド構文
``...``をつけると配列をそこに展開できる。
```
const piyo = ["foo", "bar"];

console.log(...piyo);

console.log("foo", "bar");
```
参照代入ではない配列のコピーを作成する場合に有用。

reactは基本的に変数ではなく定数を使い、元の値を保つ。
そのため、スプレッド構文を多用する。

### 分割代入
配列要素のうち、一部の要素のみを代入する。
```
const [first, second] = arrey;
```
この場合、先頭から割り当てられるので飛ばしたい要素がある場合は
```
const [,second] = arrey;
```
等で代入する。

スプレッド構文と組み合わせることで残りの要素をまとめて配列に代入できる。

代入される変数に=をつけて値を代入すると該当する要素がなかった場合にデフォルトの値を定義して置ける。

オブジェクトに対して必要な要素のプロパティを指定することでそれだけ取得することもできる。

別の名前で定数にしたい場合は``[要素名:新しい要素名, 要素名:新しい要素名]``で新しい名前で定数を作れる。

### map関数
```
const 新しい定数 = 処理したい配列.map(処理したい配列のある要素を指す変数 => {
    return number * 2;
})
```
とすると定数に処理したい配列の要素をそれぞれ2倍した値が代入される。

第二引数にはその時のインデックスを示す値が与えられる。

mapを用いることでより宣言的にかけるというメリットがある。
また、関数型プログラミングとして書く場合参照透過性を持たせるためforは推奨されない。

### filter関数
.mapと同様に使用し、return時の厳密比較？での条件に合わせてその条件が真の場合にのみその値を新しい配列に返す。

## 非同期処理
### promise
順番があやふやになってしまう非同期処理で処理の順番を約束することが出来る。
promiseには
- pending

    未解決。処理が終わるのを待つ状態

- fulfilled

    解決済み。処理が成功した状態。
- rejected

    拒否。処理が失敗に終わった状態。

の状態がある。

promiseの使い方。
```
const promise = new Promise((resolve, reject) => {
    実行したい処理を書く。
    それが成功した場合、resolve()を実行し、失敗した場合reject()を実行する。
})
.then((result) => {

})
.catch((error) => {

});
```
要はtry-catch。
``resolve``と``reject``はそれぞれで成功したときに呼ぶ関数と失敗したときに呼ぶ関数を定義しておく。
成否に分かれたreturn文のような解釈？

``resolve``が呼ばれた際はpromiseの状態がfulfilledとなり、thenの処理が実行される。（resolveが実行されるんじゃないの？？）
呼び出し時、resolveに渡した値はresultに格納される。

``reject``が呼ばれた場合はcatchの処理が実行される。

``.than``と``.catch``はたくさん書くことが出来て上から順に処理される。

いくつかのpromiseがある場合に、すべてのpromiseを完了してから処理を実行させるための``Promise.all``というものがある。
```
Promise.all([promise1, promise2]).then((results) =>{
    処理
})
```
と書くことで既存のpromiseがすべて終わった後にその処理を行える。

それとは別で``Promise.race``を使うことで最初に完了したものの結果だけを使うこともできる。

### async/await
promiseでは処理が複雑になってしまうことがあるため、async/awaitでそれを回避できる。

#### asyncとは
関数の前につけることで関数をpromiseを返す非同期関数にする（promiseを返すってなんやねん）。

#### awaitとは
promiseの結果が帰ってくるまで待つものらしい。
その処理の実行を待つというより次の処理に行くのを待つって感じ？
```
const waitAndLog = async () =>{
    console.log("開始");

    await new Promise((resolve) => {
        setTimeout(() => {
            console.log("");
            resolve();
        },1000);
    });

    sonsole.log("");
}

awaitAndLog();
```

### try-catch
async/awaitでのエラーハンドリング。

# React
jsを扱いやすくするための仕組み。
そのため、開発側に都合のいい仕組みがたくさんある。

プロジェクトの作成。
プロジェクトを作りたいディレクトリで
```
npm create vite@latest プロジェクト名 -- -template react --no-rolldown
```
と実行２つ目の質問にno
```
npm install
```
## 頻出コマンド
- ``nmp install``

    package.jsonのdependenciesとdevDependenciesに記載されているライブラリをすべてインストールするコマンド

- ``npm run [スクリプト名]``

    package.jsonのscriptsに書かれたコマンドを実行する。
    - ``dev``

        サーバーを起動

    - ``build``

        本番用ファイルをビルド

    - ``lint``

        コードの品質チェック

    - ``preview``

        ビルド済みのアプリケーションをプレビュー
## ディレクトリの構成
- src/App.jsx

    Reactのメインとなるコンポーネントファイル。

- src/App.css

    メインのcssファイル。

- src/main.jsx

    アプリ起動用のファイル。

- src/assets

    画像とか静的ファイルを置く。

- package.json

    プロジェクトの設定ファイル。

- vite.config.js

    viteの動作を設定するファイル。

- public/

    直接配信される静的ファイルを保管する。

- index.html

    アプリの土台になるHTMLファイル。

- node_modules/

    ``npm install``でインストールされたファイルの場所。

### package.jsonについて
プロジェクトの基本情報と使うライブラリの一覧。
これを他の人に渡せば何が必要かその人も分かるよねっていう。
- scripts

    よく使うコマンドのショートカット等
    ``npm run dev``が``vite``に置き換えられてたり...

- dependencies

    アプリの実行に必要なライブラリのリスト。

- devDependencies

    開発時にのみ必要なライブラリのリスト。
    本番環境では不要なコードの品質チェック用ライブラリ等が含まれる。

## Reactの基本文法
### React Fragment
ある要素をくくるための意味を持たないもの。
```
<>

</>
```
``<div>``のように意味を持たないがHTMLに反映されることもない。
Reactはreturnで返す要素は1つでなくてはいけないためこれを使ってまとめる。
### classNameとhtmlFor
JSXはHTMLとJavaScriptの混ざったものであり、それでコードを書く場合双方の予約語に気を付ける必要がある。
そのため、HTMLの``class``はJavaScriptの予約語と被ってしまうため、JSXで``className``と記される。
``htmlFor``も同様。

### 終了タグ
JSXではすべてのタグに終了タグが必要。
そのため、普段終了タグを使用しない``<img>``タグ等で自己終了を使用する。
何らかのタグの末尾に`` />``のような形で/をつける。

### {}での定数の埋め込み
JSX内で{}を書くことで定数や計算を埋め込むことが出来る。

### コメントアウト
``{/* ... */}``
と記述する。

### const
constはJSX内でも定義できる。

## CSS
### 記述方法
JSXではプロパティに``-``を使用せずにローワーキャメルで表記する。

スタイルをオブジェクトで定義し``style = オブジェクト名``で適用できる。
また、定義の中でも分岐を使えるため、動的にスタイルを定義できる。

## コンポーネント
大文字から始めるパスカルケースで書く。
小文字で書くとReactがHTMLタグとして認識してしまう。
JSXオブジェクトを返す関数である。
propsとして値を渡す場合には文字列は``""``で、それ以外は``{}``で囲う。

定義
```
function FooBar(){
    return(
        <>
            ...body...
        </>
    )
}
```
### props
``props``はオブジェクトである。
``props``を用いることでコンポーネントに引数を与え、表示内容を変えることが出来る。
```
function foober(props){
    return(
        <>
            <h1>{props.name}</h1>
        </>
    )
}
```
### 分割代入
オブジェクト、propsで使用可能。
```
function foobar({name, text}){
    return(
        <>
            <h1>{name}</h1>
            <p>{text}</p>
        </>
    )
}
```
と書くことでpropsをつけずに使用することが出来る。
### children
要素の後付けをする仕組み。propsやコンポーネントの汎用性を上げるもの。通常のタグのように開始タグと終了タグの間に書く。
また、通常のpropsと違い、JSXをべた書きで渡す。
## useState
ただ変数を変えただけではreactはその変化を認識してUIの書き換えをやってくれない。

そこで``useState``を使用する。
``useState``は2つの値を配列で返す関数。
これ自体がreact固有のライブラリのようなもの。
```
import { useState} form 'react'
```

### イベント
``(e) => {}``

**e**

eはイベント情報を持つオブジェクト。

``e.target``

inputの要素を指す。

``e.target.value``

入力値を指す。

``e.preventDefault``

form送信時に自動で行われるりロードを防ぐ。

#### イベントハンドラーの即時実行エラー
``...onClick = {foobar()}...``
と書いてしまうと、関数がレンダリング時に実行されてしまう。
()はつけずに関数を渡すだけ。

#### 引数を渡す場合のミス
()をつけると即時実行となるため、引数を使いたい場合はアロー関数で囲う必要がある。
``select('A')``ではなく``() => {select('A')}``渡しているのはアロー関数なので直接関数を呼び出しているわけではない。
→アロー関数の()は違う判定？

## useEffect
最初にだけ表示したい、特定のstateが変わったら処理を実行したい等の限定的な状況でのみ機能する。

useEffectは公式ドキュメントで
- コードが複雑になる。
- 不要な処理を繰り返すことになる。
- 依存配列のミス等により無限ループが発生するばあいがある。

等の理由から推奨されないケースもあり、他の手段をとれるならそっちの方が多い。

コンポーネント内で定数を定義するとその値に関する参照でStateが変化した場合、そこも再描画されるのでuseEffectを使用しなくてよい。
### 基本構文
```
useEffect(() => {

}, [依存する値]);
```

第一引数に実行したい処理、第二引数にそのタイミングで実行したいかを配列の内容で渡す。
第二引数が空配列だった場合、最初のレンダリング時に実行される。

### クリーンアップ関数
コンポーネントが削除される、useEffectが再度実行される前に後片付けを行うことが出来る。

useEffectの中で無名関数をreturnすることで定義できる。
```
useEffect(() => {
    ...body...

    return() => {
        クリーンアップの処理
    }
}, [依存配列]);
```

## hooks（フック）
useStateやuseEffectはhooksと呼ばれる機能の1つであり、すべてがuseから始まる名前を持っている。
hooksは全てJSXを返すReactコンポーネント内でのみ使用可能で普通に値を返す関数では使用できない。
またコンポーネントの最上位で呼び出す必要があるため、途中の条件分岐の処理の中などでは定義できない。

## リスト・キー
mapはその処理を行った結果を配列で返す。
keyを設定していないと配列の更新時に再度定義の処理が挟まれてしまうためkeyを設定しておこう。

map,fillter,mapの流れでソートをかけられる。

## 設計思想
reactはオブジェクト指向ではなく関数型プログラミングである。
しかし、完全にオブジェクト指向をつかわないわけではなくUIは関数型、ロジックはオブジェクト指向で開発という形で分割していく。

### 関数の役割
reactは役割に応じてその関数を3つに分担する。
それが、コンポーネント（.jsx）、カスタムフック（.js）、ピュアJS/クラス（.js）

### コンポーネント
最後に必ずJSXを返す。
画面の描画のみを行い、名前は大文字で始める。
### ピュアJS/クラス
reactを一切使わず、引数を貰って計算結果を返すもの。

### コロケーションの原則
その値を必要とする最小のスコープに配置する。
誰がそのデータを知る責任があるのかを厳密に切り分ける設計。

### カスタムフック
必ずuseから始まる形にする。
JSXは返さず、配列やオブジェクトを返すもの。
reactの機能を利用しつつもUIを持たないロジック部分。
コンポーネントで呼び出した場合、分割代入で使いたい要素の値のみを使用する。
クラスの代わりになりうるものである。
```
export const useFoo = () =>{
    const [items, setItems] = useState([]);

    const addItem = item =>{
        setItems(prev => [...prev, item]);
    }

    return {
        items,
        addItem
    };
}
```
変数とそれに関わる関数のみでまとめる。

## 関数型プログラミングの考え方？
表層から処理の流れを考えると

- コンポーネント
    - ドメインフック
        - 汎用フック
        - ピュアJS

という形になる。

例のコードは消費税の計算を行い返すコンポーネントを構成するものとする。

### 汎用フック
useStateをインポートして表面上の処理の変化をreact側に伝える役割。
useStateを使用し、表示に関わる値をもち、値とそれをつかさどる関数をオブジェクトとして返す。
細かい処理はピュアJSに委任するが疎結合のためここでそれを呼ぶことはない。
どこでも使う機能のみを持たせるため固有名詞は使用せず、ドメイン知識を知っている必要がない。
基本的な値の保持のみならそれは通常のuseStateが機能を持っている。
この場合持たせる機能はinputタグの変化を感知して値を取得、格納する機能のみとなる。
値、それを使う関数をオブジェクトとして返す。
**useFooBar**という形でファイル名の先頭にuseを使用する。
↓ダメな例
```
import {useState} from 'react';

export const useConsumptionTax = (priceBeforeTax = 0) =>{
    const [amount, setAmout] = (priceBeforeTax);

    const Food = () =>{

    }

}
```
↓よい例
```
import { useState } from 'react';

export const useNumberInput = (initialValue = 0) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    const num = Number(e.target.value);
    setValue(isNaN(num) ? 0 : num); 
  };

  const clear = () => setValue(0);

  return { value, handleChange, clear };
};
```
### ピュアJS
reactの機能を使用しない純粋なJS。
与えられた値から処理を行いそれを返す。
この場合だと、食品かその他かを判別して引数の値に各割合を掛ける処理のみをもつ。
```
export const calculateTax = (price, isFood) => {
  const rate = isFood ? 1.08 : 1.10;
  return Math.floor(price * rate);
};
```
### ドメインフック
汎用フックとピュアJSを組み合わせてその特定の要素のみのための機能とする。
それぞれをインポートする。
汎用フックは命名後constから分割代入をもちいて機能を実体化させる。
関数はそのまま使用する。

```
import { useState } from 'react';
import { useNumberInput } from '../../../hooks/useNumberInput';
import { calculateTax } from '../utils/taxCalculator';

export const useTaxCalculator = () => {
  const { value: price, handleChange: onPriceChange, clear } = useNumberInput(0);
  
  const [isFood, setIsFood] = useState(false);

  const taxIncludedPrice = calculateTax(price, isFood);

  const toggleFood = () => setIsFood(prev => !prev);

  return {
    price,
    isFood,
    taxIncludedPrice,
    onPriceChange,
    toggleFood,
    clear
  };
};
```

### コンポーネント
ドメインフックによって変化する表示をJSXで返す。
インポート後汎用フックのときと同様に分割代入で実体化させ、必要なJSXを記載する。
```
import { useTaxCalculator } from '../hooks/useTaxCalculator';

export const TaxCalculator = () => {
  const { price, isFood, taxIncludedPrice, onPriceChange, toggleFood, clear } = useTaxCalculator();

  return (
    <div style={{ padding: '20px' }}>
      <h2>税込み価格計算機</h2>
      
      <input type="number" value={price} onChange={onPriceChange} />
      
      <label>
        <input type="checkbox" checked={isFood} onChange={toggleFood} />
        食品（軽減税率 8%）
      </label>

      <button onClick={clear}>クリア</button>

      <h3>税込金額: {taxIncludedPrice} 円</h3>
    </div>
  );
};
```

## 実践app作成
### ルーティング？
URLに応じて異なるページを表示すること。
URLと紐づけることでブラウザ側のブックマークや戻る等の操作が機能するうようになりアクセシビリティの向上につながる。

React自体にこの機能はないもののReactRouterというライブラリで使用できる。

インストールコマンド
```
npm install react-router-dom
```
#### BrowserRouter（ブラウザルーター）
ルーティングを有効にする範囲を決めるもの。
アプリ全体を囲うことでURLに対して切り替えられるようになる。
#### Routes（ブラウザルーツ）
どのURLにどのページを割り当てるか等の細かい設定をまとめるページ一覧のようなコンポーネント。
#### Route（ルート）
URLとコンポーネントの紐づけを行うコンポーネント。

#### 表記例
```
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
    </Routes>
</BrowserRouter>
```
##### path
どのURLにアクセスしたときに、

一番下のは動的ルーティングテーブルという。
idの部分は変数のようなもので値を自由にとることが出来る。

##### element
どのコンポーネントを表示するか
### lucide-react
reactアプリ用に設計されたアイコン表示ようライブラリ。

インストールコマンド
```
npm install lucide-react
```
### HTTPリクエストメソッド
#### GET
データ取得
#### POST
新しいデータを作成するための処理
#### PUT
既存のデータを更新
#### DELETE
データの削除

