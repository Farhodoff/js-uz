const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'src', 'data', 'lessons', 'react');
const mdDir = path.join(__dirname, 'temp_md');

const files = [
  'step1_setup', 'step2_jsx', 'step3_components', 'step4_props',
  'step5_state', 'step6_events', 'step7_hooks', 'step8_lists',
  'step9_forms', 'step10_routing', 'step11_context', 'step12_api',
  'step13_advanced_hooks', 'step14_class_components_and_errors'
];

files.forEach(basename => {
  const jsPath = path.join(jsDir, `${basename}.js`);
  const mdPath = path.join(mdDir, `${basename}.md`);

  if (!fs.existsSync(jsPath) || !fs.existsSync(mdPath)) {
    console.error(`Missing file for ${basename}`);
    return;
  }

  let jsContent = fs.readFileSync(jsPath, 'utf8');
  const mdContent = fs.readFileSync(mdPath, 'utf8');

  const startIndex = jsContent.indexOf('content: `');
  const nextPropIndex = jsContent.indexOf('`,\n  code:');

  if (startIndex === -1 || nextPropIndex === -1) {
    console.error(`Could not find content block boundaries in ${basename}.js`);
    return;
  }

  const startStr = startIndex + 'content: `'.length;
  
  // Escape backticks in the new Markdown content
  // Note: we might also need to escape ${} if we want to be fully safe, 
  // because JS template literals interpolate ${}.
  // Let's replace unescaped ${ with \${
  let safeMd = mdContent.replace(/(?<!\\)`/g, '\\`');
  safeMd = safeMd.replace(/(?<!\\)\$\{/g, '\\${');

  // Also replace a single $ if it's followed by {
  // The regex above handles it.

  jsContent = jsContent.substring(0, startStr) + '\n' + safeMd + '\n' + jsContent.substring(nextPropIndex);

  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log(`Injected and escaped new content into ${basename}.js`);
});
