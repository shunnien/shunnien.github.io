title: JS30紀錄 23-Speech Synthesis
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-17 17:27:46
---

# 目標

使用合成語音來按照畫面文字播放語音
![target](https://lh3.googleusercontent.com/keRBsiaVN6oK11BhAImLr5yb7FcCABQQcj7Bxrvae4unr7xR3CaoZp-0UqVEPzCXijncdnBsKsMpazIBZLslRdVv_UFdqqFYU51i0IAe4zVQZn7-TNRWzxND5AyFf1No1t5np6A833YD6x0yKhUzYqjqsSrswIyTtSw375fnsorFCmSzyhEdZIhyYDxpmebi18aMk3YpD3LCmvK10lOKIoxiL8LtM4brE2URD_HPkuYZOZR2qaoSm1oRIAhelflx7giWx4dOIAlWBtm87zlqSdWuJ9cTgKH8tH86gp9ALXtC0TGWPonoxD8-1wCRCjC8nUMui0lvhYSAhq1SWaJD12HRaCv7CYpyxtHqin_teucRmmq4_2LspCs8O8f45ba0snsqdWny9PhDUPLr3UrfJdu0gO9bp8pJRMFntFyFttWf6cILWDkqZEfpWgIT1efVvcoKncZQsxI05FCc2qZcr7L7YfiqncFQm6DyLAeb3B0Of5d6_5Fg90WojZCRzCi48k77YM9nYSGDJGzuynQHEPVHEx_OW8UZmCJXvGpnwFlN5AxETi8fLXCo9gL7FAh929yycEmvF89_4x9jH3rk6fq3P9CxSgyS-2y64XeLb0VRhzmMfBtV-3JdN_agf_Di9SmemoI79HQqs-dPq3-kuPigk2osgh4H=w602-h725-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_23/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

設定合成語音 API 物件，並取得畫面文字為語音內容

``` js
msg.text = document.querySelector('[name="text"]').value;
```

## 步驟 2.

合成語音的下拉選單填充，並設定選單變更事件

- 先填充選單內容

``` js
// 填充下拉選單
function populateVoices() {
  // 取得目前支援的所有語音
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes("en"))
    .map(
      voice =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}
```

- 選單變更事件

``` js
// 設定語音
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);

// 語音下拉選單變更
voicesDropdown.addEventListener("change", setVoice);
```

## 步驟 3.

設定播放速度、文字與聲道

``` js
// 設定播放速度、文字、聲道
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
}
```

## 步驟 4.

設定播放與停止按鍵功能

``` js
// 播放與停止
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
// 播放
speakButton.addEventListener("click", toggle);

// 停止播放
stopButton.addEventListener("click", () => toggle(false));
```

# 筆記與備註事項

## JavaScript 部分

### [SpeechSynthesisUtterance][1]

{% note info %}
The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
{% endnote %}

[Web Speech API][3] 中的 **SpeechSynthesis** 語音合成服務 

### [SpeechSynthesis][2]

{% note info %}
The SpeechSynthesis interface of the Web Speech API is the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides.
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
{% endnote %}

語音 API 的服務介面；以下是此次範例使用的屬性說明

- pitch 聲道
- text 播放內容文字
- rate 說話速度

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesisUtterance
[2]: https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesis
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API