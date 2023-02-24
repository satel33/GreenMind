/* eslint-disable camelcase */
import { extend } from 'vee-validate';
import { min, email, required, digits, max, confirmed } from 'vee-validate/dist/rules';
import { Plugin } from '@nuxt/types';

const veeValidatePlugin : Plugin = ({ i18n }) => {
  extend('min', {
    ...min,
    message: (fieldName, placeholders) => `${i18n.t('This field must have be')} ${placeholders.length} ${i18n.t('digits')}`
  });

  extend('max', {
    ...max,
    message: (fieldName, placeholders) => `${i18n.t('This field must have be')} ${placeholders.length}`
  });

  extend('confirmed', {
    ...confirmed,
    message: field => i18n.t('This field must have be checked').toString()
  });

  extend('email', {
    ...email,
    message: i18n.t('This field must be an email')?.toString()
  });

  extend('digits', {
    ...digits,
    message: (fieldName, placeholders) => `${i18n.t('This field must have')} ${placeholders.length} ${i18n.t('digits')}`
  });

  extend('required', {
    ...required,
    message: i18n.t('This field is required.')?.toString()
  });

};

export default veeValidatePlugin;
