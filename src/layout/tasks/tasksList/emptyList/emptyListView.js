import { View } from 'backbone.marionette';
import emptyListTemplate from './emptyListTemplate.dot';
const EmptyListView = View.extend({
  template: emptyListTemplate,
});

export {EmptyListView};
