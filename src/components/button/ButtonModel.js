import Backbone from "backbone";
const ButtonModel = Backbone.Model.extend({
  initialize({label, isDisabled,style,ariaLabel,ariaHidden,suffixTriggerEvent}) {
    suffixTriggerEvent=suffixTriggerEvent?suffixTriggerEvent:'';
    this.set({label:label,isDisabled:isDisabled,style:style,ariaLabel:ariaLabel,ariaHidden:ariaHidden,suffixTriggerEvent:suffixTriggerEvent},{silence:true});
  },

  default:{
    label:'test',
    isDisabled:'false',
    style:undefined,
    ariaLabel:undefined,
    ariaHidden:undefined,
    suffixTriggerEvents:''
  }

});

export {ButtonModel}
