# server/a.py
import virustotal_python
# import json 
from pprint import pprint
# The line `from base64 import urlsafe_b64encode` is importing the `urlsafe_b64encode` function from
# the `base64` module. This function is used to encode a URL string into a base64 format that is safe
# for use in URLs. In the code, it is used to encode the URL before sending it to the VirusTotal API
# for analysis.
from base64 import urlsafe_b64encode
import sys
from flask import jsonify

def process_url(url):
    key="020c1918dd08ddcb6a173f96aa09722cd2aba5644bf52f35a11a42109a227929"
    with virustotal_python.Virustotal(key) as vtotal:
        try:
            # resp = vtotal.request("urls", data={"url": url}, method="POST")
            
            url_id = urlsafe_b64encode(url.encode()).decode().strip("=")
            report = vtotal.request(f"urls/{url_id}")
            # print("hello")
            # report = vtotal.request(f"urls/{url}")
            # print("hello")
            # pprint(report.data)
            # val= report.data['attributes'].get('last_analysis_results')
            val1= report.data['attributes']['last_analysis_stats']
            harmless=val1['harmless']
            harmful=val1['malicious']
            safe_percentage=(harmless*100)/(harmful+harmless)
            result=report.data
            my_dict = {}
            my_dict1={}
            # my_dict['categories'] = result['attributes']['categories']
            # my_dict['crowdsourced_context'] = result['attributes']['crowdsourced_context']
            # pprint(my_dict['crowdsourced_context'])

            # for key in result['attributes']['last_analysis_results']:
            #     my_dict1[key]=result['attributes']['last_analysis_results'][key]['result']
            # my_dict['last_analysis_results'] = my_dict1
            # my_dict['last_final_url'] = result['attributes']['last_final_url']
            # my_dict['safe_percentage'] = safe_percentage


            # 'categories' key
            if 'categories' in result['attributes']:
                my_dict['categories'] = result['attributes']['categories']

            # 'crowdsourced_context' key
            if 'crowdsourced_context' in result['attributes']:
                my_dict['crowdsourced_context'] = result['attributes']['crowdsourced_context']
                pprint(my_dict['crowdsourced_context'])

            # 'last_analysis_results' key
            
            for key in result['attributes']['last_analysis_results']:
                my_dict1[key] = result['attributes']['last_analysis_results'][key]['result']
            my_dict['last_analysis_results'] = my_dict1

            # 'last_final_url' key
            if 'last_final_url' in result['attributes']:
                my_dict['last_final_url'] = result['attributes']['last_final_url']

            # 'safe_percentage' key
            my_dict['safe_percentage'] = safe_percentage

            # Print the resulting dictionary
            # pprint(my_dict)

            # pprint(my_dict)
            result=my_dict
            return result
        except virustotal_python.VirustotalError as err:
            print(f"Failed to send URL: {url} for analysis and get the report: {err}")
    # print(f"Received URL in a.py: {url}")

if __name__ == '__main__':
    # if len(sys.argv) != 2:
    #     print("Usage: python a.py <url>")
    #     sys.exit(1)

    # url = sys.argv[1]

    url='https://yt1s.com/en634'
    a=process_url(url)
    pprint(a)
