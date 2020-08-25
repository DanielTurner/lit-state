# \<lit-state>

A lightweight state management with localstorage persistance.

## Installation
```bash
#npm i @danielturner/lit-state

```

## Usage
After adding lit-state to your application you need to replace LitElement 
with LitState for *ANY* view that is going to be using or managing state.

Example:
```javascript
import { css, html } from 'lit-element';
import { LitState } from '../../lit-state/index.js';

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
Or leverage the updated lifecycle.
```javascript
  updated(changeProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
      this.notifyChange(propName, this[propName]);
    });
  }
```
LitState uses two events
*stateChanged*
and
*stateChangeRequest*

It is not recommended to use these to trigger updates.

## Configuration
If you want to use sessionStorage instead of localStorage to limit the
persistence to the session. Simply change the controller element in the render
method to the following.

```html
  <lit-controller sessionStorage>
```

## Reading state
Since you are using the this.state object and lit element updates are processed 
as part of the normal lit-element lifecycle.
"LitElement-based components update asynchronously in response to observed 
property changes..."
[Lit Element Lifecycle](https://lit-element.polymer-project.org/guide/lifecycle)

The short version is if you use 

```javascript
  return html`
    <p>${this.state.message}</p>
  `
```
The DOM will automatically update when the state changes are detected.

## No, really reading state
If you want to load the state within an element and it is not simply to output
in a template, you might want to leverage the updated function from lit element.

[Lit Element Lifecycle](https://lit-element.polymer-project.org/guide/lifecycle#upated)
