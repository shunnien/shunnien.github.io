title: web.config 中的 maxJsonLength 設定
categories: 程式技術筆記
tags:
  - IIS
  - Troubleshooting
toc: false
date: 2017-12-28 18:10:34
---

主要是傳送某個表單資料時，發生以下錯誤

{% note danger %}
Error during serialization or deserialization using the JSON JavaScriptSerializer. The length of the string exceeds the value set on the maxJsonLength property.\r\nParameter name: input","StackTrace":" ...
{% endnote %}
<!-- more -->

加上後端程式已經採用 [json.net][1] 解析了，所以想起 config 還沒設定，所以需要設定一下 **web.config**

``` xml
<configuration> 
   <system.web.extensions>
       <scripting>
           <webServices>
               <jsonSerialization maxJsonLength="20000"/>
           </webServices>
       </scripting>
   </system.web.extensions>
</configuration> 
```

不設定的話，預設值是 **2097152** 字元，換算就是 **4 MB**

## 參考資料
- [stackoverflow issue][2]
- [forums.asp.net][3]
- MSDN [maxjsonlength][4]

[1]: https://www.newtonsoft.com/json
[2]: https://stackoverflow.com/questions/1151987/can-i-set-an-unlimited-length-for-maxjsonlength-in-web-config
[3]: https://forums.asp.net/t/1697754.aspx?what+is+maxJsonLength+in+jsonSerialization+
[4]: https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.maxjsonlength.aspx