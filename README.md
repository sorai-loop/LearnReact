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
const 新しい定数 = 処理したい配列.map(処理したい配列 => {
    return number * 2;
})
```
とすると定数に処理したい配列の要素をそれぞれ2倍した値が代入される。

``index``という変数を使えばそのとき文字通りインデックスを示す値を使用できる。

mapを用いることでより宣言的にかけるというメリットがある。

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
