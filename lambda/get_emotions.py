import json
import boto3 
import urllib

print('Loading function')
s3 = boto3.resource('s3')

def lambda_handler(event, context):

    bucket = 'copycat-deepface'
    key = urllib.parse.unquote_plus('result.json', encoding='utf-8')

    # read the json file
    try: 
        obj = s3.Object(bucket, key)
        data = obj.get()['Body'].read().decode('utf-8')
        json_data = json.loads(data)
        print(json_data)
    except:
        print('Cannot find file')

        # For testing
        json_data = {'img1.png': 'happy', 'img2.png': 'sad', 'img3.png': 'disgust'}
        return {'statusCode' : 500,
            'body': json_data
        }
        
    return {
        'statusCode': 200,
        'body': json_data,
    }