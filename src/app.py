from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import MySQLdb.cursors

app = Flask(__name__)

# Secret key for session management
app.secret_key = 'your_secret_key'

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'wellmapp'

# Initialize MySQL and Bcrypt
mysql = MySQL(app)
bcrypt = Bcrypt(app)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT contrasena FROM usuarios WHERE id_admin = %s", (username,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            stored_password = user[0]  # Get hashed password from database
            if bcrypt.check_password_hash(stored_password, password):
                session['username'] = username  # Store username in session
                return redirect(url_for('index'))  # Redirect to index page
            else:
                return "Invalid password, please try again."
        else:
            return "User not found, please check your username."

    return render_template('login.html') 

@app.route('/index')
def index():
    if 'username' in session:
        return render_template('index.html')  # Load index.html
    else:
        return redirect(url_for('login'))  # Redirect to login if not logged in

@app.route('/registrar', methods=['GET', 'POST'])
def registraradmin():
    if request.method == 'POST':
        try:
            cedula = request.form.get('cedula')
            nombre = request.form.get('nombre')
            celular = request.form.get('celular')
            usuario = request.form.get('usuario')
            contrasena = request.form.get('contrasena')
            correo = request.form.get('correo')
            rol = request.form.get('rol')

            contrasena = bcrypt.generate_password_hash(contrasena).decode('utf-8')

            cursor = mysql.connection.cursor()
            cursor.execute("""
                INSERT INTO usuarios(id_admin, nombre, correo, celular, usuario, contrasena, rol)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (cedula, nombre, correo, celular, usuario, contrasena, rol))
            mysql.connection.commit()
            cursor.close()

            flash('✅ Registro exitoso', 'success')
            return redirect(url_for('index'))

        except Exception as e:
            print(f"Error al registrar: {e}")
            flash('❌ Error al registrar. Verifica los datos.', 'danger')
            return redirect(url_for('registraradmin'))

    return render_template('registrar.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
