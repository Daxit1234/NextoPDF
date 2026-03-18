const { execSync } = require('child_process');
const fs = require('fs');
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  fs.writeFileSync('ts-errors-clean.txt', 'Success!');
} catch (e) {
  fs.writeFileSync('ts-errors-clean.txt', (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : ''));
}
