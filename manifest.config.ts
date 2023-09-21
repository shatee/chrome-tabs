import { defineManifest } from '@crxjs/vite-plugin';

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'chrome-tabs',
  description: 'chrome extension',
  version: '0.0.1',
  action: {
    default_popup: 'index.html',
  },
  permissions: ['history', 'tabs', 'storage'],
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Ctrl+Shift+S',
        mac: 'Command+Shift+S',
      },
      description: 'Open Extension Popup',
    },
  },
});
