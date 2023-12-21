from flask import Flask, jsonify
from sqlalchemy import create_engine, text

app = Flask(__name__)
try:
    engine = create_engine(
        "mssql+pyodbc://user1:Produser1@192.168.1.209:1433/prod?driver=SQL+Server"
    )
    connection = engine.connect()

    @app.route("/users", methods=["GET"])
    def get_users():
        result = connection.execute(text("SELECT * FROM [prod].[work].[Params];"))
        return jsonify([row.prd_values for row in result])

except Exception as e:
    print(f"e: {e}")
    exit(0)

if __name__ == "__main__":
    app.run(debug=True)
