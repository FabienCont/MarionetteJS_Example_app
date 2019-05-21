import Backbone from 'backbone';
import {ContainerView} from './layout/containerView';
import {TasksView} from './layout/tasks/tasksView.js';
import {HeaderView} from './layout/header/headerView.js';
import {FooterView} from './layout/footer/footerView.js';
import {FrameworkPresentationView} from './layout/framework/frameworkPresentationView.js'

export default Backbone.Router.extend({

  routes: {
    "actions":"actions",
    "actions/search/:query": "searchActionsByName",
    "actions/:id": "searchActionsById",
    "*all" : "actions",
    /*"help":                 "help",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7*/
  },

  initialize: function() {
    this.containerView = new ContainerView({el:"body"});
    this.containerView.render();
    const frameworkPresentationView=new FrameworkPresentationView();
    this.containerView.showChildView("frameworkPresentation",frameworkPresentationView);
    const headerView = new HeaderView();
    this.containerView.showChildView("header",headerView);
    const footerView = new FooterView();
    this.containerView.showChildView("footer",footerView);
  },

  actions: function() {
    const tasksView = new TasksView();
    this.containerView.showChildView("container",tasksView);
  },

});
