'use strict';

(function() {
  const indexCfg = {{ with i18n "bookSearchConfig" }}
    {{ . }};
  {{ else }}
   {};
  {{ end }}

  indexCfg.doc = {
    id: 'id',
    field: ['title', 'content'],
    store: ['title', 'href', 'content'],
  };
  var index = FlexSearch.create({
    encode: false,
    tokenize: function(str){
      var enWords = str;
      var zhWordsArr = str.replace(/[\x00-\x7F]/g,"").split("");
      enWords = enWords.replace(/[\u4e00-\u9fa5]/g,"").split("");
      return zhWordsArr.concat(enWords)
    },
    doc: indexCfg.doc
  })
  window.bookSearchIndex = index;
  {{ range $index, $page := where .Site.Pages "Kind" "in" (slice "page" "section") }}
  index.add({
    'id': {{ $index }},
    'href': '{{ $page.RelPermalink }}',
    'title': {{ (partial "docs/title" $page) | jsonify }},
    'content': {{ $page.Plain | jsonify }}
  });
  {{- end -}}
})();
