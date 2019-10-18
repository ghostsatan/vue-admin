import Vue from "vue";

Vue.directive('authority', {
  inserted(el, binding, vnode) {
    let menuList = JSON.parse(localStorage.menuList);
    let crmMenuList = [];
    if (menuList) {
      crmMenuList = menuList.crm || [];
      menuList.sys = menuList.sys || [];
      crmMenuList = crmMenuList.concat(menuList.sys);
    }
    let flag = ~crmMenuList.indexOf(binding.value);
    if (!flag) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      } else {
        el.innerHTML = '';
        el.style.display = 'none';
        // 解除组件的事件
        vnode.elm.__vue__ && vnode.elm.__vue__.$off();
        // 解除链接跳转
        el.tagName === 'A' && el.setAttribute('href', 'javascript:void(0)');
        // 解除元素点击事件
        if (vnode.data.on && vnode.data.on.click) {
          vnode.data.on.click.fn = () => {
            return;
          };
        }
        if (vnode.data.nativeOn && vnode.data.nativeOn.click) {
          vnode.data.nativeOn.click.fn = () => {
            return;
          };
        }
      }
    }
  }
});