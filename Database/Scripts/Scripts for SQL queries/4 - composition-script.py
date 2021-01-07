# This python script produces the category-subcat-query.txt file containing the queries used to populate 
# the composition, material and dataset_materials_material tables in databoom_db_test. 
# The JSON used is the datasets-with-datapoints.json which was produced by the datasets-builder.py script found in Builders folder.

import json

file = open('./Queries in txt/4 - composition-query.txt', "w+")
materialFile = open('./Queries in txt/5 - material-query.txt', "w+")
dmmFile = open('./Queries in txt/10 - dataset-materials-material-query.txt', "w+")

with open('./Scraped JSONs/datasets-with-datapoints.json') as f:
  data = json.load(f)

list_of_composition = dict()
dataset_materials_material = dict()
count = 1 # count for compositionId and materialsId

# Insert compositions into dictionary if it's not there
for x in data: # Loop through dataset
    
    for y in data[x]['materials']: # Loop through compositions
        if y['composition'] not in list_of_composition:
            list_of_composition[y['composition']] = {"name": y['composition'], "id": count} # Insert composition into dictionary
            dataset_materials_material[x] = {"compositionId": count, "datasetId": data[x]['datasetId']} # Insert compositionId and datasetId
            
            # Build 3 sets of txt files with SQL queries
            # Composition query
            file.write(" INSERT INTO `databoom_db`.`composition` (`id`, `composition`) VALUES ("+str(count)+", \""+y['composition']+"\");\n")
            
            # Material query
            materialFile.write(" INSERT INTO `databoom_db`.`material` (`id`, `compositionId`, `details`) VALUES ("+str(count)+", "+str(count)+", \""+y['composition']+"\");\n")
            
            # Dataset Material Material query
            
            dmmFile.write(" INSERT INTO `databoom_db`.`dataset_materials_material` (`datasetId`, `materialId`) VALUES ("+str(data[x]['datasetId'])+", "+str(count)+");\n")
            
            count += 1
        else: # composition is already in dictionary
            dataset_materials_material[x] = {"compositionId": list_of_composition[y['composition']]['id'], "datasetId": data[x]['datasetId']}
            
            # Dataset Material Material query 
        
            dmmFile.write(" INSERT INTO `databoom_db`.`dataset_materials_material` (`datasetId`, `materialId`) VALUES ("+str(data[x]['datasetId'])+", "+str(list_of_composition[y['composition']]['id'])+");\n")

with open('./Scraped JSONs/list_of_composition.json', 'w') as outfile:
    json.dump(list_of_composition, outfile, indent=4)
outfile.close

with open('./Scraped JSONs/dataset_materials_material.json', 'w') as outfile:
    json.dump(dataset_materials_material, outfile, indent=4)
outfile.close

file.close()
materialFile.close()
dmmFile.close()