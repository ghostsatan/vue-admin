const Util = {
  showLog() {
    for(var i in arguments) {
      // eslint-disable-next-line no-console
      (process.env.NODE_ENV === 'development') && console.log(arguments[i]);
    }
  }
};
export default Util;