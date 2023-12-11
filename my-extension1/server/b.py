# server/a.py
import virustotal_python
import json 
from pprint import pprint
from base64 import urlsafe_b64encode
import sys

def process_url(url):

    print(f"Received URL in a.py: {url +'amit'}")
    

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python a.py <url>")
        sys.exit(1)

    url = sys.argv[1]
    process_url(url)
