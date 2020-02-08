# \<lit-state>

A lightweight state management with localstorage persistance.


## Installation
```bash
#npm i lit-state

```

## Usage
After adding lit-state to your application you need to replace LitElement 
with LitState for any view that is going to be using or managing state.

Example:
```javascript
import { html, css, LitState} from '../../lit-state/index.js';

export class TestState extends LitState {
```

Setting state in properties is your next step:
```javascript
  static get properties() {
    return {
      state: {
        type: Object,
      },
    };
  }
```
Note: Your properties *should* have more properties than state

Set the initial value for state in the constructor, don't forget to set
the keys you are interested in following for this view.

```javascript
  constructor() {
    super();
    this.state = {
      welcome: '',
      counter: 0,
    };
  }
```
Note: Your constructor most likely will have more than just state.

One place in your app (possible the app's shell) will control the state.
This element is the controller. Place it in your render method.
```html
      <lit-controller></lit-controller>
```
To initialize a value outside the constructor use the firstUpdated method
Calling the notify change triggers a state change across your app.

```javascript
  firstUpdated() {
    this.notifyChange('welcome', 'Welcome to state');
  }
```
State changes can be anything, and any time during your apps lifecycle.
```javascript
  __increment() {
    this.counter += 1;
    this.notifyChange('counter', this.counter);
  }
```
LitState uses two events
*stateChanged*
and
*stateChangeRequest*

It is not recommended to use these to trigger updates.