import { View } from 'backbone.marionette';
import template from './addTaskTemplate.dot';
const AddTaskView = View.extend({
  template: template,
  initialize:function(params){
    if(params){
      this.error=params.error;
      this.errorMessage=params.errorMessage;
      this.focus=params.focus;
    }
  },
  onAttach:function(){
    if(this.focus){
      this.ui.inputs[0].focus();
    }
  },
  events:{
    "submit" :"addTask"
  },
  ui:{
    inputs:'.input-classic',
  },
  templateContext:function(){
    return{
      error:this.error,
      errorMessage:this.errorMessage
    }
  },
  addTask:function(event){
      this.triggerMethod('did:add', this.$el.find(this.ui.inputs)[0].value);
      return false;
  }
});

export {AddTaskView};
