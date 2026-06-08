import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CREDENTIALS_DIR = path.join(ROOT, '.credentials');
const OAUTH_CLIENT_PATH = path.join(CREDENTIALS_DIR, 'oauth-client.json');
const OAUTH_TOKEN_PATH = path.join(CREDENTIALS_DIR, 'oauth-token.json');

export const SEO_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
];

const REDIRECT_PORT = 3456;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/oauth2callback`;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getOAuthClientConfig() {
  if (process.env.GOOGLE_OAUTH_CLIENT_JSON) {
    try {
      const raw = JSON.parse(process.env.GOOGLE_OAUTH_CLIENT_JSON);
      return raw.installed ?? raw.web ?? raw;
    } catch {
      return null;
    }
  }
  if (!fs.existsSync(OAUTH_CLIENT_PATH)) {
    return null;
  }
  const raw = readJson(OAUTH_CLIENT_PATH);
  return raw.installed ?? raw.web ?? raw;
}

function getOAuthTokenData() {
  if (process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    return { refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN };
  }
  if (fs.existsSync(OAUTH_TOKEN_PATH)) {
    return readJson(OAUTH_TOKEN_PATH);
  }
  return null;
}

export function hasOAuthToken() {
  return Boolean(getOAuthClientConfig() && getOAuthTokenData());
}

export async function getAuthClient(google) {
  const oauthConfig = getOAuthClientConfig();
  const tokenData = getOAuthTokenData();
  if (oauthConfig && tokenData) {
    const oauth2Client = new google.auth.OAuth2(
      oauthConfig.client_id,
      oauthConfig.client_secret,
      REDIRECT_URI,
    );
    oauth2Client.setCredentials(tokenData);
    return oauth2Client;
  }

  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyFile && fs.existsSync(keyFile)) {
    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: SEO_SCOPES,
    });
    return auth.getClient();
  }

  return null;
}

export async function runOAuthSetup(google) {
  const oauthConfig = getOAuthClientConfig();
  if (!oauthConfig) {
    throw new Error(
      'Missing .credentials/oauth-client.json — create OAuth Desktop client in Google Cloud (see docs/analytics-setup.md).',
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    oauthConfig.client_id,
    oauthConfig.client_secret,
    REDIRECT_URI,
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SEO_SCOPES,
    prompt: 'consent',
  });

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url ?? '/', `http://localhost:${REDIRECT_PORT}`);
      if (url.pathname !== '/oauth2callback') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const authCode = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`OAuth error: ${error}`);
        server.close();
        reject(new Error(error));
        return;
      }
      if (!authCode) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Missing code');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        '<html><body style="font-family:sans-serif;padding:2rem"><h1>Готово</h1><p>Можно закрыть вкладку и вернуться в терминал.</p></body></html>',
      );
      server.close();
      resolve(authCode);
    });

    server.listen(REDIRECT_PORT, () => {
      console.log('\nОткройте в браузере (тот же Google-аккаунт, что в GSC и GA4):\n');
      console.log(authUrl);
      console.log('\nОжидаю подтверждение...\n');
    });

    server.on('error', reject);
  });

  const { tokens } = await oauth2Client.getToken(code);
  fs.mkdirSync(CREDENTIALS_DIR, { recursive: true });
  fs.writeFileSync(OAUTH_TOKEN_PATH, JSON.stringify(tokens, null, 2), 'utf8');
  console.log(`Token saved: ${OAUTH_TOKEN_PATH}`);
}
