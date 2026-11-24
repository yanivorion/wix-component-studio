#!/usr/bin/env node
// Builds the "New" collection: library-src/new-collection*/*.js ->
// public/library/new-collection.json (code) + entries in public/components-library.json.
// The collection and category come from the MANIFEST type prefix (Scrub.X, Gallery.X, ...).

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CODE_FILE = 'library/new-collection.json';
const INDEX = path.join(ROOT, 'public', 'components-library.json');

// one source folder per wave; entries carry their wave so the library can show "Latest"
const WAVES = [
  { wave: 1, dir: path.join(ROOT, 'library-src', 'new-collection') },
  { wave: 2, dir: path.join(ROOT, 'library-src', 'new-collection-2') },
  { wave: 3, dir: path.join(ROOT, 'library-src', 'new-collection-3') },
];

const PREFIX = {
  Hero:        { collection: 'Heroes',              category: 'Heroes, CTAs & Banners' },
  Scrub:       { collection: 'Scroll Scrub',        category: 'Scroll & Motion Experiences' },
  Reveal:      { collection: 'Scroll Reveals',      category: 'Scroll & Motion Experiences' },
  Compose:     { collection: 'Scroll Compositions', category: 'Scroll & Motion Experiences' },
  Gallery:     { collection: 'Galleries',           category: 'Galleries, Carousels & Slideshows' },
  Section:     { collection: 'Sections',            category: 'Page Sections & Layout' },
  Interaction: { collection: 'Interactions',        category: 'Backgrounds, Cursors & Buttons' },
  Accordion:   { collection: 'Accordions',          category: 'Accordions & FAQ' },
  Type:        { collection: 'Typography',          category: 'Typography & Text Effects' },
  Creative:    { collection: 'Creative',            category: 'Generative & Simulation Visuals' },
};

function writeAtomic(file, text) {
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, file);
}

const files = WAVES.flatMap(({ wave, dir }) => (fs.existsSync(dir) ? fs.readdirSync(dir) : [])
  .filter(f => f.endsWith('.js')).sort().map(f => ({ f, wave, dir })));
const code = {};
const entries = [];
const problems = [];

for (const { f, wave, dir } of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  // same extraction the studio uses, so a MANIFEST that parses here parses there
  const m = src.match(/const\s+MANIFEST\s*=\s*({[\s\S]*?});/);
  if (!m) { problems.push(`${f}: no MANIFEST`); continue; }
  let manifest;
  try { manifest = eval('(' + m[1] + ')'); } catch (e) { problems.push(`${f}: MANIFEST does not parse (${e.message})`); continue; }
  if (!/function\s+Component\s*\(/.test(src)) problems.push(`${f}: no function Component`);
  const type = manifest.type || '';
  const [prefix, name] = type.split('.');
  const group = PREFIX[prefix];
  if (!group || !name) { problems.push(`${f}: type "${type}" must be <${Object.keys(PREFIX).join('|')}>.<Name>`); continue; }
  const data = (manifest.editorElement && manifest.editorElement.data) || {};
  const nonString = Object.keys(data).filter(k => typeof data[k].defaultValue !== 'string');
  if (nonString.length) problems.push(`${f}: non-string defaultValue for ${nonString.join(', ')}`);
  const id = `new-${prefix}-${name}`.toLowerCase();
  if (code[id]) problems.push(`${f}: duplicate type ${type}`);
  code[id] = src;
  entries.push({
    id,
    name,
    displayName: (manifest.editorElement && manifest.editorElement.displayName) || name,
    description: manifest.description || '',
    category: group.category,
    subcategory: group.collection,
    type,
    props: Object.keys(data).length,
    thumbnail: null,
    file: CODE_FILE,
    isNew: true,
    collection: group.collection,
    wave,
  });
}

const order = Object.values(PREFIX).map(p => p.collection);
entries.sort((a, b) => b.wave - a.wave || order.indexOf(a.collection) - order.indexOf(b.collection) || a.name.localeCompare(b.name));

writeAtomic(path.join(ROOT, 'public', CODE_FILE), JSON.stringify(code));
const index = JSON.parse(fs.readFileSync(INDEX, 'utf8')).filter(c => c.file !== CODE_FILE);
writeAtomic(INDEX, JSON.stringify([...index, ...entries], null, 1)); // matches the file's existing format

console.log(`new collection: ${entries.length} components -> public/${CODE_FILE}`);
entries.forEach(e => console.log(`  ${e.id.padEnd(40)} ${String(e.props).padStart(3)} props  ${e.collection}`));
if (problems.length) {
  console.error('\nProblems:\n  ' + problems.join('\n  '));
  process.exitCode = 1;
}
