# This python script produces the units-repr-query.txt file containing the queries used to populate the 
# units, representations, and datasetdatatype table.
# The JSON used is the datasets-with-datapoints.json which was produced by the datasets-builder.py script found in Builders folder.

import json
import os
os.chdir('.')

file = open('./Queries in txt/7 - units-repr-query.txt', "w+")
datapointsFile = open('./Queries in txt/9 - datapoints-query.txt', "w+")

with open('./Scraped JSONs/datasets-with-datapoints.json') as f:
  data = json.load(f)

list_of_units = dict()
list_of_representations = dict()

unitCount = 2
reprCount = 2

for x in data: # Loop through each dataset
    
  for y in data[x]['data']['variables']: # Loop each variable array 
    # Build 3 sets of txt files with SQL queries
    
    # Units query
    if y['units'] not in list_of_units and y['units'] != "" and y['units'] != "N/A":
      list_of_units[y['units']] = {"name": y['units'], "id": unitCount}
      
      file.write(" INSERT INTO `databoom_db`.`units` (`id`, `name`, `units`) VALUES ("+str(unitCount)+", \""+y['units']+"\", \""+y['units']+"\");\n")
      
      y['unitsId'] = list_of_units[y['units']]['id']
      unitCount += 1
    elif y['units'] == "" or y['units'] == "N/A":
      y['unitsId'] = 1
    else:
      y['unitsId'] = list_of_units[y['units']]['id']
    
    # Representations query
    
    if y['repr'] not in list_of_representations and y['repr'] != "" and y['repr'] != "N/A":
      list_of_representations[y['repr']] = {"name": y['repr'], "id": reprCount}
      
      file.write(" INSERT INTO `databoom_db`.`representations` (`id`, `repr`) VALUES ("+str(reprCount)+", \""+y['repr']+"\");\n")
      
      y['reprId'] = list_of_representations[y['repr']]['id']
      reprCount += 1
    elif y['repr'] == "" or y['repr'] == "N/A":
      y['reprId'] = 1
    else:
      y['reprId'] = list_of_representations[y['repr']]['id']
    
    # Datapoints query
    datapointsFile.write(" INSERT INTO `databoom_db`.`datapoints`(`datasetId`, `name`, `values`, `unitsId`, `representationsId`) VALUES ("+str(data[x]['datasetId'])+", \""+y['name']+"\", \""+str(y['value'])+"\", "+str(y['unitsId'])+", "+str(y['reprId'])+");\n")
    
file.close()
datapointsFile.close()