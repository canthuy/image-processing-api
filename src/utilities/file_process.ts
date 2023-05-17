import { promises as fs } from 'fs';
import path from 'path';

const checkExistFile = async (inputPath: string) => {
  try {
    await fs.access(inputPath);
    return true;
  } catch (error) {
    return false;
  }
};

const getAllImages = async (
  inputPath: string,
  hasExtension: boolean = false
): Promise<string[]> => {
  try {
    const filenames = (await fs.readdir(inputPath)).map((fileName) => {
      const extension = hasExtension ? undefined : path.extname(fileName);
      return path.basename(fileName, extension);
    });
    return filenames;
  } catch (error) {
    return [];
  }
};

export { checkExistFile, getAllImages };
