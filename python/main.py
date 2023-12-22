import json
import sys
import urllib.parse

from flask import Flask, jsonify
from sqlalchemy import create_engine, text
from sqlalchemy.exc import InterfaceError, OperationalError, ProgrammingError
from utilities.functions import print_error

app = Flask(__name__)
try:
    # Get filename from command line arguments, if not provided use default
    file_login = sys.argv[1] if len(sys.argv) > 1 else "LOGIN_DB prod.json"
    with open(file_login, "r", encoding="utf-8") as p_file:
        config = json.load(p_file)
        server = list(config.keys())[0]
        database = config[server]["database"]
        username = config[server]["username"]
        password = urllib.parse.quote_plus(config[server]["password"])
        driver = urllib.parse.quote_plus(config[server]["driver"])
        port = config[server]["port"]

    engine = create_engine(
        f"mssql+pyodbc://{username}:{password}@{server}:{port}/{database}?driver={driver}"
    )
    connection = engine.connect()

    @app.get("/values")
    def get_users():
        try:
            result = connection.execute(
                text("SELECT prd_values FROM [prod].[work].[Params];")
            )
            return jsonify([row[0] for row in result])
        except ProgrammingError:
            print_error("Error in query")
            exit(5)

except OperationalError as error:
    print_error("Error in connection")
    exit(3)
except InterfaceError as error:
    print_error("Error in DB driver")
    exit(4)
except FileNotFoundError as error:
    print_error("Configuration file not found")
    exit(2)
except ValueError as error:
    print_error("Generic error")
    exit(1)

if __name__ == "__main__":
    app.run(debug=True)
