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
      state: {
        type: Object,
      },

      listener: {
        type: Object,
      },

      changedTypes: {
        type: Array,
      },

      demo: {
        type: Boolean,
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
    const instance = this;
    this.listener = window.addEventListener('stateChangeRequest',
        (event) => {
          instance.stateChanged(event);
        });
    const savedState = JSON.parse(localStorage.getItem('state'));
    if (savedState) {
      this.state = savedState;
      this.state = savedState;
    }
  }

  /**
   */
  firstUpdated() {
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
        localStorage.setItem('state', JSON.stringify(this.state));
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
