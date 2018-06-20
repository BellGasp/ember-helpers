import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';

/**
  @function translate
  @param {EmberObject} object
  @param {String} [locale='en']
  @param {String} [attribute='name']
*/
export function translate([obj, locale = 'en', attribute = 'name']) {
  if (isEmpty(obj)) {
    return '';
  }

  const languages = {
    en: 'english',
    fr: 'french'
  };

  return obj.get(`${languages[locale]}${classify(attribute)}`);
}

export default helper(translate);
