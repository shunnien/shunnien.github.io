title: JS30紀錄 10-Hold Shift and Check Checkboxes
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-27 17:33:27
---

# 目標

![target](https://lh3.googleusercontent.com/Q879dUZxwkFMMvjTu_NaVhfyMjgdmpaTw9wQcr7rxp6whXCwV1KEiAvhdpgEZrWo0yB2hExVZPSBqvfS7jQhu8aVrGPKck59WpfJM3Gd6qhVSGcC37p3f8u9yv_CWRVdRPlRag8c_kfzn8KeQJZ9_SvxWfv0LxdYDDp7xKBzcCsYT7uyRa1SWS5lss18WlfxZlVvvxgMQyFEBNPdysHt3YubVG0u6u0zfDO7WfQZCeAOVLP6PbgAoinLA59NXUA5hEPT0ywPEf01bDF3tyAew8giphvnlEQaHN22ieGU4oW8HzB_N0BtT9vUbJmiH0awgOiCzoOZrSrCYeVOVjHi5dQz1p1kkCnkl5E0op1OwaZCeAC6D92YlaQpompZobz4dI8cNtyXezavTBOdseIDkPA7ZnIKHHsWUEU6Mel69TNJNegIryusu8IF_LiYtVJQ761Obz9gfU94iiL4hcCu5pPc9pf1T1lXabSWaOAkyHLMH6rCoBl4ou0giqJY24DyUcuNNkFYDDtSBlOC6HJOcjlZjLBw7Tiee3I1nMepe-6S86kIKqG8cDGmZ_4jkeAQ-AE8qlV4rWksxHfkwESigGPAMj2Yncj49f_CKWi0_cqDOpEF3r-h-zh5f7jTpdk7wDcJwF6bcygAPyBn_cA9kgEINk8Sv2cf=w646-h836-no)
類似 Gmail 信箱的 checkbox 多選功能，當選取一個 checkbox 後，按住 **shift** 不放，在選取另一 checkbox ，此兩個 checkbox 中間的 checkbox 皆會選取。 
<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_10/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

與範本的方法與步驟可能不太相同，依照個人的方式去解決就好。

## 步驟 1.

取得所有的 checkbox DOM 並綁定 click 事件，建立的 **handleCheck** **function** 中可以利用 **console** 查看一下 e 的物件，為 **MouseEvent**

``` js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
function handleCheck(e) {
    // e is MouseEvent
    console.log(e);
}
Array.from(checkboxes).map(ele => ele.addEventListener("click", handleCheck));
```

## 步驟 2.

開始針對 **handleCheck** **function** 撰寫判斷，首先是 **shift** 鍵按下並選取該 **checkbox** 時，進行全部的 checkbox DOM 巡覽。
這時候調整一下 checkboxes 變數，因為 querySelectorAll 取得的結果**不是** **Array** ，所以先轉換

``` js
const checkboxes = Array.from(
  document.querySelectorAll('.inbox input[type="checkbox"]')
);

function handleCheck(e) {
  // e is MouseEvent
  //console.log(e);
  const self = this;
  if (e.shiftKey && e.target.checked) {
    console.info("this is shift & checked");
    checkboxes.map(ele => {
    });
  }
}

checkboxes.map(ele => ele.addEventListener("click", handleCheck));
```

## 步驟 3.

在巡覽的過程中，加入判斷式，決定要變更 checkbox 選取狀態的變更。

- 加入 checkEle 變數紀錄 click 每次觸發後，上次的選取 DOM
- 判斷 目前觸發元素是否等於巡覽的元素，或是 checkEle 是否等於巡覽的元素，並且 checkEle 不能等於目前觸發元素
- 加入 isBetween 變數，用來記錄是否符合上述的條件
- 最後將巡覽的所有元素 checked 都設定為 true 的值

``` js
let checkEle = null;
function handleCheck(e) {
  // e is MouseEvent
  //console.log(e);
  const self = this;
  if (e.shiftKey && e.target.checked) {
    //console.info("this is shift & checked");
    let isBetween = false;
    checkboxes.map(ele => {
        // 避免選取第一個項目就全選
      if ((self === ele || checkEle === ele) && checkEle && checkEle !== self) {
        //   console.info("slef equal ele");
        //   console.dir(ele);
        isBetween = !isBetween;
      }
      if (isBetween) ele.checked = true;
    });
  }
  checkEle = self.checked ? self : null;
}

checkboxes.map(ele => ele.addEventListener("click", handleCheck));
```

# 延伸部分

此解法，是按照範例的方式去處理；延伸課題是仿照類似 Gmail 的選取方式選取區間，所以需要取得距離目前選取最近的選取框

- 建立 extenCheck function 
- 找尋索引小於目前選取元素的索引，並且有選取的 checkbox ，取得此索引
- 找尋索引大於目前選取元素的索引，並且有選取的 checkbox ，取得此索引
- 判斷前 2 操作都是有取得索引後，直接更新選取狀態
- 抽取選取狀態 function

``` js
/**
 * 延伸部分
 *
 * @param {any} e
 */
function extenCheck(e) {
  const self = this;
  if (!e.target.checked) return;

  // 目前的選取元素
  const nowSelIndex = checkboxes.findIndex(ele => ele === self);

  if (!e.shiftKey) return;

  const nearMinCheckboxIndex = checkboxes.findIndex(
    (ele, index) =>
      index !== nowSelIndex && index < nowSelIndex && ele.checked === true
  );
  const nearMaxCheckboxIndex = checkboxes.findIndex(
    (ele, index) =>
      index !== nowSelIndex && index > nowSelIndex && ele.checked === true
  );

  if (nearMaxCheckboxIndex !== -1) {
    setCheckbox(nowSelIndex, nearMaxCheckboxIndex);
  }

  if (nearMinCheckboxIndex !== -1) {
    setCheckbox(nearMinCheckboxIndex, nowSelIndex);
  }
}

/**
 * 設定 checkboxes 為選取
 *
 * @param {any} initIndex 索引初始
 * @param {any} aryLength 迴圈長度
 */
function setCheckbox(initIndex, aryLength) {
  for (let index = initIndex; index < aryLength; index++) {
    checkboxes[index].checked = true;
  }
}
```

![exten sample](https://lh3.googleusercontent.com/nrdLfNRlF_Fu0ZZ57ZYOuxrJjs8sqdecoWGAOZ098n_4A9foOg95ZvRr9vesjUZbvMAKbPOYvBk-KqRUA2_HZR8dfzhxplcgbdsESmw8gaRiAxYg1Z35uMveSkHpACFZIgfk4yCOlOvzH3elS6wGDuylRC8Vnlmd34iIMqsUfzI9YxA9e5LtdFCjuqjEKV3iOTHsl6dqMMi0Ss87KkraAVti-ZvVMXORiB8rM8Y7uK4HZTQUCOdNlqVg0Pl9pXAHWooGjPU8kuUaRjk-v6ihVKKfiSqygXpbk5opbEHzJGOCtVEZO85inVt9OpNKGrXvuiz2WZqV6UFyNqU9WQ1u03zzlb_Tbmi0C9rAw41gN-hLrvfSqZMSOD7KWlOsbAOOBwwsAaZusjyp5Kgul9UhAJe1_K9wMUFMdqiBOmFX-zyKShO3RvT9tqwDLe_nqoIHD_KYTnRaC4s21ZPXkLBnTSGnHybGMlL49YLQlqfcJozeSmCt3bjj9KAC1pnwl6p9ZedqFtsijngqBCbQS6EyL1FBgyOdKGaSwY3IPJ4AByv-HVvD6Bp93y8m6kWGF1ZZz5Ngn2DFClgKbyiAJriAamcwwXkvScQPWkq0Mi4TaIzrzKnxrsnFPmKai5dSc0AF9DH7H5LEPBqRsbGE2po-7ayor5aUbfK4=w646-h836-no)

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)