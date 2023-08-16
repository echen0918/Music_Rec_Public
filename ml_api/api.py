from flask import Flask, jsonify
import numpy as np
from flask_restful import Api, Resource, reqparse
import pickle
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
import json
import os

app = Flask(__name__)
api = Api(app)

# Create parser for the payload data
parser = reqparse.RequestParser()
parser.add_argument('data')

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')
# Define how the api will respond to the post requests
class SongClassifier(Resource):
    def post(self):
        
        args = parser.parse_args()
        X = np.array(json.loads(args['data']))
        prediction = song_nn.predict(X)
        return jsonify(prediction.tolist())
        

api.add_resource(SongClassifier, '/song')

if __name__ == '__main__':
    # Load model
    # os.chdir("/Users/echen/Desktop/spotify_music_rec/ml_api/models")
    song_nn = load_model("models/song_nn_25e.keras", compile=False)
    app.run(debug=True)