# copycat
An ML-driven mobile game for improving social communication in children with autism.

## Inspiration
Many of our members have worked with children with autism, either personally or through school-related projects. We quickly noticed that the teaching resources for these children, especially when it came to teaching emotions, were wildly outdated and inefficient. For a condition that applies to over 1.5 million children in the US, this is unacceptable. We created Copycat with the hopes of 
 
## What it does
Copycat is a mobile app that works on the recognition and replication of emotions. The user is prompted with an image of a person. They must recognize the emotion displayed in the image. Then, they hold up their phone and snap a picture of them doing the same emotion. You are prompted with a new image until the time out. The goal of the game is to recognize and copy as many of the emotions.
 
## How we built it
Building copycat was a multi-step process. We started with conducting research on the background area and identifying pain points to ideate features. This included reading literature in the field and learning about user stories. 
We then designed low and high-fidelity mockups in Figma before coding our user interface using react native.
We also applied a facial emotion recognition machine learning model to analyze the emotions of photos submitted by the user.
We used cloud computing for the backend. In specific, we utilized AWS services like Lambda and Elastic File Store to apply algorithms and run our model. We then used S3 and API Gateway to connect the backend to our app. 


Tech Stack: React Native, Flask, Github, AWS
Software: Figma, Postman, Adobe Illustrator
 
## Challenges we ran into
-	Emulator and the webcam: the emotion recognition model runs very well on our computer. However, the emulator is not compatible with the laptop’s webcam, so we had to use Expo Go on our iOS device. However, this meant that our model was unable to run locally on the mobile device. Our solution was to move to cloud!
-	Limitations of Cloud: moving to cloud was not as simple as we were prepared for. The first problem we ran into was the serverless design of Lambda. We had to shift to do all our processing to occur in one large batch at the end because the time it took to import the heavy models negatively impacted the user experience. Despite this, we learned a lot about cloud architecture, and we would design a better one in the future.
-	Uploading images to S3: after implementing it 5+ different ways, we were never successful in creating a smooth pipeline between the phone camera and cloud storage. We tried sending the binary file itself, to converting to base64 and sending through an API, to using AWS SDK itself. This was the broken link that tripped us up for a long time. 
-	Balancing friendly atmosphere while having a good user experience: we thought that user experience was especially important, especially for a game catered towards children. 

## Accomplishments that we're proud of
-	We are proud of our quick ability to adapt. Despite facing derailing challenges (like not having a webcam for a very computer vision heavy app), we found ways to get around it, even if they are outside of our comfort zone.  

## What we learned
 We quickly developed our technical skills! We got more familiar with front end, design, APIs. Cloud computing, react native, and working with images. We also learned about the cool people here to mentor us!

## What's next for Copycat
While building Copycat, we had many new ideas. 
-	Unlimited game content generation: we apply the same emotion recognition algorithm on images from the web to generate infinite content. 
-	Less waiting time: move Lambda processes to EC2- for less wait time for the user. 
-	Broaden: Target more complex emotions (such as guilt, uncertainty, confusion, etc.) 
-	Complexity: Tell a story, explain why people feel certain emotions in certain situations
-	Game stack: add different games. 
