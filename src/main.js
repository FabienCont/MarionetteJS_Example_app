import "./app.scss";
import './polyfill'
import Router from './router'

document.addEventListener('DOMContentLoaded', () => {
  const router =new Router();

  Backbone.history.start();
});
