const FacebookDesktopUrl = "https://www.facebook.com/dialog/send"
const FacebookAppId = "1053511994854271"


export function Facebook(pageUrl) {
  // console.log("Sharing list: " + pageUrl);
  // const pageUrl = 'https://test.ewelists.com/lists/3205c3b8-4b0d-4e99-b097-c1deb559788e'
  window.open(FacebookDesktopUrl + '?app_id=' + FacebookAppId + '&redirect_uri=' + encodeURIComponent(pageUrl) + '&link=' + encodeURIComponent(pageUrl) + '&display=popup', '_blank', 'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=645,height=580').opener = null
}
