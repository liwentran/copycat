import json
import boto3    


def lambda_handler(event, context):

    s3 = boto3.resource('s3')
    bucket = s3.Bucket('copycat-deepface')

    # delete all
    bucket.objects.all().delete()
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully cleared copycat-deepface bucket!')
    }
