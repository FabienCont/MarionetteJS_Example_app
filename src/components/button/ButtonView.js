import { View } from 'backbone.marionette';
import buttonTemplate from './ButtonTemplate.dot';
const Button = View.extend({
  template: buttonTemplate,
  className:"marionette-wrapper-inline",
  events:{
    'click @ui.btn' : 'clickButton'
  },
  ui:{
    btn:'.btn-activate'
  },
  initialize:function({model}/*label, isDisabled,style,ariaLabel,ariaHidden,suffixTriggerEvents*/){
    this.model=model;
  },
  templateContext:function(){

    return{
      className:this.buildClassName()
    }
  },
  clickButton:function(){
    this.triggerMethod('did:clickButton'+this.model.get('suffixTriggerEvent'), this);
  },
  buildClassName:function(){
      var className="btn"
      this.model.get('isDisabled')?className+=' btn-disable':className+=' btn-activate';
      if(this.model.get('style')){
        if(this.model.get('style')=="big"){
          className+='btn-fat';
        }else if(this.model.get('style')=="mini"){
          className+=' btn-mini';
        }
      }
      return className;
    }
});

export {Button};
