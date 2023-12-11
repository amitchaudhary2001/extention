import re

def isLongURL(url):
    return len(url) > 75

def isTinyURL(url):
    return len(url) < 20

def isAlphaNumericURL(url):
    return re.search(r'\w+@\w+', url) is not None

def isRedirectingURL(url):
    return url.count("//") > 1

def isHypenURL(url):
    return re.search(r'\w+-\w+', url) is not None

def isMultiDomainURL(url):
    # Implement logic to check the domain name structure
    # Example: Check if the domain is in the format: example.com or example.co.uk
    pass

def isFaviconDomainUnidentical(page_links, favicon_link):
    return any(link.startswith(favicon_link) for link in page_links)

def isIllegalHttpsURL(url):
    return url.count('https') > 1

def isImgFromDifferentDomain(img_src, page_domain):
    return not img_src.startswith(page_domain)

def isAnchorFromDifferentDomain(anchor_href, page_domain):
    return not anchor_href.startswith(page_domain)

def isScLnkFromDifferentDomain(script_src, page_domain):
    return not script_src.startswith(page_domain)

def isFormActionInvalid(form_action):
    return not form_action or form_action.strip() == ''

def isMailToAvailable(page_html):
    return 'mailto:' in page_html

def isStatusBarTampered(page_html):
    return 'onmouseover' in page_html and 'window.status' in page_html

def isIframePresent(page_html):
    return '<iframe' in page_html

# # Usage examples:
# url = "https://example.com"
# page_links = ["https://example.com/image.jpg", "https://example.com/script.js"]
# favicon_link = "https://example.com/favicon.ico"
# img_src = "https://example.com/image.jpg"
# anchor_href = "https://example.com/page2"
# script_src = "https://example.com/script.js"
# form_action = "/submit"
# page_html = "<html><body>...</body></html>"


def main(url):
    safety_rating = 0

    # Example: Each function contributes to the safety rating
    # safety_rating += 1 if isLongURL(url) else 0
    safety_rating += 1 if not isTinyURL(url) else 0
    safety_rating += 1 if not isAlphaNumericURL(url) else 0
    safety_rating += 1 if not isRedirectingURL(url) else 0
    safety_rating += 1 if not isHypenURL(url) else 0
    safety_rating += 1 if not isIllegalHttpsURL(url) else 0
    # safety_rating += 1 if not isFaviconDomainUnidentical(page_links, favicon_link) else 0
    # safety_rating += 1 if not isImgFromDifferentDomain(img_src, url) else 0
    # safety_rating += 1 if not isAnchorFromDifferentDomain(anchor_href, url) else 0
    # safety_rating += 1 if not isScLnkFromDifferentDomain(script_src, url) else 0
    # safety_rating += 1 if not isFormActionInvalid(form_action) else 0
    # safety_rating += 1 if not isMailToAvailable(page_html) else 0
    # safety_rating += 1 if not isStatusBarTampered(page_html) else 0
    # safety_rating += 1 if not isIframePresent(page_html) else 0

    return safety_rating

if __name__ == '__main__':
    
    url='https://www.youtube.com/'
    a=main(url)
    print(a)