document.addEventListener('DOMContentLoaded', function () {
  function getDomain(tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url);
    return url.hostname;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.storage.sync.get(['domain'], function(result) {
      document.getElementById('email').value = getDomain(tabs) + '@' + result.domain;
    });

    var copyLink = document.querySelector('.js-copy');
    copyLink.addEventListener('click', function() {
      var emailInput = document.getElementById('email')
      emailInput.select();
      document.execCommand('copy');
      emailInput.deselectAll();
    })

    var domainInput = document.querySelector('#domain');
    domainInput.addEventListener('keyup', function() {
      chrome.storage.sync.set({'domain': domainInput.value}, function () {
        console.log(domainInput.value);
        document.getElementById('email').value = getDomain(tabs) + '@' + domainInput.value;
      });
    })

    var toggleOptionsLink = document.querySelector('.js-toggle-options');
    toggleOptionsLink.addEventListener('click', function(e) {
      var options = document.querySelector('.js-options');
      console.log(options.classList.contains('hidden'));
      if (options.classList.contains('hidden')) {
        options.classList.remove('hidden');
        toggleOptionsLink.classList.add('open');
        toggleOptionsLink.classList.remove('closed');

        chrome.storage.sync.get(['domain'], function(result) {
          console.log(result.domain)
          domainInput.value = result.domain;
          console.log('Value currently is ' + result.domain);
        });

      } else {
        options.classList.add('hidden');
        toggleOptionsLink.classList.add('closed');
        toggleOptionsLink.classList.remove('open');
      }

      e.preventDefault();
    });
  });
});
