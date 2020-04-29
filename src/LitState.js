import { LitElement } from 'lit-element';
import { nothing } from 'lit-html';

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
      callback: {
        type: Object,
      },

      demo: {
        type: Boolean,
      },

      state: {
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
    const instance = this;
    const stateChangedCallback = (event) => {
      instance.stateChanged(event);
    };
    this.callback = stateChangedCallback;
  }

  /**
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('stateChanged', this.callback);
  }

  /**
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('stateChanged', this.callback);
  }

  /**
   * @param {Object} state
   */
  init(state) {
    this.state = JSON.parse(JSON.stringify(state));
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
      this.state[key] = JSON.parse(JSON.stringify(tempState[key]));
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

  /**
   * @return {TemplateResult}
   */
  render() {
    if (!this.demo) return nothing;
    return JSON.stringify(this.state);
  }
  /* eslint-enable class-methods-use-this */
}
