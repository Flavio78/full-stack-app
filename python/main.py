from flask import Flask, jsonify
from sqlalchemy import MetaData, Table, create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
engine = create_engine(
    "mssql+pyodbc://username:password@localhost/dbname?driver=SQL+Server+Native+Client+11.0"
)
Session = sessionmaker(bind=engine)
session = Session()

metadata = MetaData()
users = Table("users", metadata, autoload_with=engine)


@app.route("/users", methods=["GET"])
def get_users():
    query = users.select()
    result = session.execute(query)
    return jsonify([row.name for row in result])


if __name__ == "__main__":
    app.run(debug=True)
