# This python script signs up 100 different accounts

import requests

for lp in range(100):
    account = "test" + str(lp) + "@123.com"
    obj = {
        'firstName': 'first',
        'lastName': 'last',
        'email': account, 
        'dateofBirth': '2021-01-24 19:00:00',
        'organizationName': 'Hogwarts',
        'password': 1,
        'confirmPassword': 1
    }
    r = requests.post("http://localhost:4000/signup", data = obj)
    print(r.status_code, r.reason)