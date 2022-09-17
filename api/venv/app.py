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
    file = request.files['image']
    img = Image.open(file.stream)

    data_dir_train = pathlib.Path("/Users/ataesaggarwal/code/SCCAgain/Skin cancer ISIC The International Skin Imaging Collaboration/Train")
    data_dir_test = pathlib.Path('/Users/ataesaggarwal/code/SCCAgain/Skin cancer ISIC The International Skin Imaging Collaboration/Test')

    batch_size = 32
    img_height = 180
    img_width = 180

    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
        data_dir_train,
        seed=123,
        validation_split= 0.2,
        subset= 'training',
        image_size=(img_height,img_width),
        batch_size = batch_size
    )

    print(len(train_ds))

    val_ds = tf.keras.preprocessing.image_dataset_from_directory(
        data_dir_train,
        seed=123,
        validation_split= 0.2,
        subset= 'validation',
        label_mode='int',
        image_size=(img_height,img_width),
        batch_size = batch_size
    )

    class_names = train_ds.class_names
    print(class_names)


    AUTOTUNE = tf.data.experimental.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)


    from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPool2D
    num_classes = 2
    model = Sequential([
                        layers.experimental.preprocessing.Rescaling(1./255, input_shape=(img_height, img_width,3))
    ])
    model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                    activation ='relu', input_shape = (180, 180, 32)))
    model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                    activation ='relu'))
    model.add(MaxPool2D(pool_size=(2,2)))
    model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                    activation ='relu'))
    model.add(MaxPool2D(pool_size=(2,2)))
    model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                    activation ='relu'))
    model.add(MaxPool2D(pool_size=(2,2)))
    model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                    activation ='relu'))
    model.add(MaxPool2D(pool_size=(2,2)))
    model.add(Dropout(0.25))


    model.add(Flatten())
    model.add(Dense(num_classes, activation = "softmax"))

    from tensorflow.keras.optimizers import RMSprop

    model.compile(optimizer='adam',
                loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                metrics=['accuracy'])

    epochs=1
    history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=epochs
    )

    image = img.resize((180,180))
    image = np.asarray(image)
    image = tf.convert_to_tensor(image)
    image = tf.expand_dims(image, 0)
    print(image.shape)
    y = model.predict(image)
    print(y[0])

    string = str(y[0][0])
    # string = "hello"

    # acc = history.history['accuracy']
    return jsonify({'hello': string})

app.run(port=5000)




