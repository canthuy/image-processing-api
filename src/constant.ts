import path from 'path';

const INPUT_DIR = path.resolve(__dirname, '../assets/images');
const OUTPUT_DIR = path.resolve(__dirname, '../assets/thumbnails');
const FORMAT_IMAGE = [
  'avif',
  'dz',
  'fits',
  'gif',
  'heif',
  'input',
  'jpeg',
  'jpg',
  'jp2',
  'jxl',
  'magick',
  'openslide',
  'pdf',
  'png',
  'ppm',
  'raw',
  'svg',
  'tiff',
  'tif',
  'v',
  'webp',
];

export { INPUT_DIR, OUTPUT_DIR, FORMAT_IMAGE };
