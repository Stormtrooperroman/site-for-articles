MathJax = {
    options: {
        enableMenu: false,
        skipHtmlTags: [
            'script', 'noscript', 'style', 'textarea', 'pre',
            'code', 'annotation', 'annotation-xml'
        ],
        ignoreHtmlClass: 'tex2jax_ignore',
    },
    loader: {load: ['[tex]/color']},
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        packages: {'[+]': ['color']}
    }
};