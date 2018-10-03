title: JS30紀錄 05-Flex Panel Gallery
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-18 11:07:35
---


# 目標

運用 flex 製作一個動畫展開圖片的效果

![flex panel gallery](https://lh3.googleusercontent.com/nlk-ImLuqBvRteoXnA5bRG2S05FxMaBCZraEcbygVpU1ClP7nj4LCUNcBlxRFMjCPvlEO2cbsWUtK2KMHZOK8Q5yFgHWrDSsxOAdgTe4HM5rhKMnjvFnuxF3PBCUFqVdCn_EKpMyvL5jbzd6ITMJUmDlMQ1OWOXmAL6evlhF1luDL6bsa4SP24dOrOqE6KgVtUZvXb3Nzw4s8_Evp_gYe-PVm7uvSYlog9H64Nuhjq7VrKfw4dMYXSJwQN8OhHIQZwo-6r1tR63VMHgKpvfDCtMei1QXGdZ0s2ld79_p7bmwHJGAU9rd_zZjajbgJnRK22RxOIh1YvJdxIh4EReUy1Wsfatd1xGDAQNaPgaM5GPD8NzDSLX9IohbmZNJjanovdAKsnoCG0oLVMIYGnT2yTHMuD96LDt9XGL6WNeHx9axbsGWlG_52BCAg24noUo9QHIi89HpcktIns5T8tr72sycooH2iDXyCNzBtIjaXsnkhGBD9BNg5RTTkGIqkM1-G5LwydtCDgHksSrEaDINPgZRpz1PQ-_Ekwv7dbmOsVRTAFA3r_tLpnrmGST3bSoKzfdwOwaLuzMM7OUun_A9EWwGpoULCDQx2qd8GuPRVrvJkAyOJBXxfkYXmqNUUoFriP7SMqTP_SJIrrQhcXbf-GP3yJgkAT6MBLc=w600-h438-no)
<!--more-->

> [Demo](https://shunnien.github.io/JavaScript30day/day_05/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

一開始的範本頁面如下
![origin page](https://lh3.googleusercontent.com/kVlLSngaKKRXzyo8v6wQRGZAxOIaQjEZsvFQs5ncNIGKP1AloyJuZT_gMlOSijKFcozXJnYfgalB_Po2kUqcZTjHwDaqdC3wAOO2yBchzqp5SXh4ADE7EC5AAkolhe--kPU8OX1xPrnTugJ903FpzDphJfAKMDAyc8co8JUmmTpbLVKJ_crJ5yG95r0t27TpWkivsAbbY1nZFXR8F-t0TmdND3LZJKrFyt8vr6IOrQ33k0t3wmQMVWnfN9HRaCUUZ4v7dzLE6T3Pk3gSxCVx9ySCLvB_cQr5WgaxsIrafYfkNkrW6WgutH6lr1ZMjENwQcEFfhcGcPn9AfDLw0dz3LjO-CdP7IYFdvZk8i4JEB0DdVAfXy8lC5-mijIH48CxkTnvamHzZmxw1OvKssCr7ZdMgldCVD0tNGnuzP52xwWgaanR_AWgRJyKdfLNWXbJoyxwFt8yH6zKff2F0Mgkr14gsndpWOoropT_uqwaVSJL_TvgxjtRtJ3KSfsMeEZhGCM8GkQHrGm96T7DdTyVCdvvSVyLnu3kjl4GgA4cr5BOKejvbYffk1c-RzdLPx60Sf_NCx3pMNHVCx94tPTuSBeCOioLPfjWLCoritsSIiB6gEmWUfUkXovlRAlBjVc4Uz2HcBBYHDY4MiPFSozpOO_M6bX0ibvbzJw=w362-h262-no)

## 步驟 1

- 先調整 `panels` 的 css ，將 display 設定為 flex 配置，此 `panels` 即為 **Flex container**
![panels Flex container](https://lh3.googleusercontent.com/V7JEldG8Y073ew21EBHiFRH5qWjC65a_S3i6vp934BO-pJkjs5mPUfbeGSfS_ETjI81T2aGUpClJybUrwglqgw_mgqh6vB106LO8GtQC_F-M9QohY30lDkZLL9kvz780kc-7RHhEkM_MCjDdnNzo2Y1dVHMmP31__wOixLGc2PphDYW93UQbjSA46thErZ9EBolc9Hlx0edi0gziigELc2p6R8dxiBVaCif2i1u7s9WDBRxw-Ig1NtqpwWYgKx7vQKjSoRXb9TU_2uzk1dnfWrOiquaJM74vCsI4jyagudeeWvjj3nVVKMVB4T8TjeM_APDBC2ESn8QX-begfHc8jY3x_1jGsBAMDnJVQ9PdsQtMYxsE_E5jAaV8u_1DOr72Yi2cuNhUDwOe02yF28YU5_WdlS2ZQm3EpMang3iJlfHaXWFZS0LU3Emmv3-W9nNSK51_j_jXkuLg8l-scE-HicjYviFaufkqMI6QzEvaO1Hq7sRKS5OVWj1CMN88NsHV_LLa5cGPWuQDpkrzp0-bBDm-mpZVkN9MlDQY2ZnOSVKwGdvRZgW3MGPcUNBEL_xM7Zak4G8YZfswB_S6ohPpMRpE2SCIiJIcagA3pvy-X1qnPJqCqpSK5GvrXxCWuTh49wQZ8g6ajWSYyS9p26vW0iYAObFUWpqUmrw=w751-h556-no)
- 設定 `panel` 的 **flex** ，將 [flex][1] 設定為 1 ，設定一個數字為 [flex-grow][10] ，此為容器中空間的指定占比
![panel flex](https://lh3.googleusercontent.com/AgYSxeo3OXKyxRmFAcAQ95GZ1xah98s-CGkmXUAnbIUnv8CaJxgeo4K_kwe7VznQt_iTXIbMskPazz-9USZTko1kvGAlOGR7-kAjQKFyVZTDv4WQbstR5pA7-59lwwPHGDXI6FLcOnS1B4ifFsiwqmgGfWzoB_T_4EOVC6AxtKg5RDIvuaQhhzDpLb7ebO-7-y6oH9BMKIzB0yQ3OCY7nplKPfVEaOKGLiT2EUVgFidKdKjUlosiEPHsNHYa95D3Cq7Ox9hDWOHDUurSRJ2br2nDrdWPTEpwFdSzKx9t5ykuAyV0kwEphXfi7xKyUSOeXRb4aoD9ntbLVH2WBghdNGK8_B-3uW1V60cH2wSAz41P0dGoMNLZ8EXJe0V2ron0E9VimFgpyfIfYdQYlykB5xovhr2Vz_d6rrFbS2Qkw9ff7jm_JJZ4ZU6AkhlnasiGLCB-HRMaA9oxUKkUymcbG25EsxnAGrUYK1dYatWtaiaQHM3RYM8toDroWP1ijp-NKXsN0WYxRSQvtjWwZpUJ_ln-7-v3sVUrZSgXtXJuHSddFTbwCfVkrzIIz_MePRMDBKOIOz7xQsP3CMszXIWYfqSEX1zruTwp1K4rtfmPfscRZhg3HRDXfGExe02ns3lLNijOS8Bk8dTWwsJCyvkhx1BZ_yp0F2ua378=w751-h556-no)

## 步驟 2

上一步驟將各個 `panel` 當作 **Flex item** ，這一步驟中，將設定巢狀 [Flexible box][2] ，並讓元素顯示置中
- 將 `panel` 的 display 設定 flex ，讓 `panel` 當作新的 **Flex container** ，將 `panel` 裡面的文字項目元素變成新的 **Flex item**
- 設定 `.panel > *` 此 **Flex item** 的 flex 為 `flex: 1 0 auto;`
![chil flex container](https://lh3.googleusercontent.com/TblusiXmo_VL-QQyMh28K1InLFysNbspeej7fo-bHpFkN8N6OjiBdo8yzjamRuzpNnaahIX7t5yQQMzFFeZnfw4ba6DLIELi8X8akJroPZGkiosSAO_0ap-HcmQ9xJPTw3zockqAV4B-_35DBcZKWNt0-DY8FSPM7BmZ-tsYF-7u5ZyV1jj-3hZ3atsRWQvruI6PDnbEYrqPOgRGS8eM3gcv-gbZFDO22c2XPW-zeR8V3w4QpjpRquMSm5rxj52Lg1qx8FNJ5VHgwLcQRuMAlsdrIcgXbRW5Kn99Wm9FMZQjLRn2ZMd00KGfuRgl1xDv62eKly6Sm6X43ZJMye8fHzQqCjQmIjl8yHKrTi6kHM7EGG60t1A62mVH_AD6TAGNsJmyPHd3FUvJ55_ZjK_bCUMSQRFMPPFYaoi1z4PG0bc-U88_db99t8MWDFY7zZuiWjOkgTi0YEgvBgcoSpjWNaEp2lxpuQ3RkazGxhvQQwwR9-rje1ngdZAPPFSjyioL7AVQVQnhdWMnVYlsSNB3eUzdaDet77zlTfbvFULGNR_SyoB7GvAMKvYC4KOehmAyBBwizxfSRZKa0UiaKFziANE3gdT8p22RldAz3aa1KqMQZC8FlVkHrQJoqLdoW18K84HGtMWXrB4DfT41CkUuyaJBGcQ42FFM8Z0=w751-h568-no)
- 設定 `justify-content: center;` 將文字重新置中
![justify-content](https://lh3.googleusercontent.com/GlteKiAaSaOAxfz9ycfmWgsb9ilTPbGIwL2wRZR_Az5yROR5pOvwZdttPa5203xuo_wgaP1egXY774RcKAuk8bm-SADiIi3ovUcguNTrEnl-TolzIfU3YBxcuxzF0EYdgmMArTcDe_9byinEF0RGqYjLYH3q0G_6UJU8s-_9jsLKPMKufVxhwaxiXRaE9AfNRK46AnsI5s-JMPqvyHAbPryjA8riMpj2v8olcFJHh_wKcADY-vypYERLvCVN50Xz3Cl75n5G7ZzrynshLP-GFg1dKRLVhRclZrFZ9_oYp490905h3t4TF9dWH9k1eSC6f9r4gfntvFmhSxjTm3v4qegzc4sgC-cHFzPUdVRWvk18VqbkTth3NHTzGHo2d_g_zH9trvHxqDaU28P4naOEwF4Ku6qj8MF3PqFTpJTJxcH7l98o5-_MUc7Z5INosLceohgusdow7WmuJ4laEWTajype-cQzGuhFSVzlc7mI4_w33ns3nzmal8NVhtIbyXWl04tVDcU9RJDWTPuH8jvBvWSzR6UWpA3vfrMmaiJYDqezAUixHgCr_sgCKdeiyKFOmw-VxLCmBWlqwCPiKq1eovlGlVswpoY8dEBEERsamAncfJK_nJRxBfty66iUP28mGMrK5VKl31t7w-o5Moc5mOcuTxyni7IAljY=w751-h568-no)
- 設定 `flex-direction: column;` 讓文字排列按照 column 調整
![flex-direction](https://lh3.googleusercontent.com/UEE_kFtH_N4G7_OGmxHOeqiYs83EsbtdBZK5tlbaKeWhYbMmrgXe4aWkTNQDm8AzMiuSmCg_Qhu1Hy6o56HletG9nxBbqgISa4g-jOdd9bBWhWLJzGYUUqnCCFjm9d42uxqddqfd9DRa_eJQo4n2fkd2RTI2_XMs7zBMw6F_GMhJrO8qO2auYuMyhshhKYbFrgtqTpg-UKogiJ0YDL0jvRqLg1fbntFvPLoZEvDE6RRj5CqJt6YpbsifQQQzex-acR-SIF9NazOjvd9-IZusvUdFfPljq4B4JYbrd30OCfTJxGGxDUFL2RHhenOm2sLjQG9XBuQSM8Ta7BNOAc0fMA-So3DX3ep4ZvaWgcsOF1etDglGva1bjkQTHZRpAUPed-gt_wO3BHJaCOBJjzOM09Kl7aF1VU-F2BYFWU-bSbswLJJCHLAtgUbp5ScGR9cVRta9IaZofGLiUKq2zTmhK179ZPjMkmS8tRVoTEgJnYq_VhFfHANGKPoc6uANvDtAwse_j-cb63EO_k9j6LhD8_nMje2YZmGRPKWAKwoGvkIM0I3HU1T1N7B5Vf0XyXzIaq92XhPGMhNU3ma5Yi7w_d8muENER8g8M-biD6MtCm5nFYjHfFGDDtFntDgRC9yVU1hkQiCWJkxRCVxuPW_h3mrdEU7D1L2ONQ0=w751-h568-no)
- 在 `.panel > *` 設定 display 為 flex ，並加上 `justify-content: center;` 與 `flex-direction: column;` ，此設定是為了文字調整置中
![text align](https://lh3.googleusercontent.com/OajHzNLeN5FQnY1o6t9CGhzUOZyiEIqPMNYCxgzsX71gmF1K-fzEq7dGioqnTpwO_NnA6Fq4tFZLQW9ajA-eOJ-e-M8mqTRQ6IJWwArwdmZUl1F8vRk9HoOzSqEulqR1nbciXcr42yyCVJbkIJuQfRu8yqYgoCkshf-dFBni2-nFlKvp69J_9fX0KY_MVdeT8iIN3A-aZqEkhz-fHFl9jL8XLX6TnwlRsrRPMTv1wXRCliIwjUBOToRy-z2a6VDkF-LVeEzDfufKs0T3vS57wUnJnqqX_Ez8uF-ieXRQbpbVU59J9hHUzfMsXU-CfUIlnTd4wsxsafqVhvy5AS4pe7ultVD0aY0YsQECaXFcqa0akGNJZ5z5JI9YCpTPsEhJC-RDvr77_ClmPmVLKyPEN-8zoRnGNGuA3McVgav_OAAmNng4a0KjlQ3fSs6BVz_nu0FluxDEpxfMiPf8GftJihcIUt-2NNkbUvT_3Ykh4pAqnlBvpCtSHlphg-CUwCh5bA0WSxGCh89NAZ6EAbzUB6xNsfsK2Yhrx7Ike4t79xiX6W61DYJYV7OgYtjalz0JkwaE9oxoyy5HYcUEfLyRqV191PUNvXVGQNh3r1qPFaCwfU0g7DmxIwbUMPX8kHMkoBXZ2rkAB7vH6_oatmriiRPdaTl6-PpJHg0=w751-h568-no)

## 步驟 3

- 先調整 `.panel.open` 的樣式，添加 flex 的占比調整
- 針對文字 tag 的部分，設定 `:first-child` 與 `:last-child` 的樣式特效隱藏
- 加入選取特效 css `.panel.open-active`

## 步驟 4

此部分開始 JS 撰寫

- 取得所有 `.panel` DOM
- 建立 **toggleOpen** function ，並將上述的 DOM 綁定 click 事件
- 建立 **toggleActive** function ，並將上述的 DOM 綁定 transitionend 事件

# 筆記與備註事項

## JavaScript 部分

### [DOMTokenList][8]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/API/DOMTokenList MDN %}
`DOMTokenList` 介面表示了一個以空格作為分隔的內容集，通常來自 `Element.classList`、`HTMLLinkElement.relList`、`HTMLAnchorElement.relList` 或 `HTMLAreaElement.relList` 等屬性。本介面與 `Array` 同樣是由 0 開始索引，且 `DOMTokenList` 是區分大小寫的。
{% endblockquote %}

### [DOMTokenList.toggle()][9]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle MDN %}
The toggle() method of the DOMTokenList interface removes a given token from the list and returns false. If token doesn't exist it's added and the function returns true.
{% endblockquote %}

## CSS 部分

### [flex][1]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/CSS/flex MDN %}
CSS 屬性 `flex` 規定了彈性元素如何伸長或縮短以適應 flex 容器中的可用空間。這是一個簡寫屬性，可以同時設置 `flex-grow` , `flex-shrink` 與 `flex-basis`
{% endblockquote %}

``` CSS
/* Basic values */
flex: auto;
flex: initial;
flex: none;
flex: 2;

/* One value, unitless number: flex-grow */
flex: 2;

/* One value, width/height: flex-basis */
flex: 10em;
flex: 30px;

/* Two values: flex-grow | flex-basis */
flex: 1 30px;

/* Two values: flex-grow | flex-shrink */
flex: 2 2;

/* Three values: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;

/* Global values */
flex: inherit;
flex: initial;
flex: unset;
```

### [Using CSS Flexible Boxes][2]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes MDN %}
CSS3 彈性盒子，又稱 **flexbox** ，是為了適應不同螢幕尺寸和顯示設備而生的佈局模式。針對許多應用而言，不用 floats 的彈性盒子模型會比塊狀模型（block model）易用，彈性容器的邊緣也不會與內容的邊緣重疊。

多數設計師會發現 flexbox 用起來比 box 簡單得多。像是不多注意 `div` 的話，它就會經常違反設計師意願地，跑到頁頂去──令 footer 附著在頁底，也因此變得很棘手。flexbox 的寬高能改變以適應顯示空間，將較低的元件固定住。Flexbox 邏輯也能讓你確實令 `div` 壓在頁面的右方或底部。Flexbox 元素的顯示順序，與原始碼的顯示順序相互獨立。

一些時髦的佈局，也能因而透過更簡潔的程式碼完成。這種有意的獨立性只影響視覺渲染，基於 HTML 原始碼的語意順序及瀏覽不會受到影響。

------

# 彈性盒子的概念Edit

Flex 排版的大致定義，是能更改該項目的長與（或）高，以便貼合任何顯示設備的空間。Flex container 能針對該元件擴張以便填補可用的空間、或收縮以便阻止空間溢出。

塊狀佈局（Block layout）以垂直方向為準、行內佈局（Inline layout）以水平方向為準、而彈性佈局（Flexbox layout）則同時允許這兩種。塊狀佈局雖適於頁面顯示，但在程式元件（application component）需要在用戶代理（user agent）變更、手機從垂直方向翻轉到水平方向……等變更定位、大小、拉伸、收縮的情形下，這種佈局就很難用了。彈性盒子佈局長於小規模佈局、而剛剛流行的格線佈局（Grid layout）則長於大規模佈局。二者皆為 CSS 工作小組為在不同用戶代理、書寫模式、和其他要求下的 Web 應用程式，提供良好互通性的一部分。

------

# 彈性盒子的字彙

在彈性盒子的世界，我們不會稱水平（inline）或垂直（block），而是主軸（main axis）與切軸（cross axis）。如果 flex-direction 是 column，主軸就會充當垂直、而切軸則充當水平。請參考下面的圖，它展示了一個彈性容器，裡面的 row 有 flex-direction，意味著該彈性項目會基於主軸，作水平排列。
![flexible_box](https://developer.mozilla.org/files/3739/flex_terms.png)
{% endblockquote %}

### [flex-direction][5]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction MDN %}
CSS `flex-direction` 屬性指定了內部元素是如何在flex容器中佈局的，定義了主軸的方向(正方向或反方向)。
{% endblockquote %}

``` CSS
/* The direction text is laid out in a line */
flex-direction: row;

/* Like <row>, but reversed */
flex-direction: row-reverse;

/* The direction in which lines of text are stacked */
flex-direction: column;

/* Like <column>, but reversed */
flex-direction: column-reverse;

/* Global values */
flex-direction: inherit;
flex-direction: initial;
flex-direction: unset;
```

### [::before (:before)][3]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/::before MDN %}
`::before` 會為當前元素創建一個子元素作為偽元素。常通過 content 屬性來為一個元素添加修飾性的內容。此元素默認為行內元素。
{% endblockquote %}

``` CSS
/* CSS3語法*/
element::before { 樣式 }

/* （單冒號）CSS2過時語法(僅用來支持IE8) */
element:before { 樣式 }

/*在每一個p元素前插入內容*/
p ::before { content: "Hello world!"; }
```

### [::after (:after)][4]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/::after MDN %}
CSS 偽元素 `::after` 用來創建一個偽元素，做為已選中元素的最後一個子元素。通常會配合 content 屬性來為該元素添加裝飾內容。這個虛擬元素默認是行內元素。
{% endblockquote %}

``` CSS
element:after  { style properties }  /* CSS2 syntax */

element::after { style properties }  /* CSS3 syntax */
```

### [justify-content][6]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content MDN %}
CSS `justify-content` 屬性定義了瀏覽器如何分配順著父容器主軸的彈性元素之間及其周圍的空間
{% endblockquote %}

``` CSS
/* Positional alignment */
justify-content: center;     /*居中排列*/
justify-content: start;      /* Pack items from the start */
justify-content: end;        /* Pack items from the end */
justify-content: flex-start; /*從行首起始位置開始排列*/
justify-content: flex-end;   /*從行尾位置開始排列*/
justify-content: left;       /* Pack items from the left */
justify-content: right;      /* Pack items from the right */

/* Baseline alignment */
justify-content: baseline;
justify-content: first baseline;
justify-content : last baseline;

/* Distributed alignment */
/*均勻排列每個元素首個元素放置於起點，末尾元素放置於終點*/
justify-content: space-between;
/*均勻排列每個元素每個元素周圍分配相同的空間*/
justify-content: space-around;
/*均勻排列每個元素每個元素之間的間隔相等*/
justify-content: space-evenly;
/* Distribute items evenly Stretch 'auto'-sized items to fit容器 */
justify-content: stretch;

/* Overflow alignment */
justify-content: safe center;
justify-content: unsafe center;

/* Global values */
justify-content：inherit;
justify-content：initial;
justify-content：unset;
```

### [translateY()][7]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY MDN %}
`translateY()` 函數表示在頁面垂直移動元素.這個 transformation 具有特徵的就是通過 `<length>` 定義了元素垂直移動了多少
translateY(ty) 是 translate(0, ty) 的一種簡寫方式
{% endblockquote %}

``` css
.transformed {
  transform: translateY(10px);
  background-color: blue;
}
```

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/flex
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/::before
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/::after
[5]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
[6]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
[7]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY
[8]: https://developer.mozilla.org/zh-TW/docs/Web/API/DOMTokenList
[9]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
[10]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow