/*
 * @Author: 李淳
 * @Date: 2020-06-08 10:40:06
 * @LastEditors: 李淳
 * @LastEditTime: 2020-06-23 21:42:10
 * @Description:
 * * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const zhLocaleData = require('react-intl/locale-data/zh');
const config = require('./configs/base.conf').i18nConf;

const enTranslationMessages = require('./translations/en-US.json');
const zhTranslationMessages = require('./translations/zh-CN.json');

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

const DEFAULT_LOCALE = config.defaultLocale;
const appLocales = config.locales;

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  'en-US': formatTranslationMessages('en-US', enTranslationMessages),
  'zh-CN': formatTranslationMessages('zh-CN', zhTranslationMessages),
};

const getFormattedMessages = (
  locale = DEFAULT_LOCALE,
  key,
  messageDescriptor,
) => {
  const messages = translationMessages[locale];
  if (messages) {
    if (messages[key]) {
      return messages[key];
    }
    if (messageDescriptor && messageDescriptor.defaultMessage) {
      return messageDescriptor.defaultMessage;
    }
    return '';
  }
  return key;
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
exports.getFormattedMessages = getFormattedMessages;
