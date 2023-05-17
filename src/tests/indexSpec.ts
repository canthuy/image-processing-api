import supertest from 'supertest';
import app from './../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  describe('Test the / endpoint', () => {
    it('get /', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('Test the images endpoint', () => {
    it('get /images', async () => {
      const response = await request.get('/images');
      expect(response.status).toBe(200);
    });

    it('get /images?filename=encenadaport', async () => {
      const response = await request.get('/images?filename=encenadaport');
      expect(response.status).toBe(200);
    });

    it('get /images?filename=encenadaport&height=300&width=300', async () => {
      const response = await request.get(
        '/images?filename=encenadaport&height=300&width=300'
      );
      expect(response.status).toBe(200);
    });

    it('get /images?filename=encenadaport&height=300&width=300&format=png', async () => {
      const response = await request.get(
        '/images?filename=encenadaport&height=300&width=300&format=png'
      );
      expect(response.status).toBe(200);
    });

    it('get /images?filename=encenadaport&height=300', async () => {
      const response = await request.get(
        '/images?filename=encenadaport&height=300'
      );
      expect(response.status).toBe(200);
    });

    it('get /images?filename=encenadaport&height=-300&width=300', async () => {
      const response = await request.get(
        '/images?filename=encenadaport&height=-300&width=300'
      );
      expect(response.status).toBe(200);
    });
  });

  describe('Test endpoint is not defined', () => {
    it('get /city', async () => {
      const response = await request.get('/city');
      expect(response.status).toBe(404);
    });
  });
});
