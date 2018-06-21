import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';

/**
  @function translate
  @param {EmberObject} object
  @param {String} [locale = 'en']
  @param {String} [attr = 'name']
*/
export function translate([obj, locale = 'en', attr = 'name']) {
  if (isEmpty(obj)) {
    return '';
  }

  // TODO: Find a way to give the opportunity to override this language hash.
  // Might wanna give the opportunity to the consumer to provide it in their
  // `environment.js` file.
  const languages = { en: 'english', fr: 'french' };

  return obj.get(`${languages[locale]}${classify(attr)}`);
}

/**
  @class Translate
  @public
*/
export default helper(translate);
