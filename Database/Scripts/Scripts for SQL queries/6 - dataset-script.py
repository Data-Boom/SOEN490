# This python script produces the dataset-query.txt file containing the queries used to populate 
# the dataset table in databoom_db_test. 
# The JSON used is the datasets-with-datapoints.json which was produced by the datasets-builder.py script found in Builders folder.

# WARNING: 
# category-subcat-script.py MUST be RUN before this script.
# This is because dataset-with-datapoints.json must include categoryId's and subcategoryId's -> these are added from the category-subcat-script.py

import json

file = open('./Queries in txt/8 - dataset-query.txt', "w+")

with open('./Scraped JSONs/datasets-with-datapoints.json') as f:
  data = json.load(f)

for x in data:
    file.write(" INSERT INTO `databoom_db`.`dataset` (`id`, `name`, `datatypeId`, `publicationId`, `categoryId`, `subcategoryId`, `comments`) VALUES ("+str(data[x]['datasetId'])+", \""+x+"\", 1, "+str(data[x]['reference'])+", "+str(data[x]['categoryId'])+", "+str(data[x]['subcategoryId'])+", \""+data[x]['dataset-comment']+"\");\n")

file.close()