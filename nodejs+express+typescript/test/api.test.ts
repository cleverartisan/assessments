import chai, { expect } from 'chai';
import  { describe, after } from 'mocha';
import server, { shutdownServer } from '../src';
import { ClientRec } from '../src/types/clientrec';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Endpoints', () => {
  const data = { data: "JOHN0000MICHAEL0009994567" }
  describe('/api/v1/parse', () => {
    it('it should POST a payload and receive raw output data.', (done) => {
      chai.request(server)
        .post('/api/v1/parse')
        .send(data)
        .end((err, response) => {
          expect(response).to.have.property('status').to.equal(200);
          expect(response).to.have.property('body');
          if (response.body) {
            expect(response.body).to.have.property('statusCode').that.equals(200);
            expect(response.body).to.have.property('data');
            if (response.body.data) {
              expect(response.body.data).to.have.property('firstName').that.equals('JOHN0000');
              expect(response.body.data).to.have.property('lastName').that.equals('MICHAEL000');
              expect(response.body.data).to.have.property('clientId').that.equals('9994567');
            }
          }
          done();
        });
    });
  });

  describe('/api/v2/parse', () => {
    it('it should POST a payload and receive formated output data.', (done) => {
      chai.request(server)
        .post('/api/v2/parse')
        .send(data)
        .end((err, response) => {
          expect(response).to.have.property('status').to.equal(200);
          expect(response).to.have.property('body');
          if (response.body) {
            expect(response.body).to.have.property('statusCode').that.equals(200);
            expect(response.body).to.have.property('data');
            if (response.body.data) {
              expect(response.body.data).to.have.property('firstName').that.equals('JOHN');
              expect(response.body.data).to.have.property('lastName').that.equals('MICHAEL');
              expect(response.body.data).to.have.property('clientId').that.equals('999-4567');
            }
          }
          done();
        });
    });
  });

  after(done => {
    shutdownServer();
    done();
  });
})