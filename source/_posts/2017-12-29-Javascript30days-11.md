title: JS30紀錄 11-Custom Video Player
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-29 18:23:46
---

# 目標

自製一個影片播放器可以操控播放速度與音量大小，並隨著 **progress bar** (進度條) 進行動態調整的播放器
![target](https://lh3.googleusercontent.com/tJ8Xf87th94-bjfJxyfQdwGRI7KQDwRyZfvHP1zrpREo1uUHhGzufnOiN7g0VI574AH6loz4BgiUs49AyULblBII4SlzazYucZL67Zbhv_xyirmLVZaJbFxjuI2dwToDyFodVv0bhpfRwSFRb-AuHqO_LMUljal9RJKswDyD8YU4DgrTZGirKCqsdLgL9sQmR__6QMceJPzhwBql1FCHwNNam9_5-xhrH4B-HE62d8xEva9QjowX_1EJxMO9nKyfJ0bGsz22dLd5FxB9w8e-GFWuld2u4eaueJ3oGLiNYthSknX-_XJh8KfDNNWOGWUdj_pL-3iYDzDckO0funGk_LYP6DTW3kX_1iBBl1cqVHxiYCOcmjSElM5kitOlPLQkOpZCnrDh6YhWjPm-IZt6iCiOdpjU7M0TAOJtdZlFM-QAF0cdBSPLhAqofre_p-yiJ-gWRD9BE_WS-7PmbJQnOv4rg3aVgJzpCgtEhdBc2k-QkKFopk66xI2xCQnUluWZ6TMEmHvkDX-JMs81k0XSxS9IXnV7y9mQS7M7dDi46UH52m_jzOnxOguPmCRk0mcBroK8S0T6JQmxoAnXk9m2SqNhrMWSp1PbrMVdB-lCWod-jYOaJO1y5EpFSdZLDxWi5DjtY87kTIfhKwv1Dvf8xh_0RKzKLjub=w812-h458-no)
<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_11/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

此次處理步驟沒有很複雜，簡單說就是將播放器的各項 DOM ，都建立監聽事件，好進行播放器的操作，唯一比較需要計算的部分，則是進度條 (progress bar) 的部分。要熟悉的是播放器的屬性與方法。

## 步驟 1. 播放的呈現

- 取得 HTML 上的各個元素
- 綁定撥放功能
- 增加變換播放按鈕圖案功能
- 添加播放後，進度條的動態顯示

## 步驟 2. 跳轉按鈕

- 利用 html 上的 name 與值
- 觸發狀態的綁定

## 步驟 3. 進度條的動態切換

- 建立播放進度條跳轉至指定時間 **scrub** function
- 簡單的拉動綁定事件 **click** 與 **mousemove**
- 避免播放器的點擊功能互相影響，建立 mousedown 變數
- 並在進度條上點擊時觸發

# 筆記與備註事項

## HTML 部分

### [video][6]

{% note info %}
HTML `<video>` 元素用於在 HTML 或者 XHTML 文檔中嵌入視頻內容。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
{% endnote %}

### [Media events][7]

[`video`][6] 或是 [`audio`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 使用到的事件與方法

|Event name|  Description|
|:---:|:----|
|abort|   Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.|
|canplay| Sent when enough data is available that the media can be played, at least for a couple of frames.  This corresponds to the HAVE_ENOUGH_DATA readyState.|
|canplaythrough|  Sent when the ready state changes to CAN_PLAY_THROUGH, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.|
|durationchange|  The metadata has loaded or changed, indicating a change in duration of the media.  This is sent, for example, when the media has loaded enough that the duration is known.|
|emptied| The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.|
|encrypted|   The user agent has encountered initialization data in the media data.|
|ended|   Sent when playback completes.|
|error|   Sent when an error occurs.  The element's error attribute contains more information. See HTMLMediaElement.error for details.|
|interruptbegin|  Sent when audio playing on a Firefox OS device is interrupted, either because the app playing the audio is sent to the background, or audio in a higher priority audio channel begins to play. See Using the AudioChannels API for more details.|
|interruptend|    Sent when previously interrupted audio on a Firefox OS device commences playing again — when the interruption ends. This is when the associated app comes back to the foreground, or when the higher priority audio finished playing. See Using the AudioChannels API for more details.|
|loadeddata|  The first frame of the media has finished loading.|
|loadedmetadata|  The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.|
|loadstart|   Sent when loading of the media begins.|
|mozaudioavailable|   Sent when an audio buffer is provided to the audio layer for processing; the buffer contains raw audio samples that may or may not already have been played by the time you receive the event.|
|pause|   Sent when playback is paused.|
|play|    Sent when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event.|
|playing| Sent when the media begins to play (either for the first time, after having been paused, or after ending and then restarting).|
|progress|    Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute.|
|ratechange|  Sent when the playback speed changes.|
|seeked|  Sent when a seek operation completes.|
|seeking| Sent when a seek operation begins.|
|stalled| Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.|
|suspend| Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.|
|timeupdate|  The time indicated by the element's currentTime attribute has changed.|
|volumechange|    Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).|
|waiting| Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).|

## CSS 部分

### [::-webkit-slider-runnable-track][1] 與 [::-moz-range-track][4]

非標準的語法，依照 [MDN][1] 上的說明，可能會變換，主要是針對 `<input>` 中 `type="range"` 的類型設定進度調軌跡的背景與邊框樣式

### [::-webkit-slider-thumb][2] 與 [::-moz-range-thumb][5]

{% note info %}
The `::-webkit-slider-thumb` CSS pseudo-element represents the "thumb" that the user can move within the "groove" of an `<input>` of `type="range"` to alter its numerical value.
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/CSS/::-webkit-slider-thumb)
{% endnote %}

這兩個的功能相同，簡單說就是移動時候的顯示樣式，主要是在不同瀏覽器的支援。

### [-moz-appearance (-webkit-appearance, appearance)][3]

其實就是變更元素的外觀而已。

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-runnable-track
[2]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/::-webkit-slider-thumb
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance
[4]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/::-moz-range-track
[5]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/::-moz-range-thumb
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
[7]: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events