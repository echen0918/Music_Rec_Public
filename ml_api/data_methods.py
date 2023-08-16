import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
from keras.utils import to_categorical

import os
import pickle 
import re
import json
from json import loads, dumps, dump
import argparse

def pred_to_oh(pred_data, class_list, indices=None, verbose=False):
  '''
  Params: 
    class_list (list(str)): expects a list of strings; typically from pd.columns
    indices (pd.Series): expects a list of ints; typicaly from pd.index
        if no indices provided; assigns indices from length of pred_data
    pred_data (np.ndarray): model predictions; expecting output of model.predict()
    verbose (boolean): display the encoding or not.

  Returns:
    oh_data (pd.DataFrame): one hot encoded dataframe for model predictions

  '''
  
  if indices is None:
    indices = range(len(pred_data))
  idxmax = np.expand_dims(pred_data.argmax(axis=1), axis=1)
  
  encoding=np.zeros(shape=pred_data.shape)
  np.put_along_axis(encoding, idxmax,1,axis=1)
  
  encoding_df = pd.DataFrame(data=encoding, columns=class_list, index=indices)
  if verbose:
    print(encoding_df)
  return encoding_df

def oh_to_cluster(oh_df, verbose=False):
  '''
  Params:
    oh_df (pd.DataFrame): dataframe of labels in one hot encoding;
      NOTE: must be multiclass; NOT MULTILABEL
  Returns:
    cluster_df (pd.Dataframe): cluster dataframe
  '''

  label_data = np.where(oh_df==1)[1]
  cluster_df=pd.DataFrame(label_data, columns=["cluster"], index=oh_df.index)

  if verbose:
    print(cluster_df)

  return cluster_df


def cluster_to_oh(cluster_df, class_list, indices=None, verbose=False):
    '''
    Arguments:
        cluster_df (pd.DataFrame): the dataframe of cluster labels. Label values also
            determine output classes (columns)
        class_list (pd.Series): a list of possible labels; typically from pd.columns
        indices (pd.Series): a list of ints; if none are provided, cluster_df.index is used
        verbose (boolean): option to display dataframe after conversion
    Returns:
        oh_df: one-hot encoding of cluster data 
    '''
    if indices is None:
        indices=cluster_df.index
    # import pdb; pdb.set_trace()
    enc = OneHotEncoder(handle_unknown='ignore')
    cluster_data = cluster_df["cluster"]
    if(len(cluster_data.shape) < 2):
        cluster_data=np.expand_dims(cluster_data, axis=1)
    # if(cluster_data.shape[0] != 1):
    #     cluster_data=cluster_data.reshape(1,-1)
    oh_data=enc.fit_transform(cluster_df[["cluster"]]).toarray()

    oh_df = pd.DataFrame(data=oh_data, columns=class_list, index=indices)


    if verbose:
        print(oh_df)

    return oh_df

# with open('/Users/echen/Desktop/spotify_music_rec/data/multi_v2_pred.pkl', 'rb') as f:
#   pred = pickle.load(f)
# # import pdb; pdb.set_trace()
# with open('/Users/echen/Desktop/spotify_music_rec/data/classes.json', 'rb') as f:
#   class_list = json.load(f)["classes"]

# with open('/Users/echen/Desktop/spotify_music_rec/data/filtered_data.pkl', 'rb') as f:
#   filtered_df = pickle.load(f)
# # print(filtered_df)

# pred_df = oh_to_cluster(pred_to_oh(pred, class_list=class_list, indices=filtered_df.index))
# print(pred_df)

# with open('/Users/echen/Desktop/spotify_music_rec/data/filtered_labels.pkl', 'wb') as f:
#   pickle.dump(pred_df, f)
