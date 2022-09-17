from flask import Flask, jsonify, request
import numpy as np
from PIL import Image
from fer import FER
# import matplotlib.pyplot as plt
# import tensorflow

app = Flask(__name__)

posts = ["hello world"]

@app.route('/getting')
def home():
    return jsonify({'hello': posts[0]})

#POST
@app.route('/posting', methods=['POST'])
def something():

    # file = request.files['image']
    # img = Image.open(file.stream)

    # test_image_one = plt.imread(img)
    # emo_detector = FER(mtcnn=True)
    # # Capture all the emotions on the image
    # captured_emotions = emo_detector.detect_emotions(test_image_one)
    # # Print all captured emotions with the image
    # print(captured_emotions)
    # plt.imshow(test_image_one)

    # # Use the top Emotion() function to call for the dominant emotion in the image
    # dominant_emotion, emotion_score = emo_detector.top_emotion(test_image_one)
    # print(dominant_emotion, emotion_score)

    return jsonify({'hello': 'dominant_emotion'})

app.run(port=5000)




