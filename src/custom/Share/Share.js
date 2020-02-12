const FacebookDesktopUrl = "https://www.facebook.com/dialog/send"
const FacebookAppId = "1053511994854271"


export function Facebook() {
  console.log("Sharing on facebook");

  const PageUrl = 'https://test.ewelists.com/'

  window.open(FacebookDesktopUrl + '?app_id=' + FacebookAppId + '&redirect_uri=' + encodeURIComponent(PageUrl) + '&link=' + encodeURIComponent(PageUrl) + '&display=popup', '_blank', 'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=645,height=580').opener = null
}
