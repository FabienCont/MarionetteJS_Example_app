import { View } from 'backbone.marionette';
import template from './TaskElementTemplate.dot';
import svgValidate from 'assets/check-circle.svg';
import svgEdit from 'assets/edit.svg';
import svgDelete from 'assets/trash.svg';

const TaskElementView = View.extend({
  tagName:"li",
  className:"task-element",
  template: template,
  initialize(params){
    this.model=params.model;
  },
  events:{
    "click @ui.edit":'edit',
    "click @ui.validate":'validate',
    "keydown @ui.input":'handlerKeyPressOnInput',
    "click @ui.delete":'delete',
    "click @ui.checkbox":'check',
    "blur @ui.taskElement":'validate'
  },
  ui: {
    edit: '.evt-edit',
    validate: '.evt-validate',
    delete:'.evt-delete',
    input:'input.input-classic',
    checkbox:'input[type="checkbox"]',
    taskElement:'task-element'
  },
 templateContext() {
      return {
        svg:{
          validate:svgValidate,
          edit:svgEdit,
          delete:svgDelete
        }
      }
  },
  edit:function(event){
    this.model.set('isInEditMode',!this.model.get('isInEditMode'));
    this.triggerMethod('did:edit', this);
  },
  validate:function(event){
    this.model.set({isInEditMode: !this.model.get('isInEditMode'),description:this.$el.find(this.ui.input)[0].value});
    this.triggerMethod('did:validate', this);
  },
  handlerKeyPressOnInput:function(event){
    if(event.keyCode===13){
      this.validate();
    }
  },
  delete:function(event){
    this.triggerMethod('did:delete', this);
  },
  check:function(event){
    this.model.set('isSelected',this.$el.find(this.ui.checkbox)[0].checked);
    this.triggerMethod('did:check', this);
  }
});

export {TaskElementView};
