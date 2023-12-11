# server/receiver.py
import subprocess
# from a import process_url as a_process
import a
import json
from flask import Flask, request, jsonify
import url_checker 
from prediction import get_prediction_from_url
from urllib.parse import urlparse, urlunparse

app = Flask(__name__)

@app.route('/receive_url', methods=['POST'])
def receive_url():
    # The line `data = request.get_json()` is retrieving the JSON data from the request object. It is
    # parsing the JSON data and storing it in the `data` variable.
    data = request.get_json()
    url = data.get('url')

    print(url)
    parsed_url = urlparse(url)
    url = urlunparse((parsed_url.scheme, parsed_url.netloc, ' ', '', '', ''))
    print(url)
    
    t=get_prediction_from_url(url)
    print(t)
    abc=url_checker.main(url)
    print(abc)
    # url='facebook.com'
    try:
        # Execute a.py with the URL as an argument
        # result = subprocess.check_output(["python", "server/a.py", url], universal_newlines=True)
        result=a.process_url(url)
        # print(f"Result from a.py: {result}")
        with open('result.json', 'w') as json_file:
            json_file.write(json.dumps({'result': result}))
        # The line `response_data = {'message': 'URL received and processed successfully', 'result':
        # result}` is creating a dictionary called `response_data` with two key-value pairs.
        result['prediction']=t
        print(result)
        response_data = {'message': 'URL received and processed successfully', 'result': result}
        return jsonify(response_data)
    except Exception as e:
        # The line `print(f"Error running a.py: {str(e)}")` is printing an error message when there is
        # an exception raised while running the `a.py` script. It is using an f-string to format the
        # error message with the value of the exception (`str(e)`) included in the message.
        print(f"Error running a.py: {str(e)}")
        response_data = {'message': 'Error processing URL'}
        return jsonify(response_data), 500

if __name__ == '__main__':
    # receive_url()
    app.run(host='0.0.0.0', port=5000)
