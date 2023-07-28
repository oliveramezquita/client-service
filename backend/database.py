import pyodbc
from decouple import config

username = config('DB_USERNAME')
password = config('DB_PASSWORD')


def cnxn():
    conn_string = 'Driver={ODBC Driver 18 for SQL Server};Server=tcp:oliveramezquitam.database.windows.net,1433;Database=clientservicedb;Uid=' + \
        username + ';Pwd=' + password + \
        ';Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
    return pyodbc.connect(conn_string)


def f_sql_insert(script):
    cursor = cnxn().cursor()
    cursor.execute(script)
    cursor.execute("SELECT @@IDENTITY AS ID;")
    id = cursor.fetchone()[0]
    cursor.commit()
    return id


def f_sql_get(script):
    cursor = cnxn().cursor()
    cursor.execute(script)
    return cursor.fetchall()


def f_sql_delete(table, id):
    script = f"DELETE FROM [{table}] WHERE id = {id}"
    cursor = cnxn().cursor()
    cursor.execute(script)
    cursor.commit()


def f_sql_update(script):
    cursor = cnxn().cursor()
    cursor.execute(script)
    cursor.commit()
