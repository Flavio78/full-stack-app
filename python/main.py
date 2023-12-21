import json
import sys
import urllib.parse

from flask import Flask, jsonify
from sqlalchemy import create_engine, text

app = Flask(__name__)
try:
    # Get filename from command line arguments, if not provided use default
    file_login = sys.argv[1] if len(sys.argv) > 1 else "LOGIN_DB prod.json"
    with open(file_login, "r", encoding="utf-8") as p_file:
        config = json.load(p_file)
        server = list(config.keys())[0]
        database = config[server]["database"]
        username = config[server]["username"]
        password = config[server]["password"]
        driver = config[server]["driver"]
        port = config[server]["port"]

    engine = create_engine(
        f"mssql+pyodbc://{username}:{ urllib.parse.quote_plus(password)}@{server}:{port}/{database}?driver={ urllib.parse.quote_plus(driver)}"
    )
    connection = engine.connect()

    @app.route("/values", methods=["GET"])
    def get_users():
        result = connection.execute(
            text("SELECT prd_values FROM [prod].[work].[Params];")
        )
        return jsonify([row[0] for row in result])

except Exception as e:
    print(f"e: {e}")
    exit(0)

if __name__ == "__main__":
    app.run(debug=True)
