import json
import boto3    
import base64
import urllib

client = boto3.client("s3")


def lambda_handler(event, context):
    filename = e["filename"]
    base_64_string = e["base"]
    
    if not base_64_string or base_64_string == "":
        return {'statusCode' : 500}
        
    dec = base64.b64decode(base_64_string)
        
    # store results
    bucket = 'copycat-deepface'
    result_key = urllib.parse.unquote_plus(filename, encoding='utf-8')
    rs = client.put_object(Body = dec, Bucket=bucket, Key=result_key)
    print(rs)
    
    return {'statusCode': 200,
    }
    