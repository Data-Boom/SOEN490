import json

file = open('publications-query.txt', "w+")

with open('publications.json') as f:
  data = json.load(f)
  
file.write("SET FOREIGN_KEY_CHECKS=0;\n")

for x in data:
   file.write(" INSERT INTO `databoom_db_test`.`publications` (`id`, `name`, `doi`, `year`) VALUES ("+x+", \""+data[x]['name']+"\",\""+data[x]['details']+"\", "+data[x]['year']+");\n")

file.close()