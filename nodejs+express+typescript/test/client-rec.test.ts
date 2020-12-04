import chai, { expect } from 'chai';
import  { describe, beforeEach } from 'mocha';
import { ClientRec } from '../src/types/clientrec';

describe('ClientRec', () => {
  const clientRec = new ClientRec();
  describe('Constructor', () => {
    it('it should have empty strings for all members.', (done) => {
      expect(clientRec).to.have.property('clientId').to.be.an('array').that.is.empty;
      expect(clientRec).to.have.property('firstName').to.equal('');
      expect(clientRec).to.have.property('lastName').to.equal('');
      done();
    });

    it('it should have segmented clientRec.clientId strings for all members.', (done) => {
      clientRec.firstName = 'JOHN0000';
      clientRec.lastName = 'MICHAEL000';
      clientRec.clientId = ['999', '4567'];

      expect(clientRec).to.have.property('clientId').to.be.an('array').that.include.members(['999', '4567']);
      expect(clientRec).to.have.property('firstName').to.equal('JOHN0000');
      expect(clientRec).to.have.property('lastName').to.equal('MICHAEL000');
      done();
    });
  });

  describe('ClientRec.toClientRec - clientId output formats', () => {
    it('it should have a non-formated client id.', (done) => {
      const crFormated = clientRec.toClientRec('');
      expect(crFormated).to.have.property('clientId').to.equal('9994567');
      done();
    });

    it('it should have a formated client id.', (done) => {
      const crFormated = clientRec.toClientRec('-');
      expect(crFormated).to.have.property('clientId').to.equal('999-4567');
      done();
    });
  });

  describe('ClientRec.trimPadding', () => {
    it('it should have a formated client id plus 0s removed from name segments.', (done) => {
      clientRec.trimPadding();
      expect(clientRec).to.have.property('firstName').to.equal('JOHN');
      expect(clientRec).to.have.property('lastName').to.equal('MICHAEL');
      done();
    });
  })
})