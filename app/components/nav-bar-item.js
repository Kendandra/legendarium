import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'div',
    classNames: ['nav-link'],

    shouldCollaspeSubmenu: false,

    submenuCollaseClass: computed('shouldCollaspeSubmenu', function () {
        let shouldCollaspe = this.get('shouldCollaspeSubmenu');
        if (shouldCollaspe) {
            return 'collasped'
        }
        else {
            return '';
        }
    }),

    actions: {
        collaspe() {
            let value = this.get('shouldCollaspeSubmenu');
            this.set('shouldCollaspeSubmenu', !value);
        }
    }
});