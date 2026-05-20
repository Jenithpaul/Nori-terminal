import fs from 'fs';
import path from 'path';

const files = [
  path.join('dist', 'client', 'wrangler.json'),
  path.join('dist', 'server', 'wrangler.json')
];

const keysToRemove = [
  'triggers',
  'definedEnvironments',
  'ai_search_namespaces',
  'ai_search',
  'secrets_store_secrets',
  'artifacts',
  'unsafe_hello_world',
  'flagship',
  'worker_loaders',
  'ratelimits',
  'vpc_services',
  'vpc_networks',
  'python_modules'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const data = JSON.parse(content);
      
      // Clean up keys
      for (const key of keysToRemove) {
        delete data[key];
      }
      
      // Clean up dev field keys
      if (data.dev) {
        delete data.dev.enable_containers;
        delete data.dev.generate_types;
      }
      
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Cleaned up wrangler configuration: ${file}`);
    } catch (err) {
      console.error(`Failed to clean ${file}:`, err);
    }
  } else {
    console.log(`File not found, skipping: ${file}`);
  }
}
