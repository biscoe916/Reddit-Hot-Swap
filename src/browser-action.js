import $ from 'jquery';

function getSiteVersionSetting() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['siteVersion'], function (result) {
      if (!result.siteVersion) {
        chrome.storage.sync.set({ siteVersion: DEFAULT_SITE_VERSION }, function () {
          resolve(DEFAULT_SITE_VERSION);
        });
      } else {
        resolve(result.siteVersion);
      }
    });
  });
}

function setSiteVersionSetting(mode, evt) {
  console.log('Set: ', mode);
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ siteVersion: mode }, function () {
      setButtons(mode);
      resolve();
    })
  });
}

function setButtons(mode) {
  console.log('Set Buttons: ', mode);
  let oldButton = $('#old-button');
  let newButton = $('#new-button');

  oldButton.off();
  newButton.off();

  if (mode === 'old') {
    oldButton.addClass('selected');
    newButton.removeClass('selected');
    newButton.on('click', setSiteVersionSetting.bind(null, 'new'));
  } else {
    oldButton.removeClass('selected');
    newButton.addClass('selected');
    oldButton.on('click', setSiteVersionSetting.bind(null, 'old'));

  }
}

getSiteVersionSetting()
  .then(setButtons);