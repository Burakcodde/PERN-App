const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/db');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register and login a user to get a token
  await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      password: 'testpassword',
    });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'testuser',
      password: 'testpassword',
    });

  token = res.body.token;
});

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Task',
        completed: false,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Task');
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a task', async () => {
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task to Update',
        completed: false,
      });

    const res = await request(app)
      .put(`/api/tasks/${taskRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Task',
        completed: true,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Task');
    expect(res.body).toHaveProperty('completed', true);
  });

  it('should delete a task', async () => {
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task to Delete',
        completed: false,
      });

    const res = await request(app)
      .delete(`/api/tasks/${taskRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });
});