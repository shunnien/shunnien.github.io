title: JS30紀錄 13-Slide in on Scroll
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-31 16:18:42
---

# 目標

隨著卷軸移動到中央，讓圖片動態顯示。
![target](https://lh3.googleusercontent.com/uIMxNJVcpae6njg9VSjTMT68Qx5Tpw6id6Zfzc8CKIqxCePByNKkfL1z5oeBx15Ew-QXnrQSl1CRTNIMVwZ_unhLClh0X29pUMxCF5LEloqdBj8k5mCyOY3WSHqQK24XKMG3evPPMOwVkj400hgkBuRnEBJ8x5CZr9Ev--FEsAmsEr6J_TCIpDPiTQ40lMksiN5Y-DBcVGyWQdkfTsa8NP2640F5Obj90nV4Leu-TsWMUjgNzXfXl2SA-MkbiDoWLpeb9kg1DLgQ1RaPiw_KiYk2qc6EtsEvLymr2kDUnJ41FtNs8MEUUHKviVgeDRhf2U6rkjqV63afO3VlhvlaZdKVczuiekM5cLDNkFgOOzpID_3QQPMloz5uI6OxXE0YouqnzVdhlc37FJCnR_Io9ylnerxvuuVB0SaUCFuYdbjGEhGsWKdLeuyK7nGn77-PY40meECy3wqeeAP0R5kNKBCcWyhXBBiFfX6IyZL92V9rxO1Qy-PnoCNBVARrGpGwqBzsxksFQLN0xfEtq62XZf4-4dwyYSWvRAB65Ect96e7fuSNlICLnvJEfM75tJ3gN-uDtPfO2mL-Qb0gzBRoQ8_yHOr9ff4q1h17-WPHzfvWlNCvr4UJtyKbjHrVFQuK_tDERw38fppRbafRiIEAO7UlIgAAMKOF=w944-h879-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_13/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

首先取得所有圖片 HTML ，並建立空的 **Function** **checkSlide** 與綁定 scroll 捲軸移動事件。

## 步驟 2.

- 因為 scroll 每次觸發頻率過高，所以呼叫 **debounce** 來降低呼叫頻率，避免效能損耗
- 針對所有圖片 HTML 進行 foreach 迴圈
- 取得目前畫面所在的高度
- 取得圖片所在的高度

## 步驟 3.

依照上一步驟取得的高度位置，進行判斷，然後添加 **active** **class** 

# 筆記與備註事項

此練習有幾個要熟悉的要點：
- 熟悉畫面的位置，包含相對位置與絕對座標
- 另一是 **debounce** 這 **Function** 利用了 [**setTimeout**][3] 與 [**apply**][2] 

## JavaScript 部分

### [window.clearTimeout][1]

清除 [setTimeout][3] 設定。

### [Function.prototype.apply()][2]

{% note info %}
apply() 方法會呼叫一個以 this 的代表值和一個陣列形式的值組(或是一個 **array-like object** )為參數的函式。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
{% endnote %}

## CSS 部分

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/es/docs/Web/API/WindowTimers/clearTimeout
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
[3]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
