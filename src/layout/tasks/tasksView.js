import { View } from 'backbone.marionette';
import template from './tasksTemplate.dot';
import {TitleTaskView} from './title/titleTaskView';
import {TasksListView} from './tasksList/tasksListView';
import {TaskElementModel} from "./tasksList/taskElement/taskElementModel";
import {AddTaskView} from "./addTask/AddTaskView";
import {SelectionTasksView} from "./selectionTasks/selectionTasksView";

const TasksView = View.extend({
  template: template,
  className:"container-actions",
  initialize:function(){
    this.collection=new Backbone.Collection()
    this.collection.add(new TaskElementModel({description: 'test',isInEditMode:false}));
    this.collection.add(new TaskElementModel({description: 'test2',isInEditMode:false}));
    this.collection.add(new TaskElementModel({description: 'test3',isInEditMode:false}));
  },
  childViewEvents:{
    'did:add': 'addTask'
  },
  regions: {
    header:"#actions-header",
    selection:'#actions-selection',
    list:"#actions-list",
    form:"#action-add-form",
  },
  onRender() {
    this.showChildView('header', new TitleTaskView());
    this.showChildView('selection', new SelectionTasksView({collection:this.collection}));
    this.showChildView('list', new TasksListView({collection:this.collection}));
    this.showChildView('form', new AddTaskView({error:false}));
  },
  addTask:function(description){
    if(!this.isTaskDescriptionExistInCollection(description)){
      this.showChildView('form', new AddTaskView({error:false}));
      this.collection.add(new TaskElementModel({description: description,isInEditMode:false}));
    }else {
      this.showChildView('form', new AddTaskView({error:true,errorTaskName:description}));
    }
  },
  isTaskDescriptionExistInCollection:function(description){
    let task=this.collection.models.find(current=>{
      if(current.get('description')==description){
        return current;
      }
    });
    return task? true: false;
  },
});

export {TasksView};
