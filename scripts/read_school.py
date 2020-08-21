import pandas as pd
import pymongo

schoolList = []
df = pd.read_excel('./data/school_list.xlsx')
for index in range(df.shape[0]):
    item = df.iloc[index]
    school_item = {"school_code": str(item["num"]), "school_name": str(item["name"]), "school_country": str(item["country"])}
    schoolList.append(school_item)

mycol = pymongo.MongoClient("mongodb://192.144.137.174:27017/")["huhang_users"]["school"]

mycol.insert_many(schoolList)