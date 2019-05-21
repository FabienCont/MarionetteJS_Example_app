import Router from './router'
import "./app.scss";

document.addEventListener('DOMContentLoaded', () => {
  const router =new Router();

  Backbone.history.start();
});
