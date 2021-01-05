import json
import re

f = open('text_files_for_building/citations.txt')

tempCobject = {       

}
tempAobject = {
    "listOfRef" : []        
}
PAA = dict()

AuthorsList = dict()
CitationList = dict()
ref = 0

count = 1
for x in f:
    if '[' in x :
        refNum = re.findall('["["][0-9]{1,3}', x)
        ref = refNum[0].replace("[", "")
        authors = x.strip(refNum[0] + "] ").replace("\n", "").replace(" and ", ",").replace(", ", ",").replace(",,", ",")
        listOfAuthors = authors.split(",")
        for author in listOfAuthors :
            author = author.strip(".")
            if author not in AuthorsList :
                if "." not in author :
                    fml = author.split(" ")
                else :
                    fml = author.replace(" ", "").split(".")
                if len(fml) == 1 :
                    tempAobject["last"] = fml[0]
                elif len(fml) == 2 :
                    tempAobject["first"] = fml[0]
                    tempAobject["last"] = fml[1]
                elif len(fml) == 3 :
                    tempAobject["first"] = fml[0]
                    tempAobject["middle"] = fml[1]
                    tempAobject["last"] = fml[2]
                else :
                    tempAobject["first"] = fml[0]
                    tempAobject["middle"] = fml[1] + "." + fml[1]
                    tempAobject["last"] = fml[2]
                tempAobject["listOfRef"] = [ref]
                PAA[count] = {"authorid" : count, "pubid" : ref}
                tempAobject["id"] = count
                count += 1
                AuthorsList[author] = tempAobject
                tempAobject = {"listOfRef" : []}
            else :
                AuthorsList[author]["listOfRef"].append(ref)
    elif re.search('[0-9]{4}["."]', x) :
        year = (re.findall('[0-9]{4}["."]', x))[0]
        tempCobject["year"] = year.strip(".")
        tempCobject["details"] = x.replace(year, "").replace(", \n", "")
        CitationList[ref] = tempCobject
        tempCobject = {}
    else :
        tempCobject["name"] = x.replace(".\n", "")

with open('authors.json', 'w') as outfile:
    json.dump(AuthorsList, outfile, indent=4)
outfile.close

with open('publications.json', 'w') as outfile:
    json.dump(CitationList, outfile, indent=4)
outfile.close

with open('PAA.json', 'w') as outfile:
    json.dump(PAA, outfile, indent=4)
outfile.close