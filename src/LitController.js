import { LitElement } from 'lit-element';

/**
 * @class LitController
 * @extends LitElement
 */
export class LitController extends LitElement {
  /**
   * @return {Object}
   */
  static get properties() {
    return {
      changedTypes: {
        type: Array,
      },

      demo: {
        type: Boolean,
      },

      listener: {
        type: Object,
      },


      state: {
        type: Object,
      },

      sessionStorage: {
        type: Boolean,
      },

      storage: {
        type: Object,
      },
    };
  }

  /**
   */
  constructor() {
    super();
    this.demo = false;
    this.state = {};
    this.changedTypes = [];
    this.sessionStorage = false;
    const instance = this;
    this.storage = window.localStorage;

    this.listener = window.addEventListener('stateChangeRequest',
        (event) => {
          instance.stateChanged(event);
        });
  }

  /**
   */
  firstUpdated() {
    if (this.sessionStorage) {
      this.storage = window.sessionStorage;
    }

    const savedState = JSON.parse(this.storage.getItem('state'));
    if (savedState) {
      this.state = savedState;
      this.state = savedState;
    }

    this.changedTypes = Object.keys(this.state);
    this.notifyChange();
  }

  /**
   * @param {Event} event
   */
  stateChanged(event) {
    const tempState = event.detail;
    const keys = Object.keys(tempState);
    this.changedTypes = [];
    keys.forEach((key) => {
      if (JSON.stringify(this.state[key]) !== JSON.stringify(tempState[key])) {
        this.state[key] = JSON.parse(JSON.stringify(tempState[key]));
        this.changedTypes.push(key);
      }
    });
    if (this.changedTypes && this.changedTypes.length) {
      try {
        this.storage.setItem('state', JSON.stringify(this.state));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Local storage save failed... ', error);
      }
      this.notifyChange();
    }

    if (this.demo) {
      this.requestUpdate();
    }
  }

  /**
   */
  notifyChange() {
    const customObject = {};
    if (!this.state) return;
    this.changedTypes.forEach((type) => {
      if (this.state[type]) {
        customObject[type] = this.state[type];
      }
    });
    const event = new CustomEvent('stateChanged', {
      detail: customObject,
    });
    window.dispatchEvent(event);
  }
}
