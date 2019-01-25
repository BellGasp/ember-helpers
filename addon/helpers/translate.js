import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';

/**
  @class Translate
  @public
*/
export default Helper.extend({

  /**
    @function compute
    @param {EmberObject} obj
    @param {String} [locale = 'en']
    @param {String} [attr = 'name']
  */
  compute([obj, locale = 'en', attr = 'name']) {
    if (isEmpty(obj)) {
      return '';
    }

    // TODO: Find a way to give the opportunity to override this language hash.
    // Might wanna give the opportunity to the consumer to provide it in their
    // `environment.js` file.
    const languages = { en: 'english', fr: 'french' };

    const key = `${languages[locale]}${classify(attr)}`;

    this.set('obj', obj);

    this.addObserver(`obj.${key}`, this, () => this.recompute());

    return obj.get(key);
  },

});
