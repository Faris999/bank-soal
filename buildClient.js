const args1 = [ 'install' ];
const args2 = [ 'run', 'build' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args1, opts);
require('child_process').spawn('npm', args2, opts);