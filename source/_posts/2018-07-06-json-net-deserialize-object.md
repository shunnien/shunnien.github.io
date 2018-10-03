---
title: Json.net 的自訂 Serialize 與 Deserialize
categories: 程式技術筆記
tags:
  - 'C#'
toc: false
date: 2018-07-06 10:21:17
---

# [Json.net][10] 的自訂序列化與反序列化

會使用 [**Json.net**][10] 此自訂序列化 (Serialize) 或是 反序列化 (Deserialize) 的原因主要是希望在序列化 **Json** 的時候，可以直接將時間的部分按照客戶要求輸出<!-- more -->

先附上使用環境與套件版本

- **Newtonsoft.Json** 版本 : **10.0.2**
- 編輯器 [**LINQPad**](https://www.linqpad.net/) 版本 : **5.31.00(AnyCPU)**

首先建立一個範例 **Class** 叫做 **SampleModel** ，然後利用時區讓兩個 **DateTime** 格式的屬性來做範例輸出

``` csharp
void Main()
{
  SampleModel model = new SampleModel();
  
  // 格式化輸出
  var indented = Newtonsoft.Json.Formatting.Indented;

  var jsonModel = JsonConvert.SerializeObject(model, indented);
  jsonModel.Dump();
}

/// <summary>
/// Class SampleModel.
/// </summary>
public class SampleModel
{
  public int Id { get; set; } = 1;
  public DateTime UtcDate { get; set; } = DateTime.UtcNow;
  public DateTime NowDate { get; set; } = DateTime.Now;
}
```

![sample class serialize](https://lh3.googleusercontent.com/6ZSwRiXLjv0RPKdducbzn5V03BYCTOF2ksUk4INfviiTCK4nPGXdlsG4LXKQE7j8A0EjPgGQkbCcgvPFD1H3dbyQkQbIDwx_uOf-nfEW0mIyNNWViW9r9SXNaJ8XJw-QetNFEx_SUuG5oj6wYMOyRhdt44tdTtS6j6xpYgElBCuxeQ26EX0yOv2WJyarXKdppZDFg-BZaxwq3WWlBJ92O4kerLbbkCkKgCRc9UlkhKo4AdWgrN5w2eMIK0hN90o64B5wPpVa4sV9WioqH1691tZxY9IGUb7dLUTcgiHbNRrDoVFsU5IqYU3EVFOCr8f2u4G3Mjt8lHSKg-mPDxjcLEeXKSekJhTljBlsDQKg8aXRfipgeK3t-wf7LAILzU3_o26OkafRRSL4oMZoqmUxphn9h_co1ds_sg1ZldLjaY83CyVgVNSZ1P1FcXxO46OuOrO23DNtTNMCEEM6bZGGvRGX-SXmAmNj619nY-WrsY-VBxMwsX7Uf-Hd0fNCVBr-3YHVXA6xzHn_IUglymecryqysab_clIuFy8H31m33_Ppe20-RWRKn0hFtIMxmMS4YRl9xbb83Fm9hCRRpMjUdo9dw8-3Ky5X9oQZkpUeDHkCpisdHliglbsOY36z2_BamoNj-2xTErGMMToNIs_JOOZahaLILKmI=w500-h504-no)

## 序列化

承襲上述的 **SampleModel** ，此部分針對 **Json.net** 的 **JsonConverter** 來自訂規則，主要需要撰寫的部分有 **CanConvert** 與 **WriteJson** 兩個方法

``` csharp
void Main()
{
  SampleModel model = new SampleModel();
  // 格式化輸出
  var indented = Newtonsoft.Json.Formatting.Indented;

  // 設定自訂規則轉換 DateTime 格式
  var jsonModel = JsonConvert.SerializeObject(model, indented, new SampleModelConverter(typeof(DateTime)));
  jsonModel.Dump();
}

// Class SampleModel. 請參照上述，此處省略

/// <summary>
/// Class SampleModelConverter.
/// </summary>
/// <seealso cref="Newtonsoft.Json.JsonConverter" />
public class SampleModelConverter : JsonConverter
{
  private readonly Type[] _types;

  /// <summary>
  /// 建構式
  /// </summary>
  /// <param name="types">The types.</param>
  public SampleModelConverter(params Type[] types)
  {
    _types = types;
  }

  /// <summary>
  /// Writes the JSON representation of the object.
  /// </summary>
  /// <param name="writer">The <see cref="T:Newtonsoft.Json.JsonWriter" /> to write to.</param>
  /// <param name="value">The value.</param>
  /// <param name="serializer">The calling serializer.</param>
  public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
  {
    Type type = value.GetType();
    if (type == typeof(DateTime))
    {
      var date = (DateTime)value;
      serializer.Serialize(writer, date.ToLocalTime().ToString("yyyy-MM-dd hh:mm:ss"));

      // 想寫入 json 物件，使用以下語法
      // writer.WriteStartObject();
      // writer.WritePropertyName(type.Name);
      // writer.WriteEndObject();
    }
  }

  /// <summary>
  /// Reads the JSON representation of the object.
  /// </summary>
  /// <param name="reader">The <see cref="T:Newtonsoft.Json.JsonReader" /> to read from.</param>
  /// <param name="objectType">Type of the object.</param>
  /// <param name="existingValue">The existing value of object being read.</param>
  /// <param name="serializer">The calling serializer.</param>
  /// <returns>The object value.</returns>
  public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
  {
    return null;
  }

  /// <summary>
  /// 判斷此物件是否符合自訂規則的設定型別，符合即可進行轉換
  /// </summary>
  /// <param name="objectType">Type of the object.</param>
  /// <returns><c>true</c> if this instance can convert the specified object type; otherwise, <c>false</c>.</returns>
  public override bool CanConvert(Type objectType)
  {
    var result = _types.Any(t => t == objectType);
    return result;
  }
}
```

![serializer result](https://lh3.googleusercontent.com/brBkvtfSaLvogg4aom4jx43gn6QOrzkftLCPssmh3tEMZNWx6f0J0GEzjGD7zaWRs1Me74cxbDHKFgOarCctLtTYBjo7EYQ2ivBrqb0s5x4dGfzmcJqBDCHO2LoAuF82Zfz79RMMMs2dclcrOnIVdFsAgFCWGMneHiKfYslciCJrPFZMrVz-JwxYd352fWWYEdYPgdpD-UFyH9BBL0ZuYwNxTGIlsiUUH7-h7271f_Y0tR_dVNMPckHruicB86vbRksaHISVN_e5ZSwpcgHgdfNy4AaB-UP9n1SBg9FGEBpz_w85dK1bj3-4Im32O2iSULgqF3-zNclA8RrSyhjKr1oA5SXjXBCjVHOH8lMXJYWiAt9MN_OB931MbyB_HBxjRzQ6rNJq8TTNOw8RiDz2YrZhAZlvF_KQu7UYOgGeUnBef9AMZTbeyKsy5h7ActjsyQYXq55Nl4o0jCr_1DNPWFkw06_JtpXpd3YZu65ZvShfcQ7oZgof3j_36hWhgvg6aPHVGkKtB5RcX8-OiRMAxxMH3eMR2jt93-p9ilMNcpsA6e7lVG4qAKbzvptcsbpdrzy6BM7-CjstvgwhkpZguMmXZbvTA-fcT19h3qs4sK7UOkyjl5sgtebbzMHCVw-bpry1qta944ZCCSoFokS43EeTfoRIqQRP=w531-h508-no)

## Deserialize反序列化

反序列化要注意的是要自訂 **ReadJson** 這個方法

``` csharp
void Main()
{
  SampleModel model = new SampleModel();
  // 格式化輸出
  var indented = Newtonsoft.Json.Formatting.Indented;

  // 設定自訂規則轉換 DateTime 格式
  var jsonModel = JsonConvert.SerializeObject(model, indented, new SampleModelConverter(typeof(DateTime)));
  jsonModel.Dump();

  // 設定自訂規則轉換 DateTime 格式
  var deserializeJson = JsonConvert.DeserializeObject<SampleModel>(jsonModel, new SampleModelConverter(typeof(DateTime)));
  deserializeJson.Dump();

}

// Class SampleModel. 請參照上述，此處省略

/// <summary>
/// Class SampleModelConverter.
/// </summary>
/// <seealso cref="Newtonsoft.Json.JsonConverter" />
public class SampleModelConverter : JsonConverter
{
  // ... 其他方法與屬性同序列化的自訂，除 ReadJson 方法不同

  /// <summary>
  /// Reads the JSON representation of the object.
  /// </summary>
  /// <param name="reader">The <see cref="T:Newtonsoft.Json.JsonReader" /> to read from.</param>
  /// <param name="objectType">Type of the object.</param>
  /// <param name="existingValue">The existing value of object being read.</param>
  /// <param name="serializer">The calling serializer.</param>
  /// <returns>The object value.</returns>
  public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
  {
    // reader Json 讀取出來的類型為 Date 格式就進行轉換
    // 當序列化使用此規則時，此處可以省略，因為會沒有 Date 格式
    if (reader.TokenType == JsonToken.Date)
    {
      return ((DateTime)existingValue).ToLocalTime();
    }

    if (DateTime.TryParse(existingValue.ToString(), out DateTime dateValue))
    {
      return dateValue.ToLocalTime();
    }

    return null;
  }
}
```

![Deserialization result](https://lh3.googleusercontent.com/MWk2hU-1Ghawd-_EhIG5lfp40ORJ4UWE7TkTxV3D7sg5rQ8nmrD6fOijHJ16Nz9vltNarzWIm5x1ejOYhuHYbPStgLsnv0ApxzxNIHC_cXLZflse710XeLHVQDg-rOT_Sysfy-nAIM3eAngGJ2pzElOryO20B9xbrNJhpsh43VzZ1HD5EzYqYu13UCFzOy6ZqC0LWYwZW7KJ0ElFeDlFJLRuDAuOAt4fAXkBbA5pl14556bpo0jmPCJUbwHs41-1s7PjNJmsyvZMwhnr9ObUmCMBA_6bIhuI9Kse8uehN2m8hWhYsER2xpEg3n0DYOlbRrN6sdN1ETXDGYydIwGrx50dgjZ-lHfbS4sE56aGafXcuslWGgPigmMJOVYUShW-2KdUbaVHmGIFOFF-uI-y6D6JcZS5UyVk61IH3bVSzy4Lqm-E3jnK9-BpWRIz4aTKOqzn1duO-9V3_WwJtgUMRyk-AON-py25aFbYKHwngooI2PMx_FNMiRI66bOZPNPmPklx618OFET7X402qB0bUv5sEjKXA9DhfoCo153p1AHfcnCB7ldMLSWMHQNEDmJGqc6FKFl2IcCV6DyMtDgeXXOcwmUyJ7Z0okqH-rJnRzoMresfa5nEPm2ZVMsThusEpestkmbEXvGWa97pAIdcJxxBxDsylFbz=w404-h288-no)

## 總結

[Json.net][10] 的 [**JsonConverter**][3] 訂立的規則是通用的，不是針對單一型別的規則，當然此範例還可以使用 [**JsonSerializer.DateFormatString **](https://www.newtonsoft.com/json/help/html/P_Newtonsoft_Json_JsonSerializer_DateFormatString.htm) 等各種方式達到目的，不過此範例重點在於自訂規則與轉換型別的部分，最後附上完整的 sample code

``` csharp
void Main()
{
  SampleModel model = new SampleModel();

  // 格式化輸出
  var indented = Newtonsoft.Json.Formatting.Indented;

  var jsonModel = JsonConvert.SerializeObject(model, indented, new SampleModelConverter(typeof(DateTime)));
  jsonModel.Dump();

  var deserializeJson = JsonConvert.DeserializeObject<SampleModel>(jsonModel, new SampleModelConverter(typeof(DateTime)));
  deserializeJson.Dump();
}

/// <summary>
/// Class SampleModel.
/// </summary>
public class SampleModel
{
  public int Id { get; set; } = 1;
  public DateTime UtcDate { get; set; } = DateTime.UtcNow;
  public DateTime NowDate { get; set; } = DateTime.Now;
}

/// <summary>
/// Class SampleModelConverter.
/// </summary>
/// <seealso cref="Newtonsoft.Json.JsonConverter" />
public class SampleModelConverter : JsonConverter
{
  private readonly Type[] _types;

  /// <summary>
  /// Initializes a new instance of the <see cref="SampleModelConverter"/> class.
  /// </summary>
  /// <param name="types">The types.</param>
  public SampleModelConverter(params Type[] types)
  {
    _types = types;
  }

  /// <summary>
  /// Writes the JSON representation of the object.
  /// </summary>
  /// <param name="writer">The <see cref="T:Newtonsoft.Json.JsonWriter" /> to write to.</param>
  /// <param name="value">The value.</param>
  /// <param name="serializer">The calling serializer.</param>
  public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
  {
    Type type = value.GetType();
    if (type == typeof(DateTime))
    {
      var date = (DateTime)value;
      serializer.Serialize(writer, date.ToLocalTime().ToString("yyyy-MM-dd hh:mm:ss"));
    }
  }

  /// <summary>
  /// Reads the JSON representation of the object.
  /// </summary>
  /// <param name="reader">The <see cref="T:Newtonsoft.Json.JsonReader" /> to read from.</param>
  /// <param name="objectType">Type of the object.</param>
  /// <param name="existingValue">The existing value of object being read.</param>
  /// <param name="serializer">The calling serializer.</param>
  /// <returns>The object value.</returns>
  public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
  {
    if (reader.TokenType == JsonToken.Date)
    {
      return ((DateTime)existingValue).ToLocalTime();
    }
    if (DateTime.TryParse(existingValue.ToString(), out DateTime dateValue))
    {
      return dateValue.ToLocalTime();
    }
    return null;
  }

  /// <summary>
  /// 判斷此物件是否符合自訂規則的設定型別，符合即可進行轉換
  /// </summary>
  /// <param name="objectType">Type of the object.</param>
  /// <returns><c>true</c> if this instance can convert the specified object type; otherwise, <c>false</c>.</returns>
  public override bool CanConvert(Type objectType)
  {
    var result = _types.Any(t => t == objectType);
    return result;
  }
}
```

## 延伸閱讀

文中的時區轉換都比較偷懶，都是使用 **ToLocalTime** 等方式處理，要執行轉換的話，建議可以使用 **TimeZoneInfo** 來轉換，如下範例

``` csharp
var twtzinfo = TimeZoneInfo.FindSystemTimeZoneById("Taipei Standard Time");
DateTime localdt = TimeZoneInfo.ConvertTime(DateTime.UtcNow,TimeZoneInfo.Utc, twtzinfo);
DateTime localdt2 = TimeZoneInfo.ConvertTime(DateTime.UtcNow, twtzinfo);
DateTime localdt3 = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, twtzinfo);
localdt.Dump();
localdt2.Dump();
localdt3.Dump();
```

附上拉取時區名稱與時區 ID 的作法，或是參考 [microsoft 時區 ID][11] 文件

``` csharp
TimeZoneInfo localZone = TimeZoneInfo.Local;

Dictionary<string, string> timeZoneIdName = new Dictionary<string, string>()
{
  { localZone.Id, localZone.DisplayName}
};

timeZoneIdName.Dump();
ReadOnlyCollection<TimeZoneInfo> list = TimeZoneInfo.GetSystemTimeZones();
foreach (var zone in list)
{
  if (!timeZoneIdName.ContainsKey(zone.Id))
    timeZoneIdName.Add(zone.Id, zone.DisplayName);
}

timeZoneIdName.Dump();
```

- [microsoft docs 時區轉換時間][1]
- [Newtonsoft DeserializeDateFormatString][2]
- [Newtonsoft CustomJsonConverter][3]
- [microsoft 時區 ID 參考][11]
- [Will 保哥 .NET 日期結構(DateTime) 與 時區轉換](https://blog.miniasp.com/post/2010/04/30/Concept-DateTime-TimeZone.aspx)
- [Darkthread DateTime時區與比較](http://blog.darkthread.net/post-2013-06-24-datetime-timezone-issue.aspx)
- [Bulletproof Interface Deserialization in Json.NET][5]
- [Using custom converters in JSON.NET: Array or Object?][7]
- [JSON.NET Implementing Custom Serialization][8]
- [Encrypting values when serializing with JSON.NET][9]
- [Github 上的 Serialization][6]

[1]: https://docs.microsoft.com/zh-tw/dotnet/standard/datetime/converting-between-time-zones
[2]: https://www.newtonsoft.com/json/help/html/DeserializeDateFormatString.htm
[3]: https://www.newtonsoft.com/json/help/html/CustomJsonConverter.htm
[4]: https://www.newtonsoft.com/json/help/html/Properties_T_Newtonsoft_Json_Converters_DateTimeConverterBase.htm
[5]: https://skrift.io/articles/archive/bulletproof-interface-deserialization-in-jsonnet/
[6]: https://github.com/rhythmagency/formulate/blob/1e60ce07a3c6af4dd13436915bc4f3439a55a828/src/formulate.app/Serialization/FieldsJsonConverter.cs#L50
[7]: https://www.jerriepelser.com/blog/custom-converters-in-json-net-case-study-1/
[8]: http://blog.maskalik.com/asp-net/json-net-implement-custom-serialization/
[9]: https://thomasfreudenberg.com/archive/2017/02/11/encrypting-values-when-serializing-with-json-net/
[10]: https://bridge.net/jsonnet/
[11]: https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-vista/cc749073(v=ws.10)