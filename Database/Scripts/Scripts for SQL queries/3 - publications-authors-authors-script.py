# This python script produces the p-a-a-query.txt file containing the queries used to populate
# the publications_authors_authors table in databoom_db_test.
# The JSON used is the PAA.json which was produced by the authors-paa-builder.py script found in Builders folder.

import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path = os.chdir(dir_path)

file = open("../Queries in txt/3 - p-a-a-query.txt", "w+")

with open("../Scraped JSONs/PAA.json") as f:
    data = json.load(f)

for x in data:
    file.write(
        " INSERT INTO `databoom_db`.`publications_authors_authors` (`publicationsId`, `authorsId`) VALUES ("
        + str(data[x]["pubid"])
        + ","
        + str(data[x]["authorid"])
        + ");\n"
    )

file.close()