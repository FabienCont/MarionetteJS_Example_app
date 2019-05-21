import { View } from 'backbone.marionette';
import template from './frameworkPresentationTemplate.dot';
import frameworkSvg from "assets/marionette.svg";

const FrameworkPresentationView = View.extend({
  tagName:"div",
  className:"framework-presentation-container",
  template: template,
  templateContext(){
    return{
      svg:
      {
        marionette:frameworkSvg
      }
    }
  }
});

export {FrameworkPresentationView};
