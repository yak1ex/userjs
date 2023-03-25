// ==UserScript==
// @name         Open in Colab on GitHub
// @namespace    https://yakex.dev/
// @version      0.0
// @description  Add "Open in Colab" badge on GitHub
// @author       yak_ex
// @match        https://github.com/*.ipynb
// @match        https://gist.github.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
// SPDX-License-Identifier: Unlicense

(function() {
    'use strict';

    function makeLinkElement(element, url) {
        let a_elem = document.createElement("a")
        a_elem.setAttribute('href', 'https://colab.research.google.com/' + url)
        a_elem.setAttribute('target', '_blank')
        if (url.match(/^\/github\//)) {
            a_elem.style.paddingTop = '8px'
        } else {
            a_elem.style.verticalAlign = 'middle'
        }
        let img_elem = a_elem.appendChild(document.createElement("img"))
        // Generated from https://colab.research.google.com/assets/colab-badge.svg as of 2023/03/25
        img_elem.setAttribute('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTE3IiBoZWlnaHQ9IjIwIj48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgyPSIwIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYmJiIiBzdG9wLW9wYWNpdHk9Ii4xIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9Ii4xIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImEiPjxyZWN0IHdpZHRoPSIxMTciIGhlaWdodD0iMjAiIHJ4PSIzIiBmaWxsPSIjZmZmIi8+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGw9IiM1NTUiIGQ9Ik0wIDBoMzB2MjBIMHoiLz48cGF0aCBmaWxsPSIjMDA3ZWM2IiBkPSJNMzAgMGg4N3YyMEgzMHoiLz48cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDExN3YyMEgweiIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iRGVqYVZ1IFNhbnMsVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMTAiPjxzdmcgeD0iNHB4IiB5PSIwcHgiIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9Ii0yIDAgMjggMjQiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO2JvcmRlci1yYWRpdXM6IDFweDsiPjxwYXRoIHN0eWxlPSJmaWxsOiNlODcxMGE7IiBkPSJNMS45NzcsMTYuNzdjLTIuNjY3LTIuMjc3LTIuNjA1LTcuMDc5LDAtOS4zNTdDMi45MTksOC4wNTcsMy41MjIsOS4wNzUsNC40OSw5LjY5MWMtMS4xNTIsMS42LTEuMTQ2LDMuMjAxLTAuMDA0LDQuODAzQzMuNTIyLDE1LjExMSwyLjkxOCwxNi4xMjYsMS45NzcsMTYuNzd6Ii8+PHBhdGggc3R5bGU9ImZpbGw6I2Y5YWIwMDsiIGQ9Ik0xMi4yNTcsMTcuMTE0Yy0xLjc2Ny0xLjYzMy0yLjQ4NS0zLjY1OC0yLjExOC02LjAyYzAuNDUxLTIuOTEsMi4xMzktNC44OTMsNC45NDYtNS42NzhjMi41NjUtMC43MTgsNC45NjQtMC4yMTcsNi44NzgsMS44MTljLTAuODg0LDAuNzQzLTEuNzA3LDEuNTQ3LTIuNDM0LDIuNDQ2QzE4LjQ4OCw4LjgyNywxNy4zMTksOC40MzUsMTYsOC44NTZjLTIuNDA0LDAuNzY3LTMuMDQ2LDMuMjQxLTEuNDk0LDUuNjQ0Yy0wLjI0MSwwLjI3NS0wLjQ5MywwLjU0MS0wLjcyMSwwLjgyNkMxMy4yOTUsMTUuOTM5LDEyLjUxMSwxNi4zLDEyLjI1NywxNy4xMTR6Ii8+PHBhdGggc3R5bGU9ImZpbGw6I2U4NzEwYTsiIGQ9Ik0xOS41MjksOS42ODJjMC43MjctMC44OTksMS41NS0xLjcwMywyLjQzNC0yLjQ0NmMyLjcwMywyLjc4MywyLjcwMSw3LjAzMS0wLjAwNSw5Ljc2NGMtMi42NDgsMi42NzQtNi45MzYsMi43MjUtOS43MDEsMC4xMTVjMC4yNTQtMC44MTQsMS4wMzgtMS4xNzUsMS41MjgtMS43ODhjMC4yMjgtMC4yODUsMC40OC0wLjU1MiwwLjcyMS0wLjgyNmMxLjA1MywwLjkxNiwyLjI1NCwxLjI2OCwzLjYsMC44M0MyMC41MDIsMTQuNTUxLDIxLjE1MSwxMS45MjcsMTkuNTI5LDkuNjgyeiIvPjxwYXRoIHN0eWxlPSJmaWxsOiNmOWFiMDA7IiBkPSJNNC40OSw5LjY5MUMzLjUyMiw5LjA3NSwyLjkxOSw4LjA1NywxLjk3Nyw3LjQxM2MyLjIwOS0yLjM5OCw1LjcyMS0yLjk0Miw4LjQ3Ni0xLjM1NWMwLjU1NSwwLjMyLDAuNzE5LDAuNjA2LDAuMjg1LDEuMTI4Yy0wLjE1NywwLjE4OC0wLjI1OCwwLjQyMi0wLjM5MSwwLjYzMWMtMC4yOTksMC40Ny0wLjUwOSwxLjA2Ny0wLjkyOSwxLjM3MUM4LjkzMyw5LjUzOSw4LjUyMyw4Ljg0Nyw4LjAyMSw4Ljc0NkM2LjY3Myw4LjQ3NSw1LjUwOSw4Ljc4Nyw0LjQ5LDkuNjkxeiIvPjxwYXRoIHN0eWxlPSJmaWxsOiNmOWFiMDA7IiBkPSJNMS45NzcsMTYuNzdjMC45NDEtMC42NDQsMS41NDUtMS42NTksMi41MDktMi4yNzdjMS4zNzMsMS4xNTIsMi44NSwxLjQzMyw0LjQ1LDAuNDk5YzAuMzMyLTAuMTk0LDAuNTAzLTAuMDg4LDAuNjczLDAuMTljMC4zODYsMC42MzUsMC43NTMsMS4yODUsMS4xODEsMS44OWMwLjM0LDAuNDgsMC4yMjIsMC43MTUtMC4yNTMsMS4wMDZDNy44NCwxOS43Myw0LjIwNSwxOS4xODgsMS45NzcsMTYuNzd6Ii8+PC9zdmc+PHRleHQgeD0iMjQ1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiB0ZXh0TGVuZ3RoPSIzMCI+IDwvdGV4dD48dGV4dCB4PSI3MjUiIHk9IjE1MCIgZmlsbD0iIzAxMDEwMSIgZmlsbC1vcGFjaXR5PSIuMyIgdHJhbnNmb3JtPSJzY2FsZSguMSkiIHRleHRMZW5ndGg9Ijc3MCI+T3BlbiBpbiBDb2xhYjwvdGV4dD48dGV4dCB4PSI3MjUiIHk9IjE0MCIgdHJhbnNmb3JtPSJzY2FsZSguMSkiIHRleHRMZW5ndGg9Ijc3MCI+T3BlbiBpbiBDb2xhYjwvdGV4dD48L2c+IDwvc3ZnPgo=')
        img_elem.setAttribute('alt', 'Open in Colab')
        element.parentElement.insertAdjacentElement('beforeend', a_elem)
    }

    let url = window.location.href
    if (url.match(/\/github\.com\//)) {
        url = url.replace(/https?:\/\/\github.com/, 'github')
        let ul_elem = document.querySelector('ul[aria-label="File view"]')
        makeLinkElement(ul_elem, url)
    } else {
        if (Array.from(document.querySelectorAll('strong.gist-blob-name')).find(e => e.textContent.match(/\.ipynb\s*$/))) {
            url = url.replace(/https?:\/\/\gist.github.com/, 'gist')
            let name_elem = document.querySelector('strong[itemprop="name"]')
            makeLinkElement(name_elem, url)
        } else {
            console.log('Open in Colab: Seems that any ipynb file is not found')
        }
    }


})();
