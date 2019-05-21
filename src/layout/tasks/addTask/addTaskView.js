import { View } from 'backbone.marionette';
import template from './addTaskTemplate.dot';
const AddTaskView = View.extend({
  template: template,
  initialize:function(params){
    if(params){
      this.error=params.error;
      this.errorTaskName=params.errorTaskName;
    }
  },
  events:{
    "submit.prevent" :"addTask"
  },
  "ui":{
    "inputs":"input"
  },
  templateContext:function(){
    return{
      error:this.error,
      errorTaskName:this.errorTaskName
    }
  },
  addTask:function(event){
      this.triggerMethod('did:add', this.ui.inputs[0].value);
      this.ui.inputs[0].value="";
      return false;
  }
});

export {AddTaskView};
