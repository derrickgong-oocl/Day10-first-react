const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['simple-demo.jsx'],
  bundle: true,
  outfile: 'dist/simple-demo.js',
  format: 'iife',
  jsx: 'transform',
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  minify: false,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"development"'
  }
}).then(() => {
  console.log('Simple demo compiled successfully!');
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
}); 