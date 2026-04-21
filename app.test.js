const request = require('supertest');
const app = require('./app');

describe('DevOps Dashboard API', () => {
  
  describe('GET /api/status', () => {
    it('should return JSON status object', async () => {
      const res = await request(app).get('/api/status');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toHaveProperty('pipeline');
      expect(res.body).toHaveProperty('lastDeployment');
      expect(res.body).toHaveProperty('environment');
      expect(res.body).toHaveProperty('dockerImage');
      expect(res.body).toHaveProperty('team');
      expect(Array.isArray(res.body.team)).toBe(true);
    });
  });

  describe('GET /health', () => {
    it('should return OK for health checks', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe('OK');
    });
  });

  describe('GET / (Dashboard)', () => {
    it('should serve the dashboard HTML page', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/html/);
      expect(res.text).toContain('DevOps Dashboard');
      expect(res.text).toContain('ATDD 06');
    });
  });

  describe('Static file serving', () => {
    it('should serve style.css', async () => {
      const res = await request(app).get('/style.css');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toMatch(/css/);
    });
  });

});