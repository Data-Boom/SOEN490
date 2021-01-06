import json

with open('./Scraped JSONs/datasets.json') as f:
  data = json.load(f)

datasetIdCount = 1

for key in data:
    data[key]["datasetId"] = datasetIdCount
    data[key]["dataset-comment"] = ""
    datasetIdCount += 1
    #This opens the txt file with the datapoints per dataset
    datasetfile = open("Builders/txt with datapoints/" + key + ".txt", "r")
    #Each datapoints txt file has a header that contains the name as well as the units
    header = datasetfile.readline()
    temp = header.replace("#", "").lower().split(",")
    variableNames = []
    #For each of the variables inside the header, the points are noted down in an array
    for variable in temp :
      if "diluent" in data[key]:
        variable = variable.replace("diluent", data[key]["diluent"])
      #The if statement checks if the variable of the header does not match the variables from the website 
      # because that means a new variable must be declared
      if "initial temperature" not in variable and "initial pressure" not in variable and "equivalence ratio" not in variable :
        # If there is a "(" in the variable, that means there is a unit, and must be removed from the title before it is used
        if "(" in variable :
          vari = variable.replace("\n", "").split("(")
          variableName = vari[0].strip()
          variableNames.append(variableName)
          data[key]["data"]["variables"].append({"name": variableName,"repr": "","units": vari[1].replace("(", "").replace(")", ""), "value" : []})
        #otherwise, there is no unit and the units must be labeled "N/A" for the dataset entry later
        else :
          variableName = variable.strip()
          variableNames.append(variableName)
          data[key]["data"]["variables"].append({"name": variableName,"repr": "","units": "N/A", "value" : []})
      # If the variable in the matches one from the website, this checks to make sure the units are simply
      # in kPa or K so there is no duplicate entries
      else :
        if "(" in variable :
          vari = variable.replace("\n", "").split("(")
          variableName = vari[0].strip()
          units = vari[1].replace("(", "").replace(")", "")
          if "bar" in units or "torr" in units or "atm" in units :
            variableNames.append("skip")
            print(units)
          else :
            variableNames.append(variableName)
        else :
          variableName = variable.strip()
          variableNames.append(variableName)

    #This gives the count for how many points are in a single array (used later to check if it is 1 of 3 cases 
    # mentioned in the confluence page)
    #Depending on the case, if there is a single value for a variable 
    # not seen in the txt file, it is repeated the same amount of times as the "count" from the other 
    # arrays (For graph displaying purposes)
    # if it is a range, the it is put into "details"
    data[key]["data"]["count"] = 0
    for line in datasetfile :
      points = line.split(",")
      data[key]["data"]["count"] += 1
      for x in range(len(variableNames)) :
        attempt = variableNames[x]
        for each in range(len(data[key]["data"]["variables"])) :
          if data[key]["data"]["variables"][each]["name"] == attempt :
            if not isinstance(data[key]["data"]["variables"][each]["value"], list) :
              data[key]["data"]["variables"][each]["value"] = []
            data[key]["data"]["variables"][each]["value"].append(points[x].replace("\n", "").strip())
    
    # Same as above but for the case 2.
    for each in data[key]["data"]["variables"] :
      if each["name"] == "initial temperature" and not isinstance(each["value"], list) :
        if "-" in each["value"] :
          each["details"] = each["value"]
          data[key]["dataset-comment"] += "The " + each['name'] + " is between the range of " + each['details'] + ". "
          each["value"] = []
        else :
          each["value"] = [each["value"]] * data[key]["data"]["count"]
      elif each["name"] == "initial pressure" and not isinstance(each["value"], list) :
        if "-" in each["value"] :
          each["details"] = each["value"]
          data[key]["dataset-comment"] += "The " + each['name'] + " is between the range of " + each['details'] + ". "
          each["value"] = []
        else :
          each["value"] = [each["value"]] * data[key]["data"]["count"]
      elif each["name"] == "equivalence ratio" and not isinstance(each["value"], list) :
        if "-" in each["value"] :
          each["details"] = each["value"]
          data[key]["dataset-comment"] += "The " + each['name'] + " is between the range of " + each['details'] + ". "
          each["value"] = []
        else :
          each["value"] = [each["value"]] * data[key]["data"]["count"]

# dumps the new datasets into a new json file (with the arrays correctly)
with open('./Scraped JSONs/datasets-with-datapoints.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)
outfile.close