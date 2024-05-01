// settings.js

const i18nSettings = {
  defaultLocale: 'zh',
  locales: ['zh', 'en', 'zh-Hant'],
};

module.exports = i18nSettings;



// someOtherFile.js

const i18nSettings = require('./settings');

// usage of i18nSettings in the code
