
export function debounce(func, wait = 20, immediate = true) {
  /*
 usage: debounce(anyFunction)
*/

  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      // console.log('debounced')
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}


