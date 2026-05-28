import { spawn } from 'node:child_process';
import process from 'node:process';

const isWindows = process.platform === 'win32';
const commands = [
  {
    name: 'streamlit',
    command: isWindows ? '.venv\\Scripts\\streamlit.exe' : '.venv/bin/streamlit',
    args: ['run', 'app.py', '--server.port', '8501', '--server.headless', 'true'],
  },
  {
    name: 'next',
    command: isWindows ? '.\\node_modules\\.bin\\next.cmd' : './node_modules/.bin/next',
    args: ['dev', '-p', '3001'],
  },
];

const children = [];
let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM');
  }

  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) child.kill('SIGKILL');
    }
    process.exit(code);
  }, 4000).unref();
}

for (const entry of commands) {
  const child = spawn(entry.command, entry.args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
    shell: false,
  });

  children.push(child);

  child.stdout.on('data', (chunk) => {
    process.stdout.write(`[${entry.name}] ${chunk}`);
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(`[${entry.name}] ${chunk}`);
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) return;

    const exitCode = code ?? 1;
    const reason = signal ? `signal ${signal}` : `code ${exitCode}`;
    console.error(`[${entry.name}] exited with ${reason}`);
    shutdown(exitCode);
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
