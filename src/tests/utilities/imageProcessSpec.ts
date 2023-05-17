import { checkExistFile } from '../../utilities/file_process';
import {
  validateInput,
  resizeImage,
  ImageInfo,
} from '../../utilities/image_process';

describe('Test image process', () => {
  describe('Test validate', () => {
    it('File name is  undefined', async () => {
      const request: ImageInfo = {
        filename: undefined,
      };

      const result = await validateInput(request);
      expect(result !== '').toBeTrue();
    });

    it('File name does not exist', async () => {
      const request: ImageInfo = {
        filename: 'test',
      };

      const result = await validateInput(request);
      expect(result !== '').toBeTrue();
    });

    it('Invalid height', async () => {
      const request: ImageInfo = {
        filename: 'encenadaport',
        height: -100,
        width: 100,
      };

      const result = await validateInput(request);
      expect(result !== '').toBeTrue();
    });

    it('Invalid width', async () => {
      const request: ImageInfo = {
        filename: 'encenadaport',
        height: 100,
        width: -100,
      };

      const result = await validateInput(request);
      expect(result !== '').toBeTrue();
    });

    it('Valid request', async () => {
      const request: ImageInfo = {
        filename: 'encenadaport',
        height: 300,
        width: 300,
      };

      const result = await validateInput(request);
      expect(!result).toBeTrue();
    });
  });

  describe('Test resize image using sharp', () => {
    it('resize success', async () => {
      const request: ImageInfo = {
        filename: 'fjord',
        height: 300,
        width: 300,
      };

      const result = await resizeImage(request);
      console.log(result);

      const isExistFile = await checkExistFile(result);

      expect(isExistFile).toBeTrue();
    });
  });
});
