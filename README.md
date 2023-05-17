## 1. Scripts
- Install dependencies: ```npm i```
- Start server: ```npm start```
- Build: ```npm run build```
- Test: ```npm run test```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```

## 2. Usage
#### The / endpoint: 
http://localhost:3000/
- Show original image name exists and images are saved in thumbnails folder after processing 
- Guide on how to access the link to process images
#### The /images endpoint:
http://localhost:3000/images

This is the endpoint for resizing images with query arguments:
- filename: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- width: type number and value > 0
- height: type number and value > 0
- format: format of the image after processing

##### Example
- [http://localhost:3000/api/images?filename=encenadaport](http://localhost:3000/api/images?filename=encenadaport): Will display the original encenadaport image.
- [http://localhost:3000/api/images?filename=encenadaport&width=300&height=300](http://localhost:3000/api/images?filename=encenadaport&width=300&height=300): Will resize the original encenadaport image to 300x300 and save it with default format (jpg)
- [http://localhost:3000/api/images?filename=encenadaport&width=300&height=300&format=png](http://localhost:3000/api/images?filename=encenadaport&width=300&height=300&format=png): Will resize the original encenadaport image to 300x300 and save it with format png

**Note**: Project has checked for invalid query argument cases such as file does not exist, invalid width, invalid height,...
