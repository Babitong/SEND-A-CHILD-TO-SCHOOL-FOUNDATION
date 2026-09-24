import re, urllib.parse, urllib.request
queries = [
    'MTN Mobile Money logo',
    'Union Bank Cameroon logo',
    'Orange Money logo',
]

headers = {'User-Agent': 'Mozilla/5.0'}
for q in queries:
    url = 'https://www.google.com/search?tbm=isch&q=' + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req, timeout=20).read().decode('utf-8', 'ignore')
    urls = sorted(set(re.findall(r'https://encrypted-tbn[^"]+', html)))
    print('QUERY:', q)
    for u in urls[:10]:
        print(u)
    print('---')
