# This python script produces the publications-query.txt file containing the queries used to populate
# the publications table in databoom_db_test.
# The JSON used is the publications.json which was produced by the authors-paa-builder.py script found in Builders folder.

import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path = os.chdir(dir_path)


file = open("../Queries in txt/2 - publications-query.txt", "w+")

with open("../Scraped JSONs/publications.json") as f:
    data = json.load(f)

for x in data:
    file.write(
        " INSERT INTO `databoom_db`.`publications` (`id`, `name`, `doi`, `year`) VALUES ("
        + x
        + ', "'
        + data[x]["name"]
        + '","'
        + data[x]["details"]
        + '", '
        + data[x]["year"]
        + ");\n"
    )

file.close()