export function scrollToId(e, target) {
  e.preventDefault();

  var elementHeightInWindow = document.getElementById(target).getBoundingClientRect().top;
  var viewPortOffset = document.documentElement.scrollTop;
  var scrollHeight = elementHeightInWindow + viewPortOffset - 85;

  window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
}
