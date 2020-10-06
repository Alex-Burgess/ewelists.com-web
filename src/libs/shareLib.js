import config from 'config.js';

export function facebookShare(pageUrl) {
  window.open(config.facebookDesktopUrl + '?app_id=' + config.facebookAppId + '&redirect_uri=' + encodeURIComponent(pageUrl) + '&link=' + encodeURIComponent(pageUrl) + '&display=popup', '_blank', 'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=645,height=580').opener = null
}
