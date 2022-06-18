import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function initFixture(name) {
  const fixtureDir = path.join(__dirname, '..', '..', 'fixtures', name)
  process.chdir(fixtureDir)
}


export default initFixture
