import sharp, { FormatEnum } from 'sharp';
import { FORMAT_IMAGE, INPUT_DIR, OUTPUT_DIR } from '../constant';
import { checkExistFile } from './file_process';

interface ImageInfo {
  filename?: string;
  width?: number;
  height?: number;
  format?: keyof FormatEnum;
}

const validateInput = async (reqImage: ImageInfo) => {
  if (reqImage.filename === undefined) {
    return 'Please enter the file name using the syntax ?filename=... after endpoint.';
  }
  const isExistFile = await checkExistFile(
    `${INPUT_DIR}/${reqImage.filename}.jpg`
  );
  if (!isExistFile) {
    return 'The file name does not exist. Please choose another filename.';
  }

  if (
    !reqImage.width ||
    !Number(reqImage.width) ||
    (reqImage.width && reqImage.width <= 0)
  ) {
    return 'Please provide a number greater than 0 for the "width" query.';
  }

  if (
    !reqImage.height ||
    !Number(reqImage.height) ||
    (reqImage.height && reqImage.height <= 0)
  ) {
    return 'Please provide a number greater than 0 for the "height" query.';
  }

  if (reqImage.format && !FORMAT_IMAGE.includes(reqImage.format)) {
    return 'Incorrect format for the image.';
  }

  return '';
};

const resizeImage = async (reqImage: ImageInfo): Promise<string> => {
  const filenameOutput = `${OUTPUT_DIR}/${reqImage.filename}_${
    reqImage.width
  }x${reqImage.height}.${reqImage.format || 'jpg'}`;

  const isExistFile = await checkExistFile(filenameOutput);
  if (isExistFile) {
    return filenameOutput;
  }

  const res = await sharp(`${INPUT_DIR}/${reqImage.filename}.jpg`)
    .resize(Number(reqImage.width), Number(reqImage.height))
    .toFormat(reqImage.format || 'jpg')
    .toFile(filenameOutput)
    .then(() => {
      return filenameOutput;
    })
    .catch((err) => {
      return err;
    });

  return res;
};

export { ImageInfo, validateInput, resizeImage };
