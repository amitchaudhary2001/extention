import virustotal_python
import json 
from pprint import pprint
from base64 import urlsafe_b64encode
# import json
import sys

with open('server\link.json') as f:
  url = json.load(f)


with virustotal_python.Virustotal("0142620545336231b49ce757e2962e57fe16f91268475ff16b906fda10cd431f") as vtotal:
    try:
        resp = vtotal.request("urls", data={"url": url}, method="POST")
        
        url_id = urlsafe_b64encode(url.encode()).decode().strip("=")
        report = vtotal.request(f"urls/{url_id}")
        # pprint(report.object_type)
        
        val= report.data['attributes'].get('last_analysis_results')
        val1= report.data['attributes']['last_analysis_stats']
        pprint(report.data['attributes'])
        pprint(val1)
        harmless=val1['harmless']
        harmful=val1['malicious']
        safe_percentage=(harmless*100)/(harmful+harmless)
        print(safe_percentage)
    except virustotal_python.VirustotalError as err:
        print(f"Failed to send URL: {url} for analysis and get the report: {err}")