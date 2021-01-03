import json

file = open('p-a-a-query.txt', "w+")

with open('PAA.json') as f:
  data = json.load(f)
  
file.write("SET FOREIGN_KEY_CHECKS=0;\n")

for x in data:
   file.write(" INSERT INTO `databoom_db_test`.`publications_authors_authors` (`publicationsId`, `authorsId`) VALUES ("+str(data[x]['pubid'])+","+str(data[x]['authorid'])+");\n")
              
file.close()