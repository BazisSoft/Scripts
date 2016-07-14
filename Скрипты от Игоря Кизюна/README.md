Коллекция скриптов от Игоря Кизюна http://promebelclub.ru/forum/member.php?u=37976

Для работы скриптов связанных с базой материаов необходим установленный ODBC драйвер Firebird, установленные и зарегистрированные в ОС модули FBDBDialog.dll, MSDATGRD.OCX и MSCOMCTL.OCX, а так же настройка переменных FDBServ, FDBFile и FBCFile в самом скрипте. 

VB6 исходник ActiveX модуля FBDBDialog.dll, сам модуль и необходимые *.OCX для его работы лежат в этой папке
ODBC драйвер для работы с БД Firebird: страница оф. сайта для загрузки драйвера http://www.firebirdsql.org/en/odbc-driver/

Стандартное место хранения модулей MSCOMCTL.OCX и MSDATGRD.OCX:
для Windows x64 -: %windir%\SysWOW64, для Windows x32 - %windir%\System32
При отсутствии модулей в системе их необходимо скопировать и зарегистрировать. Для регистрации необходимо запустить командную строку (cmd.exe) и выполнить команду - пример: regsvr32 %windir%\SysWOW64\FBDBDialog.dll
