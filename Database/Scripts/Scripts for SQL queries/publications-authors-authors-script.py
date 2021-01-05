# This python script produces the p-a-a-query.txt file containing the queries used to populate 
# the publications_authors_authors table in databoom_db_test. 
# The JSON used is the PAA.json which was produced by the authors-paa-builder.py script found in Builders folder.

import json

file = open('./Queries in txt/p-a-a-query.txt', "w+")

with open('./Scraped JSONs/PAA.json') as f:
  data = json.load(f)
  
file.write("SET FOREIGN_KEY_CHECKS=0;\n")

for x in data:
   file.write(" INSERT INTO `databoom_db_test`.`publications_authors_authors` (`publicationsId`, `authorsId`) VALUES ("+str(data[x]['pubid'])+","+str(data[x]['authorid'])+");\n")
              
file.close()