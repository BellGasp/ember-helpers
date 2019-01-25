import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | translate', function(hooks) {
  setupRenderingTest(hooks);

  test('it translates using the default locale and default attribute', async function(assert) {
    this.set('value', new EmberObject({ englishName: 'John' }));

    await render(hbs`{{translate value}}`);

    assert.equal(this.element.textContent.trim(), 'John');
  });

  test('it translates using a provided locale and a default attribute', async function(assert) {
    this.set('locale', 'fr');
    this.set('value', new EmberObject({ frenchName: 'Jean' }));

    await render(hbs`{{translate value locale}}`);

    assert.equal(this.element.textContent.trim(), 'Jean');
  });

  test('it translates using a provided locale and attribute', async function(assert) {
    this.set('locale', 'en');
    this.set('attr', 'placeholder');
    this.set('value', new EmberObject({ englishPlaceholder: 'Phone' }));

    await render(hbs`{{translate value locale attr}}`);

    assert.equal(this.element.textContent.trim(), 'Phone');
  });

  test('it recomputes the value when the provided locale changes', async function(assert) {
    this.set('locale', 'en');
    this.set('value', new EmberObject({ englishName: 'John', frenchName: 'Jean' }));

    await render(hbs`{{translate value locale}}`);

    assert.equal(this.element.textContent.trim(), 'John');

    this.set('locale', 'fr');

    assert.equal(this.element.textContent.trim(), 'Jean');
  });

  test('it recomputes the value when the provided locale changes with a custom attribute', async function(assert) {
    this.set('locale', 'en');
    this.set('attr', 'placeholder');
    this.set('value', new EmberObject({
      englishPlaceholder: 'Phone',
      frenchPlaceholder: 'Téléphone'
    }));

    await render(hbs`{{translate value locale attr}}`);

    assert.equal(this.element.textContent.trim(), 'Phone');

    this.set('locale', 'fr');

    assert.equal(this.element.textContent.trim(), 'Téléphone');
  });

  test('it recomputes when the target property of the object changes', async function (assert) {
    this.setProperties({
      locale: 'en',
      attr: 'placeholder',
      value: EmberObject.create({
        englishPlaceholder: 'Phone',
        frenchPlaceholder: 'Téléphone'
      })
    });

    await render(hbs`{{translate value locale attr}}`);

    assert.equal(this.element.textContent.trim(), 'Phone');

    this.set('value.englishPlaceholder', 'Pog');

    assert.equal(this.element.textContent.trim(), 'Pog');

    this.set('value.englishPlaceholder', 'Champion');

    assert.equal(this.element.textContent.trim(), 'Champion');
  });
});
