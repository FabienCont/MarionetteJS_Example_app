import Backbone from "backbone";
const SelectionTasksModel = Backbone.Model.extend({
  preinitialize({allSelected}) {
    this.allSelected=false;
  },

  default:{
    allSelected:false
  }

});

export {SelectionTasksModel}
