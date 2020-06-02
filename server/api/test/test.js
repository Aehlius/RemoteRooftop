import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the user endpoints:', () => {
  it('It should create a user', (done) => {
    const user = {
      email: 'name@mail.com',
      name: 'John',
      surname: 'Doe'
    };
    chai.request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          email: user.email,
          name: user.name,
          surname: user.surname
        });
        done();
      });
  });

  it('It should not create a user with incomplete parameters', (done) => {
    const user = {
      email: 'name@mail.com',
      name: 'Jill'
    };
    chai.request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('email');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('surname');
        done();
      });
  });

  it('It should get a particular user', (done) => {
    const userId = 1;
    chai.request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('surname');
        done();
      });
  });

  it('It should not get a particular user with invalid id', (done) => {
    const userId = 8888;
    chai.request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find user with the id ${userId}`);
        done();
      });
  });

  it('It should not get a particular user with non-numeric id', (done) => {
    const userId = 'aaa';
    chai.request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a user', (done) => {
    const userId = 1;
    const updatedUser = {
      id: userId,
      email: 'updatedName@mail.com',
      name: 'Johnathan',
      surname: 'Doer'
    };
    chai.request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedUser.id);
        expect(res.body.data.email).equal(updatedUser.email);
        expect(res.body.data.name).equal(updatedUser.name);
        expect(res.body.data.surname).equal(updatedUser.surname);
        done();
      });
  });

  it('It should not update a user with invalid id', (done) => {
    const userId = '9999';
    const updatedUser = {
        id: userId,
        email: 'updatedName@mail.com',
        name: 'Johnathan',
        surname: 'Doer'
    };
    chai.request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find user with the id: ${userId}`);
        done();
      });
  });

  it('It should not update a user with non-numeric id value', (done) => {
    const userId = 'ggg';
    const updatedUser = {
        id: userId,
        email: 'updatedName@mail.com',
        name: 'Johnathan',
        surname: 'Doer'
    };
    chai.request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete a user', (done) => {
    const userId = 1;
    chai.request(app)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a user with invalid id', (done) => {
    const userId = 777;
    chai.request(app)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`User with the id ${userId} cannot be found`);
        done();
      });
  });

  it('It should not delete a user with non-numeric id', (done) => {
    const userId = 'bbb';
    chai.request(app)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});