# This python script produces the authors-query.txt file containing the queries used to populate the authors table in databoom_db_test. 
# The JSON used is authors.json which was produced by the authors-paa-builder.py script found in Builders folder. 

import json

file = open('./Queries in txt/authors-query.txt', "w+")

with open('./Scraped JSONs/authors.json') as f:
  data = json.load(f)
  
file.write("SET FOREIGN_KEY_CHECKS=0;\n")

for x in data:
    
    if "middle" not in data[x]:
        data[x]["middle"] = ""
    
    if "first" not in data[x]:
        data[x]["first"] = ""
        
    file.write(" INSERT INTO `databoom_db_test`.`authors` (`id`, `firstName`, `lastName`, `middleName`) VALUES ("+str(data[x]['id'])+", \""+data[x]['first']+"\",\""+data[x]['last']+"\", \""+data[x]['middle']+"\");\n")

file.close()