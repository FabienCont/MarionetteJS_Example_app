import Backbone from "backbone";
const TaskElementModel = Backbone.Model.extend({
  preinitialize({description,isInEditMode}) {
    this.description =description;
    this.isInEditMode=isInEditMode;
    this.isSelected=false;
  },

  default:{
    description:'no description',
    isInEditMode:false,
    isSelected:false
  }

});

export {TaskElementModel}
