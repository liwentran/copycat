print("Importing Library")

import json
import sys
import boto3
import urllib
sys.path.append('/mnt/tf') 
from deepface import DeepFace
from PIL import Image
from io import BytesIO

print('Loading function')
client = boto3.client('s3')
s3 = boto3.resource('s3') 

print('Starting lambda')
def lambda_handler(event, context):

    # get a list of the images
    print('Getting bucket items...')
    bucket = s3.Bucket('copycat-deepface')
    try:
        objects = list(bucket.objects.filter(Prefix='img'))
        print(bucket.name, "contains: ", [o.key for o in objects])
    except:
        print('Error: Failed to find bucket contents')
        return {'statusCode': '500'}

    
    # analyze each object
    print('Starting analysis')
    result = {} # filename : emotion
    for o in objects:
        # open each image
        file_byte_string = o.get()['Body'].read()
        im = Image.open(BytesIO(file_byte_string))

        # analyze
        emotion = DeepFace.analyze(im, actions = ["emotion"]) 
        print(emotion)
        print(emotion['dominant_emotion'])
        
        result[o.key] = emotion['dominant_emotion']
    
    # store results in a file named result.json
    result_key = urllib.parse.unquote_plus('result.json', encoding='utf-8')
    client.put_object(Body = json.dumps(result) , Bucket='copycat-deepface', Key=result_key)
    
    return {
        'statusCode': 200,
        'body': result,
        'filename': result_key
    }


