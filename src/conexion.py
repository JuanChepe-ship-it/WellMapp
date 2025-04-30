import mysql.connector

def conexionBD():
    try:
        mydb=mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            db='Wellmapp'
        )
        print("Conexión Exitosa")
    except mysql.connector.Error as error:
        print(f'Error de conexión:{error}')
        return None
    return mydb
conexionBD()