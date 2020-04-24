const request = require('supertest');
const server = require('./server');

describe('Server running', () => {
    describe('GET /', () => {
        it('returns 200 OK - type is json', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.type).toMatch(/json/i);
            });
        });
    });

    describe('GET Users /', () => {
        it('returns array of users', async () => {
            const expected = [{ name: 'Idong' }];
            const res = await request(server).get('/users');
            expect(res.body).toEqual(expect.arrayContaining(expected));
            expect(res.body.length).toEqual(3);
        });
    });

    describe('POST Users /', () => {
        it('returns user added successfully', async () => {
            const newUser = { name: 'Essence' };
            const res =  await request(server).post('/users').send(newUser);
            expect(res.status).toBe(201);
            const expected = [{ name: 'Essence' }];
            const nextres = await request(server).get('/users');
            expect(nextres.body).toEqual(expect.arrayContaining(expected));
        });

        it('POST req checks for data missing', async () => {
            const  res = await request(server).post('/users');
            expect(res.status).toBe(401);
        });
    });

    describe('Delete User', () => {
        it('returns user successfully deleted and checks new length', async () => {
            const delUser = { name: 'Idong' };
            const res = await request(server).delete('/users').send(delUser);

            expect(res.status).toBe(201);
            const expected = [{ name: 'Idong' }];
            const newres = await request(server).get('/users');
            expect(newres.body).toEqual(expect.not.arrayContaining(expected));
        });

        it('Delete request and checks if no user', async () => {
            const res = await request(server).delete('/users');
            expect(res.status).toBe(401);
        });
    });
});