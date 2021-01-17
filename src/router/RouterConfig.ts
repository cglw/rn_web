import Demo from '../module/module_demo/router/Router';
import Main from '../module/module_main/router/Router';
import Login from '../module/module_login/router/Router';
import Campus from '../module/module_campus/router/Router';
export default {
  ...Demo,
  ...Main,
  ...Login,
  ...Campus,
};
