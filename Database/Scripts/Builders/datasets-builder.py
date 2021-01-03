from urllib2 import urlopen
from bs4 import BeautifulSoup
import json

references = BeautifulSoup(urlopen("https://shepherd.caltech.edu/detn_db/html/references.html"), 'html.parser')
urllist = [
    "https://shepherd.caltech.edu/detn_db/html/db_121.html",
    "https://shepherd.caltech.edu/detn_db/html/db_122.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_123.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_124.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_125.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_126.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_127.html",
    "https://shepherd.caltech.edu/detn_db/html/db_130.html",
    "https://shepherd.caltech.edu/detn_db/html/db_131.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_132.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_133.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_134.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_136.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_137.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_138.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_139.html", 
    "https://shepherd.caltech.edu/detn_db/html/db_140.html",  
    "https://shepherd.caltech.edu/detn_db/html/db_141.html"

    
]

datasetlist = dict()

for f in urllist :
    soup = BeautifulSoup(urlopen(f), 'html.parser')
    tempobject = {
        "materials" : [],
        "data" : {
            "variables" : []
        }
    }

    ERlist = []
    ITList = []
    IPList = []

    count = 1
    globalcount = 0
    linkcount = 0
    for dataset in soup.find_all("blockquote") :
        count = 1
        tdcount = 0
        for links in dataset.find_all("a", href=True) :
            if (linkcount % 2) == 0 :
                tempobject["dataset name"] = links.get_text().strip().replace(".txt", "")
            else :
                tempobject["reference"] = links.get_text().replace("[", "").replace("]", "")
            linkcount += 1
        for info in dataset.find_all("td") :
            if (count % 2) == 0 :
                if info.get_text().strip() != "" :
                    if tdcount == 0 :
                        tempobject["category"] = info.get_text().strip()
                    elif tdcount == 1 or tdcount == 3 or tdcount == 5 :
                        tempobject["materials"].append({"composition": info.get_text().strip(),"details": ""})
                    elif tdcount == 2 :
                        tempobject["subcategory"] = info.get_text().strip()
                    elif tdcount == 4 :
                        temp = info.get_text().strip().split()
                        if info.get_text().strip() != "kPa" :
                            tempobject["data"]["variables"].append({"name": "initial temperature","repr": "T_0","units": temp[1], "value" : temp[0]})     
                        else :
                            tempobject["data"]["variables"].append({"name": "initial temperature","repr": "T_0","units": temp[0], "value" : ""})     
                    elif tdcount == 6 :
                        temp = info.get_text().strip().split()
                        if info.get_text().strip() != "K" :
                            tempobject["data"]["variables"].append({"name": "initial pressure", "repr": "P_0", "units": temp[1],"value" : temp[0]}) 
                        else :
                             tempobject["data"]["variables"].append({"name": "initial pressure", "repr": "P_0", "units": temp[0],"value" : ""}) 
                    else :
                        tempobject["data"]["variables"].append({"name": "equivalence ratio", "repr": "N/A", "units": "", "value" : info.get_text().strip()})
                print(f)
                tdcount += 1
            count += 1
        globalcount += 1
        if globalcount == 2 :
            datasetlist[tempobject["dataset name"]] = tempobject
            globalcount = 0
            tempobject = {
                "materials" : [],
                "data" : {
                    "variables" : []
                }
            }

with open('datasets.json', 'w') as outfile:
    json.dump(datasetlist, outfile, indent=4)
    