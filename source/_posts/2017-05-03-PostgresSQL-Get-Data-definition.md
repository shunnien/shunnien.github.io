title: PostgresSQL 取得所有欄位定義的方法
categories: [程式技術筆記]
tags:
  - PostgrestSQL
description: 取得所有欄位定義的方法(含備註欄位)
toc: false
date: 2017-05-03 19:33:52
---

## 碎碎念
把以前的一些參考資料或是會用到的東西紀錄一下，筆記一下 **postgresSQL** 的取得所有定義資料

## 做法
``` sql
--- postgres SQL 取得所有欄位定義的方法(含備註欄位)
SELECT DISTINCT
    pgc.relname as tablename,
    a.attname as name,
    format_type(a.atttypid, a.atttypmod) as typ,
    a.attlen as maxlen,
    def.adsrc as default,
    a.attnotnull as notnull,
    com.description as comment,
    coalesce(i.indisprimary,false) as primary_key,
    pgi.inhrelid
FROM pg_attribute a 
JOIN pg_class pgc ON pgc.oid = a.attrelid
right join pg_tables t on 
 (t.tablename = pgc.relname and t.schemaname = 'public')
left join pg_inherits pgi on 
 (pgi.inhrelid = pgc.oid )
LEFT JOIN pg_index i ON 
    (pgc.oid = i.indrelid AND i.indkey[0] = a.attnum)
LEFT JOIN pg_description com on 
    (pgc.oid = com.objoid AND a.attnum = com.objsubid)
LEFT JOIN pg_attrdef def ON 
    (a.attrelid = def.adrelid AND a.attnum = def.adnum)    
WHERE a.attnum > 0 AND pgc.oid = a.attrelid
AND pg_table_is_visible(pgc.oid)
AND NOT a.attisdropped
and pgc.relkind = 'r'
and pgi.inhrelid is null
--and pgc.relhassubclass = 'f'
--AND (pgc.relname = 'statistics'  or  pgc.relname = 'chart_data')
ORDER BY pgc.relname--,a.attnum;
```

