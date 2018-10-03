title: JavaScript 取得 Url 的 Query String
categories: 程式技術筆記
tags:
  - JavaScript
toc: false
date: 2017-07-03 11:32:40
description:
---

因為維護某個系統需要，需要使用 Query String 來進行頁面切換，取得 Query String 的方式有很多，例如：自行撰寫，或是透過 API 等...以下列出這些方式。<!-- more -->

## 透過 [URLSearchParams][2] API
這 API 使用方式簡單而且操作便利，但是不是所有瀏覽器都支援，所以想要全部支援的話，可能要考慮其他方式

![URLSearchParams caniuse](https://lh3.googleusercontent.com/JqECbHODGdFx7JXnmUrkcQuQBu__KASvI14ES-9ZOc3Pon6m-tpwClrKHnEmBVP8BwJE0hLft4tuvDI6kJxM5HB4ZIoLkxTlrh5fjAZKPfM9jn04n3A6wXoqnZkFLK9_M7o2oX8lGueGr-AEMEq4fT7AnsVWR7cxyFvaPxltsnQh55Dwz8itVOXtZ0vPGH_hD5YX9mLUeY6kRzQeXdSMEdnC1PZZ8fGKjR96KBNyGFNZRafQzEK-1CUlpPMgi4xbnle7o7mdLv2esrrPdvHKTcuJxhgdP4LsmGIlMcWeLnCSR9dU2hJLwxgGOVvUW0P-XoPo_Ewffu4v7RfNsnn5rfjRhWldKHYGF7Vn59sLp92qS9yaqTxu4GdvqVSZXMT_7jtvfCDEJIQf3nuoAb30_F2ZVUYVac5h4CBlux1LcTrTwwPIQj8om8o8VKvieOoa02JFAy_-AaNuZ40onMyeF78WMf-Ptr_jflxfLc85gRrWZwOwwkieR-zPIk6-iVQ-k95KhD4sAQIaQYUv1f2lw75-nZ-g9t-1mqUSNbXkbFKXvptImtmCr0WjjJEFKsRHH_n4uOJdFPQ13jEu40OSvfjDearyckhgRGAm0E5CWt7xOU8sQf-I9xOpdeychT-Ty5XPvpcP-aK7VyleBRNKCehwNtBAykX6uE0PXo0xAg=w861-h639-no)

``` javascript
// 假設 "?q=1234&txt=abc"
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.has('q')); // true
console.log(urlParams.get('txt')); // "abc"
console.log(urlParams.getAll('action')); // ["abc"]
console.log(urlParams.toString()); // "q=1234&txt=abc"
console.log(urlParams.append('page', '1')); // "q=1234&txt=abc&page=1"
```

## 透過 [URL API][4]
各瀏覽器對於 [URL API][4] 的支援度比 [URLSearchParams][2] 高，但是可以從 [CanIUse](http://caniuse.com/#search=URL) 看出，還是有些不支援。

![Url caniuse](https://lh3.googleusercontent.com/8uAKVIH573weKn5z1HeacJI3_Ouphx1flP7WBRvQ0O_SkKoxa3P9jejRiHyPVURA7x6kYXgtcASQjnYcYsMTqq6dF8ZpT1Kzx3m5mFM95FhgqswwLt6IurLAR9XRR3JrFD3DQ7JaaGT2tbR9Yvcjsw7TO2LpgrLq7vxeO8yObgqHUlvBVW6njiHvX73BE6lrRmgx_Hpa_IHZ37yeBmA2wJ_Bc36Zb3Pl5hAR79B3d_6Z1oxOR_sUn4bbhBxpBfT9e7QtAGL7AWLzL4w__WFRHFRru6HpvRugD7TJ7gckfkvWeRH8h5yJ_hta7onyYeGvFGH-YssjYRSmUY4Zy394uge1odX-9upK73gnU0or4BwAc2aBLjgrHNVYiFpX7WDbtr6GFDTm2yMK2GeOhsbFg5f_DznlPJQHOnwjD0amls9lJ5alV0OksCeNEsou_0SbIW1YgCRR1b7HXHZfWQ1Fr5a8PbpHE0EGbjtNoId7y3lBRSinpGEaaoC1xq0fHmUitdGTYreyccTVM8EnUEaZVbI3BXIEINERWBSsG4FJT17Akvkm26ezqEbSdYqDGfQO_i8LvhYQQm_Q84B_QlC2P4E34Wv7C9BXRvC6fCRhE1Yz8siGIN3OvWU8EpDk0mNBFcnb81ci8wqxrU25awt2cbg963VImBs7sIkWvIblrw=w850-h640-no)

``` javascript
let url_string = "http://www.example.com/index.html?a=1&b=m2";
let url = new URL(url_string);
url.searchParams.has("b");  // true
url.searchParams.get("b");  // m2
```

## 自行撰寫
不透過 API 的話，就是使用現有 JavaScript 去撰寫 Url 的分析，擷取出參數，撰寫邏輯可以參考 Github 上許多 [open source](https://github.com/search?l=JavaScript&q=url+search+param&type=Repositories&utf8=%E2%9C%93) 的專案，以下的程式碼引用至
[WebReflection url-search-params][5] 專案

``` javascript
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
```

假如不使用 Regex 的話

``` javascript
// 假設 http://sample.com/index.html?a=1&b=2
function queryString ()
{
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++)
    {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined")
        {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string")
        {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else
        {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}

queryString(); // {a: "1", b: "2"}
```

## 參考資料
- [MDN URLSearchParams][2]
- [MDN Location object][3]
- [MDN URL API][4]

[1]: https://davidwalsh.name/query-string-javascript
[2]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[4]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[5]: https://github.com/WebReflection/url-search-params