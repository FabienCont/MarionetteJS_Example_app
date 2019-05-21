import { View } from 'backbone.marionette';
import titleTaskTemplate from './titleTaskTemplate.dot';import Marionette from 'backbone.marionette';

const TitleTaskView = View.extend({
  tagName:"h2",
  className:"title-h2",
  template: titleTaskTemplate,
  templateContext() {
      return {
        title: 'Tasks List'
      }
  } //before version 3 use templateHelpers

});

export {TitleTaskView};
