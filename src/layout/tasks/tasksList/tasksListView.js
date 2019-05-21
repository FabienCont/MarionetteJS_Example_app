import { CollectionView } from 'backbone.marionette';
import {TaskElementModel} from "./taskElement/taskElementModel";
import {TaskElementView} from "./taskElement/taskElementView.js";
import {EmptyListView} from "./emptyList/emptyListView.js";
import tasksListTemplate from "./tasksListTemplate.dot";

const TasksListView = CollectionView.extend({
 template: tasksListTemplate,
  childViewContainer: '.taskList',
  childView:TaskElementView,
  emptyView:EmptyListView,
  childViewEvents: {
    'did:validate': 'elementModify',
    'did:edit': 'elementEdit',
    'did:delete': 'elementDelete',
    'did:check': 'elementCheck'
  },
  //sortWithCollection :true, // without this line all the child are rerendered
  //viewComparator:false,

  initialize(params){
    //this.filter=function(){return;};
    this.collection=params.collection;
    window.collection=this.collection;
    this.listenTo(this.collection,"change",this.renderChild);
    this.listenTo(this.collection,"removeModelsProperly",this.removeModelsProperly);

    this.isSelected=false;
  },
  elementModify:function(childView) {
      childView.render();
  },
  elementEdit:function(childViewToEdit) {
      this.collection.models.forEach((model)=>{
        if(model.get('isInEditMode') && childViewToEdit.model!==model){
          let childView=this.children.findByModel(model);
          model.set('isInEditMode',false);
          childView.render();
        }
      });
      childViewToEdit.render();

  },
  elementDelete:function(childView) {
      //childView.model.remove();  // this line force rerender all child
      let model =childView.model;
      this.removeModelProperly(model);
  },
  renderChild:function(model){
    if(model){
      let childView=this.children.findByModel(model);
      childView.render();
    }
  },
  removeModelsProperly: function(models){
    models.forEach(model=>{
      this.removeModelProperly(model);
    })
    this.collection.trigger('update',this)
  },
  removeModelProperly:function(model){
    let childView=this.children.findByModel(model);
    childView.destroy();
    this.collection.remove([model],{silent:true});
  },


});

export {TasksListView};
