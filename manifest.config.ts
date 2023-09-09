import { defineManifest } from '@crxjs/vite-plugin';

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'chrome-tabs',
  description: 'chrome extension',
  version: '0.0.1',
  action: {
    default_popup: 'index.html',
  },
  permissions: ['history', 'tabs'],
  commands: {
    'open-popup': {
      suggested_key: {
        default: 'Ctrl+Shift+A',
        mac: 'Command+Shift+A',
      },
      description: 'Open Extension Popup',
    },
  },
});
