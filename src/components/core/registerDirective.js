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
//点击空白区域隐藏元素
Vue.directive('click', {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});