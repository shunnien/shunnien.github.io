title: JS30紀錄 22-Follow Along Link Highlighter
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-17 09:54:58
---

# 目標

製作一個凸顯高亮度來跟隨文章中的超連結
![target](https://lh3.googleusercontent.com/m0wgc8PNlsd3MdLBYN1T_Y5E1oybMs8qWj7nYsq7jWDs2F9LcOUNr1CBwimBgzkIkzgYvq10bZ9zQCj7aWRaVotYz2-iXxxsQsHhWV-Kk2wjTRvrg1nIGDA67rFat5KRcyDop33MSdVOJSmGKfvGfz-tQ8lEbwIC8mnNAeF1uz6q-G3LbzooaU6oyZsWw1vNdnl77XjH_lZ7OGhBj0EPkY3mm-cpeFgPfYlrRN0TNk5k_NJgkO_TGCbOCXiOXhn4G11TML1n7CWbHovmlpfgh1znN8R0SdCMvvhGW-_K9R8O97KdSlBPP9Ty7mo88zhyojOjB8IhDJqkyBjJJqLKM_92MZICVygZqMvfdFErBOHP8QL-vqKZJ6Drcxl-yzsW7pctj4ZQe4JTQyahoDwOoBsboHBKOKC6IkRGBuiQC2h8jI_7EH0H8CqRc2_hr8eh5d4_KeZkUHQTwfLZfdOXBR_aNb_Tfd7CzChRQK2LHmKOy170TVtwQBhvGl3IUMGY4XGwyY_IY9UTpSHV7DIU5nwB2sYfLaMihd9VFJXbe6hkLg568ldljhOaRkte77rH0Y6o-VpOEJVVFdhj31grYbzeVWDHX5P__TUY-hu1XfVdpOUgiT_OcByFnaO5kph644_U-CMxkgW6DUqqzPCt39PXv-qqgvYs=w874-h652-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_22/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

此次實作內容也很簡易，建立一個 **span** 元素，並設定 **highlight** class ，然後移動這個元素到選取的文字上。

## 步驟 1.

取得所有超連結

``` js
// 取得所有超連結
const triggers = document.querySelectorAll("a");
```

## 步驟 2.

建立 **highlight** 元素

``` js
//建立 highlight 元素
const highlight = document.createElement("span");
// 設定 CSS
highlight.classList.add("highlight");
// 加入到 body
document.body.appendChild(highlight);
```

## 步驟 3.

針對所有超連結元素綁定 **mouseenter** 事件

``` js
// create function highlight link
function highlightLink() {
}

// 對所有超連結綁定事件
triggers.forEach(a => a.addEventListener("mouseenter", highlightLink));
```

## 步驟 4.

function **highlightLink** 內容撰寫，主要是設定 **highlight** 大小與位置，先利用 **getBoundingClientRect** 取得目前元素大小與位置
![getBoundingClientRect](https://lh3.googleusercontent.com/pDy3UpcS2Z7VIv0d3qOfoMGHvac6-IxZdEp34v3ELPT9ibZsTLMK-usFGjcHd7Uh7qw9hgExR4LyRnQoZ0-iFlUTj5Wp4PfysA2ieKyksKFPiKo6LNeEVYkRTI-AB3xc7Mmb6m32hN8ESk89FjyX9KDHBNwl9K3ZeWdzovk_LyTQCdJc9fx89-cU_DY26fB0kkBSooX0j1UL10KXGEVen7m0-N3P7dZtefNgPpRX_y_ggeTX93ntu_sPceNrLTSyPJpw_nKdLXexIGQyyeKxOdXI62kRo5YS4_-SMhmAY24bcNMuFezeSGqMNNQ3hGm3rKRkJioLIQQNo8slmhBwwxmvYvffiUSGaVcspUIUjCqwqcSjrVBDaXzRVjb9d8JILq2-0yuug8k8nvbxWN9VVlmMxs02HvKK4WDaF-UvVj2EEQqgK1JEXjXfKmSdPmNQc_uhSvHPff5d4yZUFGLYBkV3waUihcaN3CJ5dCgy0uEH3eS9CRQvnImlFO1oQ9M7koowQVglbNotkPOk23wiNrWv-bCAZhGLCsp4ZPK6UcDrxVBhdFz32dcwLO7FRS6YkrCkULLdR9Aj4r0D6ZtB8IXx0xO_9Ddwaq2XaR-NkFBmELGiz0gSp_ATe4yr7Rh1Q9duOeOJm_zPURCRtBKIpawlSd64hwin=w327-h263-no)

``` js
function highlightLink() {
  // 取得元素的大小與位置
  const domRect = this.getBoundingClientRect();
  console.dir(domRect);

  // 設定 highlight 寬度等於目前元素寬度
  highlight.style.width = `${domRect.width}px`;
  // 設定 highlight 高度等於目前元素高度
  highlight.style.height = `${domRect.height}px`;
  // 移動 highlight 元素到目前元素位置，考量因為有 scroll bar
  highlight.style.transform = `translate(${domRect.left +
    window.scrollX}px, ${domRect.top + window.scrollY}px)`;
  //console.log([window.scrollX,window.scrollY]);
}
```

# 筆記與備註事項

## JavaScript 部分

### [getBoundingClientRect()][1]

取得元素的大小與相對位置

### [mouseenter][2]

當滑鼠移動到元素上時觸發。

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/Element/getBoundingClientRect
[2]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter