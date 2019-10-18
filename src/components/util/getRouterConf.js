import menus from "../../constants/menu";

function getConfig (cPath, cMenus) {
  const menu = cMenus.filter((m) => {
    return m.path === cPath;
  });
  return menu[0];
}

export default (path) => {
  const ret = [];
  const paths = path.substring(1).split('/');
  const parentConfig = getConfig(`/${paths[0]}`, menus);
  ret.push(parentConfig);
  let subConfig = {};
  if (parentConfig && parentConfig.children) {
    subConfig = getConfig(`/${paths[0]}/${paths[1]}`, parentConfig.children);
  }
  ret.push(subConfig);
  return ret;
};