// ==UserScript==
// @name         Force language redirector on MS documents
// @namespace    https://yakex.dev/
// @version      0.1
// @description  Force redirect to English pages on MS document sites
// @author       yak_ex
// @match        https://learn.microsoft.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://github.com/yak1ex/userjs/raw/main/force_lanuguage_redirector.user.js
// @updateURL    https://github.com/yak1ex/userjs/raw/main/force_lanuguage_redirector.user.js
// ==/UserScript==

(function() {
    'use strict';

    const target = '/en-us/'
    const matches = document.location.href.match(/https?:\/\/[^/]*(\/[a-z]{2}-[a-z]{2}\/)/)
    if(matches && matches[1] !== target) {
        document.location.href = document.location.href.replace(matches[1], target)
    }
})();