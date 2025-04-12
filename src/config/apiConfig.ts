import * as path from 'path';
import * as fs from 'fs';

export const globalConfig = {
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',
  timeout: 30000,
};

export function getApiKey(): string {
  const keyPath = path.join(process.cwd(), '.keys', 'api_key.txt');
  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, 'utf8').trim();
  }
  return process.env.API_KEY || '';
}
