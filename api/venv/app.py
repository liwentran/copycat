from flask import Flask, jsonify, request
import sklearn
from sklearn.cluster import KMeans
from matplotlib.image import imread
import base64
from base64 import b64decode
from base64 import b64encode
from PIL import Image
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pathlib
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
import PIL
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

app = Flask(__name__)

posts = ["hello world"]

@app.route('/getting')
def home():
    return jsonify({'hello': posts[0]})

#POST
@app.route('/posting', methods=['POST'])
def something():
    from fer import FER
    import matplotlib.pyplot as plt
    import tensorflow

    file = request.files['image']
    img = Image.open(file.stream)

    test_image_one = plt.imread(img)
    emo_detector = FER(mtcnn=True)
    # Capture all the emotions on the image
    captured_emotions = emo_detector.detect_emotions(test_image_one)
    # Print all captured emotions with the image
    print(captured_emotions)
    plt.imshow(test_image_one)

    # Use the top Emotion() function to call for the dominant emotion in the image
    dominant_emotion, emotion_score = emo_detector.top_emotion(test_image_one)
    print(dominant_emotion, emotion_score)

    return jsonify({'hello': dominant_emotion})

app.run(port=5000)




