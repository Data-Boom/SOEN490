from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path = os.chdir(dir_path)

# These are all the urls from the caltech website that needed scraping
references = BeautifulSoup(
    urlopen("https://shepherd.caltech.edu/detn_db/html/references.html"), "html.parser"
)
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
    "https://shepherd.caltech.edu/detn_db/html/db_141.html",
]
# This is to keep all the datasets and their information for transfering to a json file
datasetlist = dict()
# For each of the urls, the following script is done due to the fact that all the tables are the same between each
for f in urllist:
    soup = BeautifulSoup(urlopen(f), "html.parser")
    # this is the temp object that holds the dataset from the site before putting the final product into the dataset dictionary
    tempobject = {"materials": [], "data": {"variables": []}}
    # globalcount is for the dataset object while linkcount is for the two links inside of the dataset
    globalcount = 0
    linkcount = 0
    # There are 2 blockquotes per dataset, one with the links and header, and one with the variables and values
    for dataset in soup.find_all("blockquote"):
        count = 1
        tdcount = 0
        for links in dataset.find_all("a", href=True):
            if (linkcount % 2) == 0:
                tempobject["dataset name"] = (
                    links.get_text().strip().replace(".txt", "")
                )
            else:
                tempobject["reference"] = (
                    links.get_text().replace("[", "").replace("]", "")
                )
            linkcount += 1
        # The blockquotes with "td" in the tables are the ones with the variables. Each of the tdcounts is a case basis
        for info in dataset.find_all("td"):
            # only every second value is needed since the odd are the already known headers of the variables
            if (count % 2) == 0:
                if info.get_text().strip() != "":
                    # case 0 is the category
                    if tdcount == 0:
                        tempobject["category"] = info.get_text().strip()
                    # case 1,3,5 are the materials
                    elif tdcount == 1 or tdcount == 3 or tdcount == 5:
                        if tdcount == 5:
                            tempobject["diluent"] = info.get_text().strip()
                        tempobject["materials"].append(
                            {"composition": info.get_text().strip(), "details": ""}
                        )
                    # case 2 is the subcategory
                    elif tdcount == 2:
                        tempobject["subcategory"] = info.get_text().strip()
                    # case 6 is the initial temperature (sometimes there is no value, just a unit, heance the extra "if" statement)
                    elif tdcount == 6:
                        temp = info.get_text().replace(" - ", "-").strip().split()
                        if tempobject["dataset name"] == "at172h":
                            temp = "K"
                        if info.get_text().strip() != "K" and temp != "K":
                            tempobject["data"]["variables"].append(
                                {
                                    "name": "initial temperature",
                                    "repr": "T_0",
                                    "units": temp[1],
                                    "value": temp[0],
                                }
                            )
                        else:
                            tempobject["data"]["variables"].append(
                                {
                                    "name": "initial temperature",
                                    "repr": "T_0",
                                    "units": temp[0],
                                    "value": [],
                                }
                            )
                    elif tdcount == 4:
                        # case 4 is the initial pressure (sometimes there is no value, just a unit, heance the extra "if" statement)
                        temp = info.get_text().replace(" - ", "-").strip().split()
                        if info.get_text().strip() != "kPa":
                            tempobject["data"]["variables"].append(
                                {
                                    "name": "initial pressure",
                                    "repr": "P_0",
                                    "units": temp[1],
                                    "value": temp[0],
                                }
                            )
                        else:
                            tempobject["data"]["variables"].append(
                                {
                                    "name": "initial pressure",
                                    "repr": "P_0",
                                    "units": temp[0],
                                    "value": [],
                                }
                            )
                    # lastly is the equivalence ration, no unit
                    else:
                        tempobject["data"]["variables"].append(
                            {
                                "name": "equivalence ratio",
                                "repr": "N/A",
                                "units": "",
                                "value": info.get_text().strip(),
                            }
                        )
                tdcount += 1
            count += 1
        globalcount += 1
        # if the global count is 2 (1 per blockquote), then it is ready to be put into the dictionary
        if globalcount == 2:
            datasetlist[tempobject["dataset name"]] = tempobject
            globalcount = 0
            tempobject = {"materials": [], "data": {"variables": []}}
# dumps the data into a json file
with open("../Scraped JSONs/datasets.json", "w") as outfile:
    json.dump(datasetlist, outfile, indent=4)
