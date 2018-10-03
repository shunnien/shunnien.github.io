title: JS30紀錄 20-Speech Detection
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-12 11:40:06
---

# 目標
語音識別 API 操作，透過 SpeechRecognition 來進行語音辨識，並呈現文字

![target](https://lh3.googleusercontent.com/rZILs6WY6ZYaWDm7tH0TRtfGJr10DLYBnNBxQykZLILhDB5pakVRo3EDXIkeIKxOJ_teWv0W_KlNbAkT_y16j9dYE9CxRIDUlOATu7awd5rMA8vqiO0C4qJSbPVjrhFSkiX1I4dAjk4CMufkGhdeRUxtZRXdCUhaQXmKLOLNSBxPzZ1ipg94sMT9yWeiR06CVKjyonkOFd1X46y-VbfCh00kX7hPGhLQwwvUvg3fItHZvM_U9vn1fAzk-mL2oz3Ajo1AQLk8gy45uvzmJj_I6rmTW9IThsWDBnwkkU4XjNPz7BB3vI5Z2dwJZhxcV7bYuJ1Cbeykcudm-j5lahFXu5XTTnC2KKqxgLHu0xTE8Cg7MPfnrSuvuCq58q2CC6xDkKfK3OZfhb9bBZkDTS_BNN2QTqzmCElFVClSCgCWff9ooNmAKXUVxO0ynMT5ePFnGFhs5U7O3G3vbd8VDmzg-jxxOTNuQrz7uzdvnBgo_AKKMRW694JViLw3gJJB8KSVhgiaRq4yhcd4zf3IQ2Ip95hMWkq_RuKielM3vOyH5ikwPMs4T-e7HotTOb800cWf5AkIqXhq2zRdLw2dAYhWepMDzVxhi8jnH-4MCAb5ISkcgv5VunMixME965s70yUPL4x8ouPMet-6UGAEiAmvgsAGR4qC6dfz=w799-h612-no)

<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_20/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

- 啟動語音

``` js
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
```

- 宣告變數為語音辨識

``` js
const recognition = new SpeechRecognition();
```

- 建立 **p tag** ，等下將辨識文字顯示在上
- 啟用識別 `recognition.start();`
- 當識別結束，重複識別 

``` js
recognition.addEventListener("end", recognition.start);
```

> 參考資料
> [SpeechRecognition()][1]
> [interimResults][2]
> [SpeechRecognition event start][5]
> [SpeechRecognition event end][4]


## 步驟 2.

產生識別結果後，將文字呈現在 **p tag** 內容中，識別結果為 **SpeechRecognitionResultList** 取得 **transcript** 屬性，就是辨識文字

![SpeechResult](https://lh3.googleusercontent.com/ynEh6schMIl-SBBgQs3KrLTeZObsQR838kmSDYDWzOzpA77_9HzKVjH1vEgDe_mqmiP_wmi7Om9WjE9lhiXmIxiimzLKhWRYmaZGnpJorbtDG99-pALeovsItUhBXfGAQ9sEcMhwadelta4GkF5_jMojPJIvZszw2Kc8DKGFscscGUhwAC6E_2YwvDSanils08uxX2mn8ahx5skwhmmM9kAmCYNQpTh_di6tniq2hHX7Y2l7F9NtnZ4cVIhLwezqtGWkGdIg1VqBsArrmF6ZdCHIbV5swq33wUGfyMYwyHg-p2Hs9_8dXnwf3ZE87eItxRwWUnbITt-5MALMHlNrR_i0vNWjLf_U_kgPPkbu7RfMdE9j-TIqIwpPwzg7TcGD36MLS-b_v7bGuBgLFGbhgi7Joc9lk3NzcqgsRy8IwV5A0QU6jIlaSE2yGogthnuKTnSjPtXEALHngLrnFY3fvSCfvBsCu1EmcHXh2S0UpSapttlMIEKjFFZu7dHn_g4CNwRM1q-XNJi8TXDzc6mAZRKWD6qNmhmehmAHomioeIM-Kzi2GczWRb71IMeI0vnUzaRdlfyCizKMT3-8PIu43Z3xHU_g0v-7j1sZhDr3ENGDHd1IckWaGjws7U0knyeiyTPAb4LR_u9-YHxiTC8JVICHVxNUnnXo=w767-h189-no)

當確認辨識結束，建立新的 **p tag** 元素

``` js
recognition.addEventListener("result", e => {
  // 識別結果為 SpeechRecognitionResultList 取得 transcript 屬性，就是辨識文字
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");

    // 輸出辨識文字內容
    p.textContent = transcript;

  // 確認辨識結束，就產生新的 p 元素
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});
```

> 參考資料
> [SpeechRecognition event result][3]

## 步驟 3.

當辨識文字出現特定文字的時候，可以使用 **replace** 取代呈現。

``` js
// 特殊內容使用符號文字取代
    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;
```

# 筆記與備註事項

## JavaScript 部分

### [SpeechRecognition()][1]

實驗性功能，所以是尚未確定所有瀏覽器支援的功能。

### [SpeechRecognition.interimResults][2]

此屬性為布林值，控制是否取得即時辨識結果，預設為 **false**

### [SpeechRecognition.start()][5]

啟動語音識別服務

### SpeechRecognition Events 觸發事件

以下為 [Web Speech API][6] 事件

#### [result][3]

語音辨識結束返回結果的時候觸發。

``` js
recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at position 0.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color + '.';
  bg.style.backgroundColor = color;
}
```

#### [end][4]

語音辨識服務結束時觸發。

``` js
var recognition = new SpeechRecognition();

recognition.onend = function() {
  console.log('Speech recognition service disconnected');
}
```

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition
[2]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
[3]: https://developer.mozilla.org/en-US/docs/Web/Events/result
[4]: https://developer.mozilla.org/en-US/docs/Web/Events/end_(SpeechRecognition)
[5]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API