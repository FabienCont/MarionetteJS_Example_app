import { View } from 'backbone.marionette';
import template from './containerTemplate.dot';
const ContainerView = View.extend({
  template: template,
  regions: {
    container:"#container-content-app",
    frameworkPresentation:"#framework-presentation",
    header:"#header-app",
    footer:"#footer-app"
  }
});

export {ContainerView};
