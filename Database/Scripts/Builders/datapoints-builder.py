import json


with open('datasets.json') as f:
  data = json.load(f)

for key in data:
    datasetfile = open("txt/" + key + ".txt", "r")
    for x in datasetfile:
      print(x)
      break
    #print(key)
    #print(data[key]["reference"])