title: JS30紀錄 15-LocalStorage
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-04 16:27:52
---

# 目標

讓使用者可以自行記錄該小吃的項目，並確認是否選擇，只要使用同電腦同瀏覽器，前一次輸入資料將會保留(不主動清除的話)；此篇主題為使用 **LocalStorage** ，所以除了看畫面之外，可以搭配 **Console** 來觀看。
![target](https://lh3.googleusercontent.com/n9qQxCxSxsHiAW2Tepz-CFMmCkCQyWd5EIwXfaJMr41ghhS1F5GGzn-7VfsGOTCJGOvM3JWUOYQqfT6o9448ljwPmVINDwIdu0Q7dxAjdMBQRHq50Zw6cXr_4y2uWado25Ev716aDiFm8xIy_MNgFP_DFfrgZGlMtX5wPJZzerjcuzp_5bjiWoF2p8Wm48ADKSZu5DbMnBLC-sMvl9w4SgJ41XWZEZnaOP159L1AAVyTgCxmfA-e72x2ZEU54pE_a5cT-Yd_KLdtDiEH2UTJCC71d9n9iXSC1-N8UAjVBK6a1AMsSrUVd7jBKmb3wWbrN8ldy12pnwxgGh8cW5zEP737bKoQbtkUkjWn6HBbSfNsXBJKmbmskA-8bOsOe_28EyDUbjFfmX_aUvgPRJ1wDN2-MrOTQb2B9KunFbOHE9TGZXd0Ic8BLC_Wp3QAwEplTCETJ5vg3JlI5fk7PRykFjJxN9JZeNJf9W0aWMVlU4fSmixyjrGBpA1T-_NgTLLk-XVG9bdtmccqtGMgtjHIIiNiWK_BkR3BodoeEO_qKaTWSqk3I-im5Nwvv_l2tsBIlwFWCX1uiI7-7O54zP1cLQJKy7Ko2DHdSGFBY3s9vgc4Vjf01g6qTcKV8n2Wvn4_uAvfuFfZTXWcMhqugueyKoBpeHTLdvRw=w769-h572-no)

<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_15/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

- 讓變數讀取 localStorage 的資料，沒有的話給予空陣列
- 設定按鈕事件，並讓事件停止冒泡
- 添加各種瀏覽器的停止冒泡功能

``` js
/**
 * 事件停止冒泡
 * @param {*} event
 */
function stopPopup(event) {
  if (!event) event = window.event;
  event.cancelBubble = true;
  event.returnValue = false;
  if (event.stopPropagation) {
    event.preventDefault();
    event.stopPropagation();
  }
  return false;
}
```

## 步驟 2.

- 取得輸入框的輸入值
- 將輸入資料增加到陣列變數
- 將陣列資料回存至 **localStorage**

## 步驟 3.

- 使用 JS 來動態增加 html tag ，此處範例直接使用 [**Template literals**][6]
- 將方法分解至單筆資料新增的 **populateItem** function
- 利用 forEach 來完成

## 步驟 4.

- 進行選單勾選的事件
- 勾選後更新 items 變數與更新 localStorage

# 筆記與備註事項

## HTML 部分

此次範例中的魚標誌，是使用 [SVG][2] 繪製

### [SVG][3]

{% note info %}
**可縮放向量圖形 (Scalable Vector Graphics，SVG)** 是用於描述二維向量圖形的 XML 標記語言。基本上，SVG 用於圖形，而 XHTML 用於文字。
SVG 類似 Adobe 專有的 Flash 技術，SVG 與 Flash 兩者最大的分別在於 SVG 為 W3C 所推薦 (即標準)，並以 XML 為基礎，而非封閉的二進制格式。SVG 設計為與其他 W3C 標準 (如 CSS、DOM 及 SMIL) 一同運作。
**資料來源** - [**MDN**](https://developer.mozilla.org/zh-TW/docs/Web/SVG)
{% endnote %}

## JavaScript 部分

### [Window.localStorage][4]

資料暫存在瀏覽器上，並且不會自動刪除，除非自行清除瀏覽資料；使用無痕瀏覽的話，關閉視窗等於清除掉。

### [Document.createElement()][5]

{% note info %}
於 HTML 文件中，Document.createElement() 方法可以依指定的標籤名稱（tagName）建立 HTML 元素，或是在未定義標籤名稱下建立一個 HTMLUnknownElement。在 XUL 文件中，Document.createElement() 將會建立指定的 XUL 元素。而在其它文件，則會建立一個 namespace URI 為 null 的元素。
**資料來源** - [**MDN**](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/createElement)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
[2]: https://developer.mozilla.org/zh-TW/docs/Web/SVG
[3]: https://developer.mozilla.org/en-US/docs/Web/SVG/Applying_SVG_effects_to_HTML_content
[4]: https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage
[5]: https://developer.mozilla.org/zh-TW/docs/Web/API/Document/createElement
[6]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals