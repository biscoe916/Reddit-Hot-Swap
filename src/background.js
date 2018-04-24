import URL from 'url-parse';

function redirector(details) {
  const parsedUrl = new URL(details.url, true);

  const correctPath = parsedUrl.pathname === '/';
  const notUserIntent = parsedUrl.query.rhs_uc !== '1';
  const correctType = details.type === 'main_frame';

  if (correctPath && notUserIntent && correctType) {
    return { redirectUrl: 'https://www.reddit.com/hot' };
  }
}

chrome.webRequest.onBeforeRequest.addListener(redirector, { urls: ['*://*.reddit.com/*'] }, ["blocking"]);