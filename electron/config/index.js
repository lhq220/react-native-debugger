import fs from 'fs';
import path from 'path';
import json5 from 'json5';
import template from './template';

const filePath = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  '.rndebuggerrc'
);

export default function readConfig(configFile = filePath) {
  if (!fs.existsSync(configFile)) {
    // Create a new one
    fs.writeFileSync(configFile, template);
    return { config: json5.parse(template) };
  }
  try {
    // eslint-disable-next-line
    return { config: json5.parse(fs.readFileSync(configFile, 'utf-8')) };
  } catch (e) {
    // Alert parse config not successful
    return { config: json5.parse(template), isConfigBroken: true };
  }
}
