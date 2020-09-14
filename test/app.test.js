const assert = require('assert').strict;
const axios = require('axios');
const url = require('url');
const app = require('../src/app');

const port = app.get('port') || 8998;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('Feathers application tests', () => {
  let server;

  // eslint-disable-next-line no-undef
  before(done => {
    server = app.listen(port);
    server.once('listening', () => done());
  });

  // eslint-disable-next-line no-undef
  after(done => {
    server.close(done);
  });

  describe('GitHub OAuth login', () => {

    it('The GitHub OAuth login page loads', async () => {
      const response = await axios.get(getUrl('oauth/github'));

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
      assert.equal(response.headers.server, 'GitHub.com');
      assert.ok(response.data.indexOf('Sign in to GitHub') !== -1);
    });

  });

  it('starts and shows the index page', async () => {
    const { data } = await axios.get(getUrl());

    assert.ok(data.indexOf('<html lang="en">') !== -1);
  });

  describe('404 HTML status code responses', () => {
    it('shows a 404 HTML page', async () => {
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            'Accept': 'text/html'
          }
        });
        assert.fail('should never get here');
      } catch (error) {
        const { response } = error;

        assert.equal(response.status, 404);
        assert.ok(response.data.indexOf('<html>') !== -1);
      }
    });

    it('shows a 404 JSON error without stack trace', async () => {
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          json: true
        });
        assert.fail('should never get here');
      } catch (error) {
        const { response } = error;

        assert.equal(response.status, 404);
        assert.equal(response.data.code, 404);
        assert.equal(response.data.message, 'Page not found');
        assert.equal(response.data.name, 'NotFound');
      }
    });
  });
});
