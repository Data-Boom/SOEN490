# This script uses the citation text file to create 3 files in a format thatll be easy to transfer 
# into mysql queries. The first file is the authors.json containing the names of the authors split
# into first, middle, and last name (if applicable), id, as well as an array of the datasets they are
# related to. Second file is the publications.json which has the name of the publication, the year,
# the id, and the rest of the citation (details), and finally the PAA file that connects the two 
# for the publication_authors_authors table

import json
import re
import os
os.chdir('.')

f = open('Builders/text_files_for_building/citations.txt')

tempCobject = {       

}
tempAobject = {
    "listOfRef" : []        
}
#The dictionaries for the files to prevent duplicates
PAA = dict()
AuthorsList = dict()
CitationList = dict()

ref = 0 #ref is the same as the id for the publication to keep track of it for the datasets 
count = 1

for x in f:
    # If "[" is in the line, it is the line with the authors
    if '[' in x :
        #Using regular expression to find the reference number
        refNum = re.findall('["["][0-9]{1,3}', x)
        ref = refNum[0].replace("[", "")
        authors = x.strip(refNum[0] + "] ").replace("\n", "").replace(" and ", ",").replace(", ", ",").replace(",,", ",")
        listOfAuthors = authors.split(",")
        # Looks like a lot but it is really just separating the author into first, last, and middle based on the length of the author array
        for author in listOfAuthors :
            author = author.strip().strip(".")
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
                    tempAobject["middle"] = fml[1] + "." + fml[2]
                    tempAobject["last"] = fml[3]
                #adding the authors and publication_author_author entry to the dictionary
                tempAobject["listOfRef"] = [ref]
                PAA[count] = {"authorid" : count, "pubid" : ref}
                tempAobject["id"] = count
                count += 1
                AuthorsList[author] = tempAobject
                tempAobject = {"listOfRef" : []}
            else :
                AuthorsList[author]["listOfRef"].append(ref)
    #if there is a year, then it is the "details" of the citation. The details and year are separate
    elif re.search('[0-9]{4}["."]', x) :
        year = (re.findall('[0-9]{4}["."]', x))[0]
        tempCobject["year"] = year.strip(".")
        tempCobject["details"] = x.replace(year, "").replace(", \n", "")
        CitationList[ref] = tempCobject
        tempCobject = {}
    #otherwise, it is the name. Simply.
    else :
        tempCobject["name"] = x.replace(".\n", "")

#dumping the dictionaries into the appropriate files.
with open('./Scraped JSONs/authors.json', 'w') as outfile:
    json.dump(AuthorsList, outfile, indent=4)
outfile.close

with open('./Scraped JSONs/publications.json', 'w') as outfile:
    json.dump(CitationList, outfile, indent=4)
outfile.close

with open('./Scraped JSONs/PAA.json', 'w') as outfile:
    json.dump(PAA, outfile, indent=4)
outfile.close