import { View } from 'backbone.marionette';
import template from './selectionTasksTemplate.dot';
import {Button,ButtonModel} from "components/button.js";
import {SelectionTasksModel} from './selectionTasksModel';

const SelectionTasksView = View.extend({
  template: template,
  events:{
    'click @ui.checkAll' : 'checkAll'
  },
  ui:{
    checkAll:'input.checkbox-for-all[type="checkbox"]',
    inputs:"input"
  },
  childViewEvents: {
    'did:clickButton': 'buttonClicked'
  },
  regions:{
    buttonComponent:'.btn-component'
  },
  initialize(params){
    this.model=new SelectionTasksModel({allSelected:false});
    this.collection=params.collection;
    this.listenTo(this.model,"change",this.updateCheckboxView);
    this.listenTo(this.collection,"add remove",this.updateModels);
    this.listenTo(this.collection,"change update",this.updateModels);
    this.listenTo(this.collection,"syncAfterProperRemove update",this.updateModels);
  },
  onRender(){
    this.buttonModel=new ButtonModel({label:"delete", isDisabled:true,style:"mini"});
    this.buttonView=new Button({model:this.buttonModel});
    this.listenTo(this.buttonModel,"change",this.updateButtonView);

    this.showChildView('buttonComponent',this.buttonView);
  },
  buttonClicked:function(){
    var selectedModels= [];
    for(let i=0;i<this.collection.length;i++){
      if(this.collection.models[i].get('isSelected')){
        selectedModels.push(this.collection.models[i]);
      }
    }
    if(selectedModels.length!=0){
      this.collection.trigger("removeModelsProperly", selectedModels);
    }
  },
  checkAll:function(event) {
      this.model.set('allSelected',!this.model.get('allSelected'));
      this.toggleAllSelect(this.model.get('allSelected'));
  },
  toggleAllSelect:function(activate){
    for(let i=0;i<this.collection.length;i++){
      if(this.collection.models[i].get('isSelected')!=activate){
        this.collection.models[i].set('isSelected',activate);
      }
    }
  },
  countAllCheckedChild:function(){
    return this.collection.models.reduce((accu,current)=>{
      if(current.get('isSelected')){
        return accu+=1;
      }else return accu;
    },0);
  },


  updateModels:function(){
      let nbChildChecked=this.countAllCheckedChild();
      this.updateModelSelected(nbChildChecked);
      this.updateModelButton(nbChildChecked);
  },

  updateModelSelected:function(nbChildChecked){
    if(nbChildChecked==this.collection.length && this.collection.length!=0){
        this.model.set('allSelected',true,{force:true});
    }else{
        this.model.set('allSelected',false,{force:true});
    }
  },
  updateModelButton:function(nbChildChecked){
      if(nbChildChecked>0 && this.buttonView.model.get('isDisabled')){
        this.buttonView.model.set('isDisabled',false);
      } else if(nbChildChecked==0 && !this.buttonView.model.get('isDisabled')){
        this.buttonView.model.set('isDisabled',true);
      }
  },
  updateCheckboxView:function(){
    var allSelected=this.model.get('allSelected');
    this.$el.find(this.ui.checkAll)[0].checked=allSelected
  },
  updateButtonView:function(){
    this.buttonView.render();
  }
});


export {SelectionTasksView};
