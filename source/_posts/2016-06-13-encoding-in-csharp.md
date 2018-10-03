title: Encoding 字碼頁編號
categories:
  - [程式技術筆記]
tags: [C#]
description: 紀錄字碼頁編號與編碼的值
toc: false
date: 2016-06-13 21:13:50
---

## Content
筆記一下字碼頁編號，這樣查詢比較方便

| 字碼頁 | 名稱 | 顯示名稱 |
|------:|:------:|:------|
| 37 | IBM037 | IBM EBCDIC (美國和加拿大)|
| 437 | IBM437 | OEM 美國|
| 500 | IBM500 | IBM EBCDIC (國際)|
| 708 | ASMO 708 | 阿拉伯文 (ASMO 708)|
| 720 | DOS 720 | 阿拉伯文 (DOS)|
| 737 | ibm737 | 希臘文 (DOS)|
| 775 | ibm775 | 波羅的海文 (DOS)|
| 850 | ibm850 | 西歐語系 (DOS)|
| 852 | ibm852 | 中歐語系 (DOS)|
| 855 | IBM855 | OEM 斯拉夫文|
| 857 | ibm857 | 土耳其文 (DOS)|
| 858 | IBM00858 | OEM 多語系拉丁我|
| 860 | IBM860 | 葡萄牙文 (DOS)|
| 861 | ibm861 | 冰島文 (DOS)|
| 862 | DOS-862 | 希伯來文 (DOS)|
| 863 | IBM863 | 加拿大法文 (DOS)|
| 864 | IBM864 | 阿拉伯文 (864)|
| 865 | IBM865 | 北歐 (DOS)|
| 866 | cp866 | 斯拉夫文 (DOS)|
| 869 | ibm869 | 希臘文，現代化 (DOS)|
| 870 | IBM870 | IBM EBCDIC (多國語言拉丁文 2)|
| 874 | windows-874 | 泰文 (Windows)|
| 875 | cp875 | IBM EBCDIC (現代希臘文)|
| 932 | shift_jis | 日文 (SHIFT-JIS)|
| 936 | gb2312 | 簡體中文 (GB2312)|
| 949 | ks_c_5601-1987 | 韓文|
| 950 | big5 | 繁體中文 (Big5)|
| 1026 | IBM1026 | IBM EBCDIC (土耳其文拉丁文 5)|
| 1047 | IBM01047 | IBM 拉丁文 1|
| 1140 | IBM01140 | IBM EBCDIC (美國-加拿大-歐洲)|
| 1141 | IBM01141 | IBM EBCDIC (德國歐洲)|
| 1142 | IBM01142 | IBM EBCDIC (丹麥-挪威-歐洲)|
| 1143 | IBM01143 | IBM EBCDIC (芬蘭-瑞典-歐洲)|
| 1144 | IBM01144 | IBM EBCDIC (義大利歐洲)|
| 1145 | IBM01145 | IBM EBCDIC (西班牙歐洲)|
| 1146 | IBM01146 | IBM EBCDIC (英國歐洲)|
| 1147 | IBM01147 | IBM EBCDIC (法國歐洲)|
| 1148 | IBM01148 | IBM EBCDIC (國際歐洲)|
| 1149 | IBM01149 | IBM EBCDIC (冰島文歐洲)|
| 1200 | utf-16 | Unicode|
| 1201 | unicodeFFFE | Unicode (Big endian)|
| 1250 | windows-1250 | 中歐語系 (Windows)|
| 1251 | windows-1251 | 斯拉夫文 (Windows)|
| 1252 | Windows -1252 | 西歐語系 (Windows)|
| 1253 | windows-1253 | 希臘文 (Windows)|
| 1254 | windows-1254 | 土耳其文 (Windows)|
| 1255 | windows-1255 | 希伯來文 (Windows)|
| 1256 | windows-1256 | 阿拉伯文 (Windows)|
| 1257 | windows-1257 | 波羅的海文 (Windows)|
| 1258 | windows-1258 | 越南文 (Windows)|
| 1361 | 裘哈 | 韓文 (裘哈)|
| 10000 | macintosh | 西歐語系 (Mac)|
| 10001 | x mac 日文 | 日文 (Mac)|
| 10002 | x-mac-chinesetrad | 繁體中文 (Mac)|
| 10003 | x-mac-韓文 | 韓文 (Mac)|
| 10004 | x-mac-阿拉伯文 | 阿拉伯文 (Mac)|
| 10005 | x-mac-希伯來文 | 希伯來文 (Mac)|
| 10006 | x mac 希臘文 | 希臘文 (Mac)|
| 10007 | x mac 斯拉夫文 | 斯拉夫文 (Mac)|
| 10008 | x-mac-chinesesimp | 簡體中文 (Mac)|
| 10010 | x mac 羅馬尼亞文 | 羅馬尼亞文 (Mac)|
| 10017 | x-mac-烏克蘭文 | 烏克蘭文 (Mac)|
| 10021 | x-mac-泰文 | 泰文 (Mac)|
| 10029 | x-mac-ce | 中歐語系 (Mac)|
| 10079 | x mac 冰島文 | 冰島文 (Mac)|
| 10081 | x mac 土耳其文 | 土耳其文 (Mac)|
| 10082 | x mac 克羅埃西亞文 | 克羅埃西亞文 (Mac)|
| 12000 | utf-32 | Unicode (UTF-32)|
| 12001 | utf-32be | Unicode (utf-32 Big endian)|
| 20000 | x-中文-CN | 繁體中文 (CN)|
| 20001 | x cp20001 | TCA 台灣|
| 20002 | --倚天 x 中文 | 繁體中文 (倚天)|
| 20003 | x cp20003 | IBM5550 台灣|
| 20004 | x cp20004 | TeleText 台灣|
| 20005 | x cp20005 | Wang 台灣|
| 20105 | x IA5 | 西歐語系 (IA5)|
| 20106 | x IA5 德文 | 德文 (IA5)|
| 20107 | x IA5 瑞典文 | 瑞典文 (IA5)|
| 20108 | x IA5 挪威文 | 挪威文 (IA5)|
| 20127 | 我們 ascii | US-ASCII|
| 20261 | x cp20261 | T.61|
| 20269 | x cp20269 | ISO -6937|
| 20273 | IBM273 | IBM EBCDIC (德國)|
| 20277 | IBM277 | IBM EBCDIC (丹麥挪威)|
| 20278 | IBM278 | IBM EBCDIC (芬蘭瑞典)|
| 20280 | IBM280 | IBM EBCDIC (義大利)|
| 20284 | IBM284 | IBM EBCDIC (西班牙)|
| 20285 | IBM285 | IBM EBCDIC (英國)|
| 20290 | IBM290 | IBM EBCDIC (日文片假名)|
| 20297 | IBM297 | IBM EBCDIC (法國)|
| 20420 | IBM420 | IBM EBCDIC (阿拉伯文)|
| 20423 | IBM423 | IBM EBCDIC (希臘文)|
| 20424 | IBM424 | IBM EBCDIC (希伯來文)|
| 20833 | x-EBCDIC-KoreanExtended | IBM EBCDIC (擴充韓文)|
| 20838 | IBM 泰文 | IBM EBCDIC (泰文)|
| 20866 | koi8 r | 斯拉夫文 (KOI8 R)|
| 20871 | IBM871 | IBM EBCDIC (冰島文)|
| 20880 | IBM880 | IBM EBCDIC (斯拉夫文俄文)|
| 20905 | IBM905 | IBM EBCDIC (土耳其文)|
| 20924 | IBM00924 | IBM 拉丁文 1|
| 20932 | EUC-JP | 日文 (JIS 0208-1990年和 0212年 1990年)|
| 20936 | x cp20936 | 中文 (簡體) (GB2312-80)|
| 20949 | x cp20949 | 韓文 Wansung|
| 21025 | cp1025 | IBM EBCDIC (斯拉夫文塞爾維亞文保加利亞文)|
| 21866 | koi8 u | 斯拉夫文 (KOI8 U)|
| 28591 | iso-8859-1 | 西歐語系 (ISO)|
| 28592 | iso-8859-2 | 中歐語系 (ISO)|
| 28593 | iso-8859-3 | 拉丁文 3 (ISO)|
| 28594 | iso-8859-4 | 波羅的海文 (ISO)|
| 28595 | iso-8859-5 | 斯拉夫文 (ISO)|
| 28596 | iso-8859-6 | 阿拉伯文 (ISO)|
| 28597 | iso-8859-7 | 希臘文 (ISO)|
| 28598 | iso-8859-8 | 希伯來文 (ISO)|
| 28599 | iso-8859-9 | 土耳其文 (ISO)|
| 28603 | iso-8859-13 | 愛沙尼亞文 (ISO)|
| 28605 | iso-8859-15 | 拉丁文 9 (ISO)|
| 29001 | x 木衛二 | 木衛二|
| 38598 | iso 8859-8 i | 希伯來文 (ISO-邏輯)|
| 50220 | iso-2022年-jp | 日文 (JIS)|
| 50221 | csISO2022JP | 日文 (JIS 允許 1 位元組假名)|
| 50222 | iso-2022年-jp | 日文 (JIS 允許 1 個位元組片假名-因此 / SI)|
| 50225 | iso-2022年-kr | 韓文 (ISO)|
| 50227 | x cp50227 | 中文 (簡體) (ISO 2022)|
| 51932 | euc jp | 日文 (EUC)|
| 51936 | EUC CN | 簡體中文 (EUC)|
| 51949 | euc kr | 韓文 (EUC)|
| 52936 | hz-gb-2312 | 簡體中文 (HZ)|
| 54936 | GB18030 | 簡體中文 (GB18030)|
| 57002 | x-iscii-de | ISCII 梵文字母|
| 57003 | x iscii 是 | ISCII 孟加拉文|
| 57004 | x-iscii-東西 | ISCII 坦米爾文|
| 57005 | x-iscii-te | ISCII 特拉古文|
| 57006 | x iscii 身分 | ISCII 阿薩姆文|
| 57007 | 或 x iscii | ISCII 歐利亞文|
| 57008 | 巴 iscii x 卡 | ISCII 坎那達文|
| 57009 | x-iscii-ma | ISCII 馬來亞拉姆文|
| 57010 | x-iscii-gu | ISCII 古吉拉特文|
| 57011 | x-iscii-pa | ISCII 旁遮普語|
| 65000 | utf-7 | Unicode (UTF-7)|
| 65001 | utf-8 | Unicode (UTF-8)|

## 參考資料
- MSDN:[Encoding 類別][1]

[1]: https://msdn.microsoft.com/zh-tw/library/system.text.encoding(v=vs.110).aspx
