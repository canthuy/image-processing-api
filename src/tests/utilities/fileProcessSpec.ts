import { INPUT_DIR } from '../../constant';
import { checkExistFile, getAllImages } from '../../utilities/file_process';

describe('Test file process', () => {
  it('Test the file exists in the system', async () => {
    const input_path = `${INPUT_DIR}/encenadaport.jpg`;
    const result = await checkExistFile(input_path);
    expect(result).toBeTrue();
  });

  it('Test the file does not exist in the system', async () => {
    const input_path = `${INPUT_DIR}/test.jpg`;
    const result = await checkExistFile(input_path);
    expect(result).toBeFalse();
  });

  it('Get all file in path', async () => {
    const result = await getAllImages(INPUT_DIR);

    expect(result.length > 0).toBeTrue();
  });
});
