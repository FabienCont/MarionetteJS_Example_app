import { View } from 'backbone.marionette';
import template from './headerTemplate.dot';

const HeaderView = View.extend({
  tagName:"div",
  className:"header-app-container",
  template: template
});

export {HeaderView};
