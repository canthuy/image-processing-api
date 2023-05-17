import { FormatEnum } from 'sharp';
import express from 'express';
import { INPUT_DIR, OUTPUT_DIR } from './constant';
import { checkExistFile, getAllImages } from './utilities/file_process';
import {
  validateInput,
  resizeImage,
  ImageInfo,
} from './utilities/image_process';

const app = express();
const port = 3000;

app.get('/', async (req: express.Request, res: express.Response) => {
  const allFileInput = await getAllImages(INPUT_DIR);
  const allFileOutput = await getAllImages(OUTPUT_DIR, true);
  const response = `<h3>Welcome to the basic image processing system.</h3> <br>
   Some image names are available in the system: <ul> ${allFileInput
     .map((filename) => `<li>${filename}</li>`)
     .join('')} </ul>
   - Access the path /images?filename=__filename__ to preview the image. <br>
   Example: <a href='/images?filename=encenadaport'>/images?filename=encenadaport</a><br>
   - Access the path /image?filename=__filename__&width=__width__&height=__height__&format=__format__ <br> to resize the image and save it with the entered format (default is jpg).<br>
   Example: <a href='/images?filename=encenadaport&width=300&height=300&format=png'>/images?filename=encenadaport&width=300&height=300&format=png</a><br>
  <br><br>
  Some image names are saved after processing:
  <ul> ${allFileOutput
    .filter((img, index) => index <= 10)
    .map((filename) => `<li>${filename}</li>`)
    .join('')} </ul>
   `;
  res.send(response);
});

app.get('/images', async (req: express.Request, res: express.Response) => {
  const param: ImageInfo = {
    filename: req.query?.filename as string,
    width: req.query?.width as unknown as number,
    height: req.query?.height as unknown as number,
    format: req.query?.format as keyof FormatEnum,
  };

  const isExistFile = await checkExistFile(
    `${INPUT_DIR}/${param.filename}.jpg`
  );

  if (param.filename && isExistFile && !param.height && !param.width) {
    res.sendFile(`${INPUT_DIR}/${param.filename}.jpg`);
    return;
  }

  const message: string = await validateInput(param);
  if (message) {
    res.send(message);
    return;
  }

  const outputFile = await resizeImage(param);
  res.sendFile(outputFile);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
