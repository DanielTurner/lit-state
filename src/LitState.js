import {
  LitElement,
} from 'lit-element';

export * from 'lit-element';

/**
 * @class LitState
 * @extends LitElement
 */
export class LitState extends LitElement {
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
    const instance = this;
    this.listener = window.addEventListener('stateChanged', (event) => {
      instance.stateChanged(event);
    });
  }

  /**
   * @param {Event} event
   */
  stateChanged(event) {
    const tempState = event.detail;
    const keys = Object.keys(tempState);
    let changed = false;
    keys.forEach((key) => {
      if (typeof this.state[key] === 'undefined') return;
      if (JSON.stringify(this.state[key]) === JSON
          .stringify(tempState[key])) return;
      this.state[key] = tempState[key];
      changed = true;
    });
    if (!changed) return;
    this.requestUpdate();
  }

  /* eslint-disable class-methods-use-this */
  /**
   *
   * @param {String} path
   * @param {*} variable
   */
  notifyChange(path, variable) {
    const customObject = {};
    customObject[path] = variable;
    const event = new CustomEvent('stateChangeRequest', {
      detail: customObject,
    });
    window.dispatchEvent(event);
  }
  /* eslint-enable class-methods-use-this */
}
