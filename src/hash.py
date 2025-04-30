from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

plain_password = "12345"  # This is the actual password you'll use for login
hashed_password = bcrypt.generate_password_hash(plain_password).decode('utf-8')

print("Hashed Password:", hashed_password)
