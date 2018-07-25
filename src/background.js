import URL from 'url-parse';
const DEFAULT_SITE_VERSION = 'old';

function getSiteVersionSetting() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['siteVersion'], function(result) {
      if (!result.siteVersion) {
        chrome.storage.sync.set({ siteVersion: DEFAULT_SITE_VERSION }, function() {
          resolve(DEFAULT_SITE_VERSION);
        });
      } else {
        resolve(result.siteVersion);
      }
    });
  });
}

let siteVersion = DEFAULT_SITE_VERSION;

getSiteVersionSetting()
  .then((version) => {
    siteVersion = version;
  });

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.siteVersion) {
    siteVersion = changes.siteVersion.newValue;
  }
});

function redirector(details) {
  const parsedUrl = new URL(details.url, true);
  const correctPath = parsedUrl.pathname === '/';
  const notUserIntent = parsedUrl.query.rhs_uc !== '1';
  const correctType = details.type === 'main_frame';

  if (!correctPath || !notUserIntent || !correctType) {
    return;
  }

  if (parsedUrl.host.indexOf('reddit.com') >= '0') {
    return { redirectUrl: `https://${siteVersion === 'new' ? 'www' : 'old'}.reddit.com/hot` };
  }
}

chrome.webRequest.onBeforeRequest.addListener(redirector, { urls: ['*://*.reddit.com/*'] }, ["blocking"]);
