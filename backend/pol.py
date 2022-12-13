import requests
import json
from bs4 import BeautifulSoup
import pandas as pd

key = "qNuv4qgzlGOGktW533eS9FPPwEviNMo9/4Ba69dkRJTBXtDXlJc3W3iPExVRpz3h2SDMAOlgCmyN2+7hiYD6lQ=="
url = "http://apis.data.go.kr/9710000/NationalAssemblyInfoService/getMemberCurrStateList"

params ={'serviceKey' : key, 'numOfRows' : '299', 'pageNo' : '1' }

response = requests.get(url, params=params)
soup = BeautifulSoup(response.text, "lxml-xml")
items = soup.find_all('item')

def parse(item):
    try:
        deptCd = item.find("deptCd").get_text()
        name = item.find("empNm").get_text()
        jpgLink = item.find("jpgLink").get_text()
        return {
            "name" : name,
            "jpgLink" : jpgLink,
        }
    except AttributeError as e:
        return {
            "name" : None,
            "jpgLink" : None,
        }
        
row = []
for item in items:
  row.append(parse(item))

service_key = "0f2798b64d2849d2a34ced8fdd8b68a1"
url = 'https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu'
params ={'KEY':service_key, 'Type':'json', 'pSize':314}

response = requests.get(url, params=params)
lst = response.json().get("nwvrqwxyaytdsfvhu")
target_data = lst[len(lst)-1].get('row')
url = "https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn"

data_num = 299
datas = []
for i in range(data_num):
  data = target_data[i]
  image_src = row[i]["jpgLink"]
  name = data.get('HG_NM')
  params ={'KEY':service_key, 'Type':'json', 'pSize':300, 'pIndex':1, 'AGE':21, "PROPOSER":name}
  response = requests.get(url=url, params = params)
  confined_datas = ""
  if response.json().get("nzmimeepazxkubdpn") is not None:
    pros_datas = response.json().get("nzmimeepazxkubdpn")[1].get('row')
  print(len(pros_datas))
  for pros_data in pros_datas:
    bill_name = pros_data.get('BILL_NAME')
    if bill_name is not None:
      confined_datas += bill_name
      confined_datas += "\n"
  datas.append({'name':data.get('HG_NM'), 'image_src':image_src, 'birth_date':data.get('BTH_DATE'),'job':data.get('JOB_RES_NM'),'political_party':data.get('POLY_NM'),'election_precinct':data.get('ORIG_NM'),'committee':data.get('CMIT_NM'),'committees':data.get('CMITS'),'reelection':data.get('REELE_GBN_NM'),'election_units':data.get('UNITS'),'telephone_number':data.get('TEL_NO'),'email':data.get('E_MAIL'), 'career_summary':data.get('MEM_TITLE'),'mona_code':data.get('MONA_CD'),'proposals':confined_datas})

post_url = "http://127.0.0.1:8000/api/politician/"
response = requests.post(url=post_url, json={"politicians":datas})
print(response.status_code)