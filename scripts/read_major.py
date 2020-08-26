import pandas as pd
import pymongo

majorList = []
df = pd.read_excel('./data/major_list.xlsx')
for index in range(df.shape[0]):
    item = df.iloc[index]
    major_item = {"major_code": str(item["num"]), "major_name_level_1": str(item["major_l1"]), "major_name_level_2": str(item["major_l2"])}
    majorList.append(major_item)

mycol = pymongo.MongoClient("mongodb://192.144.137.174:27017/")["huhang_users"]["major"]

mycol.insert_many(majorList)
