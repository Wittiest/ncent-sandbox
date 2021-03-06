const db = require('../../../server/models')
const TokenType = db.TokenType;
const Transaction = db.Transaction;
const StellarSdk = require('stellar-sdk');

describe('TokenType model', async () => {
  let tokenType;
  let tokenTypeTemplate;

  beforeEach(async (done) => {
    const keypair = StellarSdk.Keypair.random();
    tokenTypeTemplate = {
      name: 'tokenName',
      expiryDate: '2020',
      sponsorUuid: keypair.publicKey(),
      totalTokens: 10000,
    };
    tokenType = await TokenType.create(tokenTypeTemplate);
    done();
  });

  afterEach(async (done) => {
    await Transaction.destroy({where: {}});
    await TokenType.destroy({where: {}});
    done();
  });

  it('returns an instance with correct properties', async (done) => {
    expect(typeof tokenType).toBe('object');
    expect(tokenType.name).toBe(tokenTypeTemplate.name);
    expect(tokenType.expiryDate.getTime()).toBe(
      new Date(tokenTypeTemplate.expiryDate).getTime()
    );
    expect(typeof tokenType.uuid).toBe('string');
    expect(tokenType.sponsorUuid).toBe(tokenTypeTemplate.sponsorUuid);
    expect(tokenType.totalTokens).toBe(tokenTypeTemplate.totalTokens);
    done();
  });

  it ('persists the created TokenType', async (done) => {
    const retrievedToken = await TokenType.findById(tokenType.uuid);
    expect(retrievedToken).not.toBe(undefined);
    done();
  });
});
