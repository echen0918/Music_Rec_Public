import numpy as np
import requests
import json
import pandas as pd
import os
from sklearn.model_selection import train_test_split
import data_methods as dm

# Load data
'''
/data
    /aug_song_data.pkl  : holds complete song data from data.csv
    /song_train_set.pkl : train split of song data from aug_song_data
    /song_test_set.pkl  : test split of song data from aug_song_data
    /mean_pts.json      : naive dataset to test model; contains one mean point from each of 16 clusters
'''
data_path = "/Users/echen/Desktop/spotify_music_rec/data"
mean_pts_path = os.path.join(data_path, "mean_pts.json")

dataset = pd.read_json(mean_pts_path).sample(frac=1, random_state=420)
print(dataset)
headers = {'Content-type': 'application/json'}
payload = {'data': json.dumps(dataset.values.tolist())}

# with open(mean_pts_path, "rb") as f:
#     json_obj=json.load(f)
y_predict = requests.post('http://127.0.0.1:5000/song', data=json.dumps(payload), headers=headers).json()

# Make array from the list
y_predict = np.array(y_predict)

class_list=['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
cluster_data=dm.oh_to_cluster(dm.pred_to_oh(pred_data=y_predict, class_list=class_list, indices=dataset.index))
print(cluster_data)
print(dm.cluster_to_oh(cluster_data, class_list=class_list))