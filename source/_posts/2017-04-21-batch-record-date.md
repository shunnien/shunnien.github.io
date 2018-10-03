title: 批次檔案取得檔的日期、時間欄位
categories:
  - [程式技術筆記]
tags:
  - batch
description: 批次檔案取得檔的日期、時間欄位
toc: false
date: 2017-04-21 10:54:27
---

## Conetent
紀錄一下批次檔案取得日期與時間


``` bash
@echo off

rem 取得今天日期的年、月、日三個欄位（透過 date /t 指令取得）
for /f "tokens=1-4 delims=-/ " %%i IN ('date /t') DO (
set year=%%i
set month=%%j
set day=%%k
set week=%%l
)

rem 取得當下時間的時、分兩個欄位
for /f "tokens=1-3 delims=:" %%i IN ('time /t') DO (
set hour=%%i
set minute=%%j
)

rem 濾掉 hour 前面可能會出現的空白以及上午下午的文字
for /f "tokens=1-2 delims= " %%i IN ("%hour%") DO (
set hour=%%j
)

echo "====== Start ======"
echo "date parameter = %date%"
echo "time parameter = %time%"
echo "year = %year%"
echo "month = %month%"
echo "day = %day%"
echo "week = %week%"
echo "minute = %minute%"
echo "hour = %hour%"
echo "====== End ======"
pause
```

## Reference
- [Will](http://blog.miniasp.com/post/2007/10/29/How-to-get-system-date-time-in-batch-file.aspx)