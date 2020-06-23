'use strict';

{{ $searchDataFile := printf "%s.search-data.js" .Language.Lang }}
{{ $searchData := resources.Get "search-data.js" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function() {
  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return
  }

  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);

  document.addEventListener('keypress', focusSearchFieldOnKeyPress);

  /**
   * @param {Event} event
   */
  function focusSearchFieldOnKeyPress(event) {
    if (input === document.activeElement) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    input.focus();
    event.preventDefault();
  }

  /**
   * @param {String} character
   * @returns {Boolean} 
   */
  function isHotkey(character) {
    const dataHotkeys = input.getAttribute('data-hotkeys') || '';
    return dataHotkeys.indexOf(character) >= 0;
  }

  function init() {
    input.removeEventListener('focus', init); // init once
    input.required = true;

    loadScript('{{ "flexsearch.min.js" | relURL }}');
    loadScript('{{ $searchData.RelPermalink }}', function() {
      input.required = false;
      search();
    });
  }

  function replacepos(text,start,stop,replacetext){
    return text.substring(0,stop-1)+replacetext+text.substring(stop+1);;
  }


  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value) {
      return;
    }

    const searchHits = window.bookSearchIndex.search(input.value, 10);
    searchHits.forEach(function(page) {
      const li = document.createElement('li'),
      a = li.appendChild(document.createElement('a'));

      a.href = page.href;
      a.textContent = page.title;
      //       a = li.appendChild(document.createElement('a')),
      //       b = li.appendChild(document.createElement('a'));
      // a.href = page.href;
      // var index = page.title.toLowerCase().indexOf(input.value) == -1 ? 0 : page.title.toLowerCase().indexOf(input.value);
      
      // $(a).html(index ? replacepos(page.title, index, page.title.length, "<span>" + page.title + "</span>") : page.title);
      // b.href = page.href;
      // var index = page.content.toLowerCase().indexOf(input.value.toLowerCase());
      // b.textContent = page.content.slice(index-10, index+10) ? page.content.slice(index-10, index+10) : page.content.slice(0, 20);

      results.appendChild(li);
    });
  }

  /**
   * @param {String} src 
   * @param {Function} callback 
   */
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.defer = true;
    script.async = false;
    script.src = src;
    script.onload = callback;

    document.head.appendChild(script);
  }
})();
