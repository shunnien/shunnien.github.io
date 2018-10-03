title: DbEntityValidationException 取得詳細錯誤訊息
date: 2015-11-26 17:59:35
categories: [程式技術筆記]
tags: [C#, EntityFramework, Troubleshooting]
description: EntityFramework 進行偵錯的小技巧(EF 6.0以上才可)
---
## 前言
EF(EntityFramework) 的錯誤訊息通常都要在往下挖才會找到想要找尋的實際錯誤資訊，沒想到現在6.0以上版本有這**[DbEntityValidationException][1]**類別，好好記錄一下。
## 問題&處理
通常我們碰到 EF 的問題時都會以下這樣的情形，真的是很難處理
![Exception](https://lh3.googleusercontent.com/XNuVrryPuJGbkdZTSsymq5b76C5Uhm2YdrCwnx30m_VZ-i9M5-esZYithBQstvSGR7re5LoM6Ss8b_y35FGo-XY_8ZHzBqyHEIdNjnrfvF9V6x8KECvbR8r5c7TBuBxRinCoUIlU-LBy5mBlCZutmCmjj97fyq40qXoIqK9Qw0bcBbXzrydAXXDjrjV2nsrc73yFQB3Rg1d6w4rJr1vI3iBEg9WoOY1lowcLvv6Y-fcVJfdR1HsQfLBjmyuOpgRUkSwnG-6V2AXGW2gzBTJ1aa1Uy7YFn5dH7McrhjV0rNqHeGBBaKYqoiNkG5dnrnY86F_vwnuRGo8qxx7qpIs2w2ATirJccfhYEowaFoIjkueNM0GWUQ-pfW5vDAbh7WZPfehMRGNIHipUZrTBebke8q4_xjO5k8kIwwY7qk3g-MyS-lsktgqDdl6wGilzrqKFx140N7FDRBx_vEnKDM5RKyuSBz2DrCZ4ylSIK7A-5ZwmNbMQIod1lu1AiwTy8p0-Wvj9mTLikvs34gwRupt9YpZXBuomcz-g5ElVBNDOe0De6z7VXDplobxM4tzLzTjQqdz-Up1ZB6-epODz8DHTpwiFlmZJ29I6NE-pGQ4k5XayoiJdUwWmhCr1Op3D9f7dX344u1ZChHt1zCw3Y13cfzfwS-fp43G71XOt50BJAQ=w554-h531-no)
要處理這些問題，要嘛就是多處理幾次，就會知道問題點在哪裡，不然就是裝些輔助工具把 EF 的訊息拉出來查看，現在有這個[DbEntityValidationException][1]類別可以快速取出想要得知的訊息。
使用方式直接替換`Exception`就好，例如：
``` csharp
try
{
    var objectContext = ((IObjectContextAdapter)this).ObjectContext;

    if (EntitiesHelper.EntitiesSetting.SetSystemFieldsEnabled)
    {
        SystemFieldsHelper.SetSystemFields(objectContext);
    }
return base.SaveChanges();
}
catch (DbEntityValidationException ex)
{
    throw ex;
}
```
但是這樣的方式，請看以下圖片，還是要往下層撈取
![DbEntityValidationException](https://lh3.googleusercontent.com/I2fdhUikVV1OXA02aWX3d90iy7TLcbz4lZvof1boHmjfUC6ZL8LkR2P-A60YLLLGy4POqoSIImq9cWxi6sR7AScQrs30lphjmESwyI1uBCQ9nV-2n1C5ztBy9jDfC7vA-Br2UaSJ4YXZMmg__ZbmzIvpV7V45eJ67XLr9EflnzyT9Ok2b4itQeQ5sOAimH9jXjQajEoYfbBjiPhKNVDguS6rFK0f2oCse3flA2xESFv3Tc8XO1Hb2h-VxapRnBTxbPRY4x0QMsWgpI5LtUKa3saLHOt9BE6l-ScfH1tsqXaVq7HgynknqI3sfjPZQPbYkS_RKORh6pAWMEhL6QdG61Prq7tx5HOJ8C8dTmmCNRA9jp6TGAyq9pw0XgmOeh6uieAyLoJ2563-HAW9KQOdFNUoVpwM_346lDFw8KXrEYPMtzXiw9p1CiQ6o8zsAfsmasxEl2w0KMFmAjFJ17cjwmo9-KtG_z_ujp1NVTH4gelOGtdzy2kt1S8Qtcpmp2B6SLrJOsH7oUC55rtHmRgV57ktVHL3BnqQnaLHYQL71UoUuLKw3pVPn5Idr8XO-SB8wAd5eiUP8ihfwRkQySjWBoJD-ZzApSjE7a2-dhr_sIKrKvhY9d41_Wtvf27fo2DQ0J1PNRNeqUkAut4owraMLWLkP6kqsPrAiJX4tENOXg=w461-h180-no)
所以，可以稍微變動一下，讓訊息出來的更明顯，詳細的步驟可以參考[E.K 開發紀事][3]或是[搞搞就懂][2]
``` csharp stackoverflow http://stackoverflow.com/questions/15820505/dbentityvalidationexception-how-can-i-easily-tell-what-caused-the-error
public partial class SomethingSomethingEntities
{
    public override int SaveChanges()
    {
        try
        {
            return base.SaveChanges();
        }
        catch (DbEntityValidationException ex)
        {
            // Retrieve the error messages as a list of strings.
            var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);
    
            // Join the list to a single string.
            var fullErrorMessage = string.Join("; ", errorMessages);
    
            // Combine the original exception message with the new one.
            var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);
    
            // Throw a new DbEntityValidationException with the improved exception message.
            throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
        }
    }
}
```
## 參考資料
- MSDN:[DbEntityValidationException][1]
- 搞搞就懂:[查看DbEntityValidationException發生原因][2]
- E.K 開發紀事:[Entity Framework出現Validation failed...][3]
- stackoverflow:[DbEntityValidationException][4]

[1]: https://msdn.microsoft.com/zh-tw/library/system.data.entity.validation.dbentityvalidationexception(v=vs.113).aspx "MSDN:DbEntityValidationException 類別"
[2]: https://www.dotblogs.com.tw/wasichris/archive/2015/01/24/148255.aspx "搞搞就懂"
[3]: https://www.dotblogs.com.tw/jaigi/archive/2014/09/19/146616.aspx "E.K 開發紀事"
[4]: http://stackoverflow.com/questions/15820505/dbentityvalidationexception-how-can-i-easily-tell-what-caused-the-error "stackoverflow:DbEntityValidationException"