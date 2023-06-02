/* eslint-disable arrow-parens */
/* eslint-disable no-restricted-syntax */
/**
 * This script will extract the internationalization messages from all components
 * and package them in the translation json files in the translations file.
 */

require('shelljs/global');

const fs = require('fs');
const nodeGlob = require('glob');
const { transform } = require('@babel/core');
const get = require('lodash/get');

const animateProgress = require('./helpers/progress');
const addCheckmark = require('./helpers/checkmark');

const { appLocales, DEFAULT_LOCALE } = require('../../src/i18n');

// const babel = require('../../babel2.config.js');
// const { presets } = babel;
const presets = [
  [
    '@babel/preset-env',
    { modules: false }
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];
// console.log(presets);
let plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-optional-chaining',
  'react-intl'
];

// plugins.push('react-intl');

// NOTE: styled-components plugin is filtered out as it creates errors when used with transform
// plugins = plugins.filter(p => p !== 'styled-components');
console.log(plugins);
// Glob to match all js files except test files
const FILES_TO_PARSE = 'src/**/{m,M}essage?(s).ts';

const ConstStr = 'constants.ts';

const newLine = () => process.stdout.write('\n');

// Progress Logger
let progress;
const task = message => {
  progress = animateProgress(message);
  process.stdout.write(message);

  return error => {
    if (error) {
      process.stderr.write(error);
    }
    clearTimeout(progress);
    return addCheckmark(() => newLine());
  };
};

// Wrap async functions below into a promise
const glob = pattern => new Promise((resolve, reject) => {
  nodeGlob(
    pattern,
    (error, value) => (error ? reject(error) : resolve(value)),
  );
});

const readFile = fileName => new Promise((resolve, reject) => {
  fs.readFile(
    fileName,
    'utf8',
    (error, value) => (error ? reject(error) : resolve(value)),
  );
});

// Store existing translations into memory
const oldLocaleMappings = [];
const localeMappings = [];

// Loop to run once per locale
for (const locale of appLocales) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  // File to store translation messages into
  const translationFileName = `src/translations/${locale}.json`;
  try {
    // Parse the old translation message JSON files
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    const messageKeys = Object.keys(messages);
    for (const messageKey of messageKeys) {
      oldLocaleMappings[locale][messageKey] = messages[messageKey];
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `There was an error loading this translation file: ${translationFileName}
        \n${error}`,
      );
    }
  }
}

const extractFromFile = async filename => {
  try {
    const conFilePathArr = filename.split('/');
    conFilePathArr.pop();
    const conFilePath = `${conFilePathArr.join('/')}/${ConstStr}`;
    let nameSpaceCode = '';
    if(fs.existsSync(`${process.cwd()}/${conFilePath}`)) {
      nameSpaceCode = await readFile(conFilePath);
    }
    const code = await readFile(filename);
    const newCode = code.replace(/import[^']+'[^']*constants'/, '//');
    const output = await transform(nameSpaceCode + newCode, { filename, presets, plugins });
    const messages = get(output, 'metadata.react-intl.messages', []);


    for (const message of messages) {
      for (const locale of appLocales) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        const oldDefaultLocalText= oldLocaleMappings[DEFAULT_LOCALE][message.id];
        // Merge old translations into the babel extracted instances where react-intl is used
        // let newMsg = (locale === DEFAULT_LOCALE ? message.defaultMessage : oldLocaleMapping) || message.defaultMessage;
        let newMsg;
        if(locale === DEFAULT_LOCALE) {
          // 以兜底文案为准
          newMsg = message.defaultMessage;
        } else {
          if(message.defaultMessage !== oldDefaultLocalText) {
            newMsg = message.defaultMessage
          }
          newMsg = (message.defaultMessage !== oldDefaultLocalText ? message.defaultMessage : oldLocaleMapping)
        }
        localeMappings[locale][message.id] = newMsg;
      }
    }

  } catch (error) {
    process.stderr.write(`\nError transforming file: ${filename}\n${error}\n`);
  }
};

const memoryTask = glob(FILES_TO_PARSE);
const memoryTaskDone = task('Storing language files in memory');

memoryTask.then(files => {
  memoryTaskDone();

  const extractTask = Promise.all(
    files.map(fileName => extractFromFile(fileName)),
  );
  const extractTaskDone = task('Run extraction on all files');
  // Run extraction on all files that match the glob on line 16
  extractTask.then(() => {
    extractTaskDone();

    // Make the directory if it doesn't exist, especially for first run
    mkdir('-p', 'src/translations'); // eslint-disable-line

    let localeTaskDone;
    let translationFileName;

    for (const locale of appLocales) {
      translationFileName = `src/translations/${locale}.json`;
      localeTaskDone = task(
        `Writing translation messages for ${locale} to: ${translationFileName}`,
      );

      // Sort the translation JSON file so that git diffing is easier
      // Otherwise the translation messages will jump around every time we extract
      const messages = {};
      Object.keys(localeMappings[locale])
        .sort()
        .forEach(key => {
          messages[key] = localeMappings[locale][key];
        });

      // Write to file the JSON representation of the translation messages
      const prettified = `${JSON.stringify(messages, null, 2)}\n`;

      try {
        fs.writeFileSync(translationFileName, prettified);
        localeTaskDone();
      } catch (error) {
        localeTaskDone(
          `There was an error saving this translation file: ${translationFileName}
          \n${error}`,
        );
      }
    }

    process.exit();
  });
});
