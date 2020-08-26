import pandas as pd
import pymongo

userList = []
df = pd.read_excel('./data/senior_test_data.xlsx')
for index in range(df.shape[0]):
    item = df.iloc[index]
    user_item = {
        "wechat_openid": str(item["wechat_openid"]),
        "user_name": str(item["user_name"]),
        "user_avatar": str(item["user_avatar"]),
        "school_code": str(item["school_code"]),
        "school_name": str(item["school_name"]),
        "school_country": str(item["school_country"]),
        "major_code": str(item["major_code"]),
        "major_name_level_1": str(item["major_name_level_1"]),
        "major_name_level_2": str(item["major_name_level_2"]),
        "user_description": str(item["user_description"]),
        "senior_num": str(item["senior_num"]),
        "user_phone": str(item["user_phone"]),
        "user_role": str(item["user_role"]),
        "user_grade": str(item["user_grade"])
    }
    userList.append(user_item)

mycol = pymongo.MongoClient("mongodb://192.144.137.174:27017/")["huhang_users"]["users"]

mycol.insert_many(userList)
