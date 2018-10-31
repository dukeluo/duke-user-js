// ==UserScript==
// @name          千山导航搜索框
// @namespace
// @description   为千山导航添加一个搜索框，支持谷歌、必应、DuckDuckGo、百度等四种搜索引擎
// @include       http://qianshan.co/*
// @include       http://*.qianshan.co/*
// @version       3.0
// @copyright     2018,07,02; By duke
// @github        https://github.com/DukeLuo/QianShan
// ==/UserScript==


// 添加HTML
// var searchBar,
//     searchBarItem,
//     searchBarField,
//     engineWrapper,
//     liHTML,
//     searchBarParentNode,
//     searchBarBrotherNode;
//
// searchBar = document.createElement("form");
// searchBar.className = "search_bar";
// searchBar.method = "get";
// searchBar.target = "_blank";
// searchBarItem = document.createElement("span");
// searchBarItem.className = "search_bar_item";
// searchBarField = document.createElement("input");
// searchBarField.className = "search_bar_field";
// searchBarField.type = "search";
// searchBarField.autocomplete = "off";
// searchBarField.placeholder = "搜索";
// engineWrapper = document.createElement("ul");
// engineWrapper.className = "engine_wrapper";
// liHTML = '<li><span id="google" class="engine"></span></li>';
// liHTML += '<li><span id="bing" class="engine"></span></li>';
// liHTML += '<li><span id="duckduckgo" class="engine"></span></li>';
// liHTML += '<li><span id="baidu" class="engine"></span></li>';
// engineWrapper.innerHTML = liHTML;
// searchBar.appendChild(searchBarItem);
// searchBar.appendChild(searchBarField);
// searchBar.appendChild(engineWrapper);
// searchBarParentNode = document.querySelector("nav.navbar div.container");
// searchBarBrotherNode = document.querySelector("div.collapse.navbar-collapse");
// searchBarParentNode.insertBefore(searchBar, searchBarBrotherNode);
//
//
// // 添加样式
// addCss("nav.navbar div.container {display: flex; justify-content: space-between; align-items: center;}");
// addCss(".search_bar {display: flex; position: relative; box-sizing: content-box; height: 30px; width: 300px; padding-left: 30px; margin: 0 auto; border: 1px solid #ccc; border-radius: 2px;}");
// addCss(".search_bar_item {position: absolute; top: 0; left: 0; display: inline-block; width: 30px; height: 30px; background-color: #ddd; background-position: center; background-repeat: no-repeat;}");
// addCss(".search_bar_item:hover {background-color: transparent;}");
// addCss(".search_bar_field {flex: 1; outline: none; padding: 0 5px; font-size: 0.8em; border: 0;}");
// addCss(".engine_wrapper {position: absolute; top: 30px; left: 0; margin: 0; padding: 0; overflow: hidden; z-index: 1; border-radius: 0 0 4px 4px; background-color: #f4f4f4; box-shadow: 2px 2px 5px #aaa;}");
// addCss(".engine_wrapper li {list-style: none; float: left; width: 50px; padding: 5px 0;}");
// addCss(".engine_wrapper li:hover {background-color: #ddd;}");
// addCss(".engine_wrapper span {display: block; height: 30px; background-position: center; background-repeat: no-repeat;}");
// addCss(".engine_wrapper li + li span {border-left: 1px solid #aaa;}");
// addCss(".search_bar_item {background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzMy42NTIzNDQgMzIuNjU2MjUgMjkuMjIyNjU2IDM2IDI0IDM2IEMgMTcuMzcxMDk0IDM2IDEyIDMwLjYyODkwNiAxMiAyNCBDIDEyIDE3LjM3MTA5NCAxNy4zNzEwOTQgMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDEyLjk1MzEyNSA0IDQgMTIuOTUzMTI1IDQgMjQgQyA0IDM1LjA0Njg3NSAxMi45NTMxMjUgNDQgMjQgNDQgQyAzNS4wNDY4NzUgNDQgNDQgMzUuMDQ2ODc1IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkYzRDAwOyIgZD0iTSA2LjMwNDY4OCAxNC42OTE0MDYgTCAxMi44Nzg5MDYgMTkuNTExNzE5IEMgMTQuNjU2MjUgMTUuMTA5Mzc1IDE4Ljk2MDkzOCAxMiAyNCAxMiBDIDI3LjA1ODU5NCAxMiAyOS44NDM3NSAxMy4xNTIzNDQgMzEuOTYwOTM4IDE1LjAzOTA2MyBMIDM3LjYxNzE4OCA5LjM4MjgxMyBDIDM0LjA0Njg3NSA2LjA1NDY4OCAyOS4yNjk1MzEgNCAyNCA0IEMgMTYuMzE2NDA2IDQgOS42NTYyNSA4LjMzNTkzOCA2LjMwNDY4OCAxNC42OTE0MDYgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzRDQUY1MDsiIGQ9Ik0gMjQgNDQgQyAyOS4xNjQwNjMgNDQgMzMuODU5Mzc1IDQyLjAyMzQzOCAzNy40MTAxNTYgMzguODA4NTk0IEwgMzEuMjE4NzUgMzMuNTcwMzEzIEMgMjkuMjEwOTM4IDM1LjA4OTg0NCAyNi43MTQ4NDQgMzYgMjQgMzYgQyAxOC43OTY4NzUgMzYgMTQuMzgyODEzIDMyLjY4MzU5NCAxMi43MTg3NSAyOC4wNTQ2ODggTCA2LjE5NTMxMyAzMy4wNzgxMjUgQyA5LjUwMzkwNiAzOS41NTQ2ODggMTYuMjI2NTYzIDQ0IDI0IDQ0IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMxOTc2RDI7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzNC41MTE3MTkgMzAuMjM4MjgxIDMzLjA3MDMxMyAzMi4xNjQwNjMgMzEuMjE0ODQ0IDMzLjU3MDMxMyBDIDMxLjIxODc1IDMzLjU3MDMxMyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIEwgMzcuNDEwMTU2IDM4LjgwODU5NCBDIDM2Ljk3MjY1NiAzOS4yMDMxMjUgNDQgMzQgNDQgMjQgQyA0NCAyMi42NjAxNTYgNDMuODYzMjgxIDIxLjM1MTU2MyA0My42MDkzNzUgMjAuMDgyMDMxIFogIj48L3BhdGg+PC9nPjwvc3ZnPg==');}");
// addCss(".engine_wrapper li:nth-child(1) span {background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzMy42NTIzNDQgMzIuNjU2MjUgMjkuMjIyNjU2IDM2IDI0IDM2IEMgMTcuMzcxMDk0IDM2IDEyIDMwLjYyODkwNiAxMiAyNCBDIDEyIDE3LjM3MTA5NCAxNy4zNzEwOTQgMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDEyLjk1MzEyNSA0IDQgMTIuOTUzMTI1IDQgMjQgQyA0IDM1LjA0Njg3NSAxMi45NTMxMjUgNDQgMjQgNDQgQyAzNS4wNDY4NzUgNDQgNDQgMzUuMDQ2ODc1IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkYzRDAwOyIgZD0iTSA2LjMwNDY4OCAxNC42OTE0MDYgTCAxMi44Nzg5MDYgMTkuNTExNzE5IEMgMTQuNjU2MjUgMTUuMTA5Mzc1IDE4Ljk2MDkzOCAxMiAyNCAxMiBDIDI3LjA1ODU5NCAxMiAyOS44NDM3NSAxMy4xNTIzNDQgMzEuOTYwOTM4IDE1LjAzOTA2MyBMIDM3LjYxNzE4OCA5LjM4MjgxMyBDIDM0LjA0Njg3NSA2LjA1NDY4OCAyOS4yNjk1MzEgNCAyNCA0IEMgMTYuMzE2NDA2IDQgOS42NTYyNSA4LjMzNTkzOCA2LjMwNDY4OCAxNC42OTE0MDYgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzRDQUY1MDsiIGQ9Ik0gMjQgNDQgQyAyOS4xNjQwNjMgNDQgMzMuODU5Mzc1IDQyLjAyMzQzOCAzNy40MTAxNTYgMzguODA4NTk0IEwgMzEuMjE4NzUgMzMuNTcwMzEzIEMgMjkuMjEwOTM4IDM1LjA4OTg0NCAyNi43MTQ4NDQgMzYgMjQgMzYgQyAxOC43OTY4NzUgMzYgMTQuMzgyODEzIDMyLjY4MzU5NCAxMi43MTg3NSAyOC4wNTQ2ODggTCA2LjE5NTMxMyAzMy4wNzgxMjUgQyA5LjUwMzkwNiAzOS41NTQ2ODggMTYuMjI2NTYzIDQ0IDI0IDQ0IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMxOTc2RDI7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzNC41MTE3MTkgMzAuMjM4MjgxIDMzLjA3MDMxMyAzMi4xNjQwNjMgMzEuMjE0ODQ0IDMzLjU3MDMxMyBDIDMxLjIxODc1IDMzLjU3MDMxMyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIEwgMzcuNDEwMTU2IDM4LjgwODU5NCBDIDM2Ljk3MjY1NiAzOS4yMDMxMjUgNDQgMzQgNDQgMjQgQyA0NCAyMi42NjAxNTYgNDMuODYzMjgxIDIxLjM1MTU2MyA0My42MDkzNzUgMjAuMDgyMDMxIFogIj48L3BhdGg+PC9nPjwvc3ZnPg==');}");
// addCss(".engine_wrapper li:nth-child(2) span {background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIKICAgICB2aWV3Qm94PSIwIDAgMjUyIDI1MiIKICAgICBzdHlsZT0iZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMjUydi0yNTJoMjUydjI1MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjMDA4MzczIj48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIGQ9Ik00Ny4yNSwyNi4yNXYxNjhsNDcuMjUsMzEuNWwxMTAuMjUsLTU3Ljc1di01Ny43NWwtODkuMjUsLTMxLjVsMTUuNzUsNDcuMjVsMzEuNSwxMC41bC0xMDUsNTIuNWw0MiwtMzYuNzV2LTExMC4yNXoiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4=');}");
// addCss(".engine_wrapper li:nth-child(3) span {background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDggNDg7O2ZpbGw6IzAwMDAwMDsiPjxwYXRoIHN0eWxlPSJmaWxsOiNGRjNEMDA7IiBkPSJNNDQsMjRjMCwxMS05LDIwLTIwLDIwUzQsMzUsNCwyNFMxMyw0LDI0LDRTNDQsMTMsNDQsMjR6Ij48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yNiwxNi4yYy0wLjYtMC42LTEuNS0wLjktMi41LTEuMWMtMC40LTAuNS0xLTEtMS45LTEuNWMtMS42LTAuOC0zLjUtMS4yLTUuMy0wLjloLTAuNCAgYy0wLjEsMC0wLjIsMC4xLTAuNCwwLjFjMC4yLDAsMSwwLjQsMS42LDAuNmMtMC4zLDAuMi0wLjgsMC4yLTEuMSwwLjRjMCwwLDAsMC0wLjEsMEwxNS43LDE0Yy0wLjEsMC4yLTAuMiwwLjQtMC4yLDAuNSAgYzEuMy0wLjEsMy4yLDAsNC42LDAuNEMxOSwxNSwxOCwxNS4zLDE3LjMsMTUuN2MtMC41LDAuMy0xLDAuNi0xLjMsMS4xYy0xLjIsMS4zLTEuNywzLjUtMS4zLDUuOWMwLjUsMi43LDIuNCwxMS40LDMuNCwxNi4zICBsMC4zLDEuNmMwLDAsMy41LDAuNCw1LjYsMC40YzEuMiwwLDMuMiwwLjMsMy43LTAuMmMtMC4xLDAtMC42LTAuNi0wLjgtMS4xYy0wLjUtMS0xLTEuOS0xLjQtMi42Yy0xLjItMi41LTIuNS01LjktMS45LTguMSAgYzAuMS0wLjQsMC4xLTIuMSwwLjQtMi4zYzIuNi0xLjcsMi40LTAuMSwzLjUtMC44YzAuNS0wLjQsMS0wLjksMS4yLTEuNUMyOS40LDIyLjEsMjcuOCwxOCwyNiwxNi4yeiI+PC9wYXRoPjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjQsNDJjLTkuOSwwLTE4LTguMS0xOC0xOGMwLTkuOSw4LjEtMTgsMTgtMThjOS45LDAsMTgsOC4xLDE4LDE4QzQyLDMzLjksMzMuOSw0MiwyNCw0MnogTTI0LDggIEMxNS4yLDgsOCwxNS4yLDgsMjRzNy4yLDE2LDE2LDE2czE2LTcuMiwxNi0xNlMzMi44LDgsMjQsOHoiPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojMDI3N0JEOyIgZD0iTTE5LDIxLjFjLTAuNiwwLTEuMiwwLjUtMS4yLDEuMmMwLDAuNiwwLjUsMS4yLDEuMiwxLjJjMC42LDAsMS4yLTAuNSwxLjItMS4yICBDMjAuMSwyMS43LDE5LjYsMjEuMSwxOSwyMS4xeiBNMTkuNSwyMi4yYy0wLjIsMC0wLjMtMC4xLTAuMy0wLjNjMC0wLjIsMC4xLTAuMywwLjMtMC4zczAuMywwLjEsMC4zLDAuMyAgQzE5LjgsMjIuMSwxOS42LDIyLjIsMTkuNSwyMi4yeiBNMjYuOCwyMC42Yy0wLjYsMC0xLDAuNS0xLDFjMCwwLjYsMC41LDEsMSwxYzAuNiwwLDEtMC41LDEtMVMyNy4zLDIwLjYsMjYuOCwyMC42eiBNMjcuMiwyMS41ICBjLTAuMSwwLTAuMy0wLjEtMC4zLTAuM2MwLTAuMSwwLjEtMC4zLDAuMy0wLjNjMC4xLDAsMC4zLDAuMSwwLjMsMC4zUzI3LjQsMjEuNSwyNy4yLDIxLjV6IE0xOS4zLDE4LjljMCwwLTAuOS0wLjQtMS43LDAuMSAgYy0wLjksMC41LTAuOCwxLjEtMC44LDEuMXMtMC41LTEsMC44LTEuNUMxOC43LDE4LjEsMTkuMywxOC45LDE5LjMsMTguOSBNMjcuNCwxOC44YzAsMC0wLjYtMC40LTEuMS0wLjRjLTEsMC0xLjMsMC41LTEuMywwLjUgIHMwLjItMS4xLDEuNS0wLjlDMjcuMSwxOC4yLDI3LjQsMTguOCwyNy40LDE4LjgiPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojOEJDMzRBOyIgZD0iTTIzLjMsMzUuN2MwLDAtNC4zLTIuMy00LjQtMS40Yy0wLjEsMC45LDAsNC43LDAuNSw1czQuMS0xLjksNC4xLTEuOUwyMy4zLDM1Ljd6IE0yNSwzNS42ICBjMCwwLDIuOS0yLjIsMy42LTIuMWMwLjYsMC4xLDAuOCw0LjcsMC4yLDQuOWMtMC42LDAuMi0zLjktMS4yLTMuOS0xLjJMMjUsMzUuNnoiPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojNjg5RjM4OyIgZD0iTTIyLjUsMzUuN2MwLDEuNS0wLjIsMi4xLDAuNCwyLjNjMC42LDAuMSwxLjksMCwyLjMtMC4zYzAuNC0wLjMsMC4xLTIuMi0wLjEtMi42ICBDMjUsMzQuOCwyMi41LDM1LjEsMjIuNSwzNS43Ij48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0EyODsiIGQ9Ik0yMi4zLDI2LjhjMC4xLTAuNywyLTIuMSwzLjMtMi4yYzEuMy0wLjEsMS43LTAuMSwyLjgtMC4zYzEuMS0wLjMsMy45LTEsNC43LTEuMyAgYzAuOC0wLjQsNC4xLDAuMiwxLjgsMS41Yy0xLDAuNi0zLjcsMS42LTUuNywyLjJjLTEuOSwwLjYtMy4xLTAuNi0zLjgsMC40Yy0wLjUsMC44LTAuMSwxLjgsMi4yLDJjMy4xLDAuMyw2LjItMS40LDYuNS0wLjUgIGMwLjMsMC45LTIuNywyLTQuNiwyLjFjLTEuOCwwLTUuNi0xLjItNi4xLTEuNkMyMi45LDI4LjcsMjIuMiwyNy44LDIyLjMsMjYuOCI+PC9wYXRoPjwvc3ZnPg==');}");
// addCss(".engine_wrapper li:nth-child(4) span {background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDggNDg7O2ZpbGw6IzAwMDAwMDsiPjxwYXRoIHN0eWxlPSJmaWxsOiMxNTY1QzA7IiBkPSJNMzYuMDk0LDMxLjM1Yy0xLjY5NS0xLjUtMy43NTQtMy4yMjUtNi42Ni03LjM1Yy0xLjg2NS0yLjY0Ny0zLjUxMi00LTUuOTM0LTQgIGMtMi42NjQsMC00LjExNywxLjI1LTUuNTUyLDMuMjc5Yy0yLjEsMi45NzEtMi45MjUsMy45NzEtNS4wODgsNS42NzVjLTAuNzg2LDAuNjE5LTQuODYxLDMuMTcyLTQuODYsNy42NzEgIEM4LjAwMSw0MS44NzUsMTEuNzUzLDQ0LDE1LjE1NSw0NGM0LjQ2OSwwLDUuNDM5LTEsOC4zNDUtMWMzLjYzMywwLDUuNTcsMSw4LjQ3NiwxQzM3Ljc4OSw0NCwzOSwzOS42MjUsMzksMzYuODcyICBDMzksMzQuMjUsMzcuNzg5LDMyLjg1LDM2LjA5NCwzMS4zNXoiPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojMTU2NUMwOyIgZD0iTTExLjM4OSwyNC44ODVjMy4xMjQtMC42OTQsMy42MTYtMy43MzksMy42MTEtNS43MzJjLTAuMDAyLTAuNjk2LTAuMDY0LTEuMjYzLTAuMDk2LTEuNTU4ICBjLTAuMTk4LTEuNjc4LTIuMDI3LTQuNTUtNC41NTEtNC41OTRjLTAuMTItMC4wMDItMC4yNDIsMC4wMDItMC4zNjUsMC4wMTNjLTMuNDEyLDAuMzE0LTMuOTExLDUuNDEyLTMuOTExLDUuNDEyICBjLTAuMDU2LDAuMjg3LTAuMDgyLDAuNjEzLTAuMDc4LDAuOTYzYzAuMDMxLDIuMjYzLDEuMzU2LDUuNTI3LDQuMjc0LDUuNjFDMTAuNjIzLDI1LjAwOCwxMC45OTQsMjQuOTczLDExLjM4OSwyNC44ODUiPjwvcGF0aD48cGF0aCBzdHlsZT0iZmlsbDojMTU2NUMwOyIgZD0iTTE5LjUwMywxNkMyMS45OSwxNiwyNCwxMy4zMTUsMjQsOS45OThDMjQsNi42ODEsMjEuOTksNCwxOS41MDMsNEMxNy4wMTUsNCwxNSw2LjY4MSwxNSw5Ljk5OCAgQzE1LDEzLjMxNSwxNy4wMTUsMTYsMTkuNTAzLDE2Ij48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6IzE1NjVDMDsiIGQ9Ik0yOS41MjIsMTYuOTY0YzAuMjIxLDAuMDMxLDAuNDM2LDAuMDQxLDAuNjQ1LDAuMDMzYzIuNjk2LTAuMTAzLDQuNDE2LTMuMjc2LDQuNzgxLTUuNzIzICBjMC4wMzctMC4yNDEsMC4wNTQtMC40ODYsMC4wNTItMC43MzNjLTAuMDE1LTIuNDQxLTEuODMxLTUuMDEyLTMuNzk5LTUuNDljLTIuMTc3LTAuNTMyLTQuODkzLDMuMTczLTUuMTM4LDUuNTkgIGMtMC4wMzcsMC4zNy0wLjA1OSwwLjczOS0wLjA2MywxLjEwM0MyNS45NzUsMTQuMjk2LDI2Ljg0MSwxNi41OTksMjkuNTIyLDE2Ljk2NCI+PC9wYXRoPjxwYXRoIHN0eWxlPSJmaWxsOiMxNTY1QzA7IiBkPSJNNDEuOTg0LDIxLjE0MmMwLTEuMjgxLTEuMDA0LTUuMTQyLTQuNzQyLTUuMTQyQzMzLjQ5NiwxNiwzMywxOS42NDQsMzMsMjIuMjE5ICBjMCwyLjQxLDAuMTg3LDUuNzUyLDQuNTc4LDUuNzgxYzAuMDg3LDAuMDAxLDAuMTc2LDAsMC4yNjctMC4wMDJjNC4wMjctMC4wOTQsNC4xODMtNC4yMDMsNC4xNTItNi4xMzggIEM0MS45OTMsMjEuNTYxLDQxLjk4NCwyMS4zMTUsNDEuOTg0LDIxLjE0MiI+PC9wYXRoPjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjQsMzF2Ny41YzAsMCwwLDEuODc1LDIuNjI1LDIuNUgzM1YzMWgtMi42MjV2Ny41aC0yLjc1YzAsMC0wLjg3NS0wLjEyNS0xLTAuNzVWMzFIMjR6Ij48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yMCwyN3Y0aC0zYy0yLjEyNSwwLjM3NS00LDIuMjUtMy45OTksNC44NzVDMTMuMDAxLDM1LjkxNywxMywzNS45NTgsMTMsMzZjMCwyLjc1LDEuODc1LDQuNjI1LDQsNSAgaDUuNjI1VjI3SDIweiBNMjAsMzguNzVoLTIuMzc1Yy0wLjc1LDAtMi0xLjEyNS0yLTIuNzVzMS4yNS0yLjc1LDItMi43NUgyMFYzOC43NXoiPjwvcGF0aD48L3N2Zz4=');}");
//
// function addCss(cssText) {
//     var head,
//         style,
//         textNode;
//
//     head = document.head || document.getElementsByTagName("head")[0];
//     style = document.createElement("style");
//     textNode = document.createTextNode(cssText);
//     style.appendChild(textNode);
//     head.appendChild(style);
// }
//
//
// // 绑定事件
// var engineConfig,
//     engineWrapper;
//
// engineConfig = {
//     google: {
//         name: "q",
//         action: "https://www.google.com/search"
//     },
//     bing: {
//         name: "q",
//         action: "https://cn.bing.com/search"
//     },
//     duckduckgo: {
//         name: "q",
//         action: "https://duckduckgo.com/"
//     },
//     baidu: {
//         name: "wd",
//         action: "https://www.baidu.com/s"
//     }
// };
//
// init();
// searchBarItem.onclick = function(event) {
//     showEngineWrapper();
// }
// document.onclick = function(event) {
//     var selectedEngineSpan,
//         selectedEngineName,
//         engineBgImage;
//
//     if (event.target.className.toLowerCase() === "engine") {
//         selectedEngineSpan = event.target;
//         selectedEngineName = selectedEngineSpan.id.toLowerCase();
//     }
//     if (selectedEngineSpan) {
//         engineBgImage = document.defaultView.getComputedStyle(selectedEngineSpan, null).backgroundImage;
//         searchBarItem.style.backgroundImage = engineBgImage;
//         addEngineConfig(selectedEngineName);
//         localStorage.setItem("engine", selectedEngineName);
//         localStorage.setItem("img", engineBgImage);
//     }
//     if (event.target.className.toLowerCase() !== "search_bar_item") {
//         hideEngineWrapper();
//     }
// }
// searchBarField.onkeyup = function(event) {
//     if (event.keyCode === 13) {
//         searchBarField.value = "";
//     }
// }
//
// function init() {
//     var defaultEngineName;
//
//     hideEngineWrapper();
//     defaultEngineName = localStorage.getItem("engine") || "google";
//     if (defaultEngineName !== "google") {
//         searchBarItem.style.backgroundImage = localStorage.getItem("img");
//     }
//     addEngineConfig(defaultEngineName);
// }
//
// function showEngineWrapper() {
//     engineWrapper.style.display = "";
// }
//
// function hideEngineWrapper() {
//     engineWrapper.style.display = "none";
// }
//
// function addEngineConfig(name) {
//     var configObj;
//
//     configObj = engineConfig[name];
//     searchBar.setAttribute("action", configObj["action"]);
//     searchBarField.setAttribute("name", configObj["name"]);
// }

;(function () {

//global config
var globalConfig = {
    "isSearchBarOpen": 1,        // 0 means off, 1 means on
    "searchEngine": "google",    // google is the default search engine
    "isBgSet": 0,                // 0 means no setting, 1 means setting
    "bgData": ""
};

$(function () {
    var config = localStorage.getItem("GLOBAL");

    $(".input-ghost", $menuModal).val("");
    $textInput.val("");
    if (!config) {
        return ;
    }
    config = JSON.parse(config);
    if (config["isSearchBarOpen"]) {
        // console.log(config);
        $searchBarBtn.text("打开");
        $searchForm.attr("action", engineConfig[config["searchEngine"]]["action"]);
        $inputField.attr("name", engineConfig[config["searchEngine"]]["name"]);
        $engineIcon.attr("class", "icon "+config["searchEngine"]);
    }
    if (config["isBgSet"]) {

    }
});


// search bar
var engineConfig = {
    google: {
        name: "q",
        action: "https://www.google.com/search"
    },
    bing: {
        name: "q",
        action: "https://cn.bing.com/search"
    },
    duckduckgo: {
        name: "q",
        action: "https://duckduckgo.com/"
    },
    baidu: {
        name: "wd",
        action: "https://www.baidu.com/s"
    }
};

var $searchForm = $("#search-bar"),
    $engineWrapper = $("#search-bar .dropdown-menu"),
    $engineIcon = $("#search-bar #my-btn-search1 i"),
    $inputField = $("#search-bar input[type='text']"),
    $submitBtn = $("#search-bar #my-btn-search3");

$engineWrapper.on("click", function (evt) {
    var clickedItemName = $(evt.target).attr("id");

    if (!clickedItemName) {
        return ;
    }
    $searchForm.attr("action", engineConfig[clickedItemName]["action"]);
    $inputField.attr("name", engineConfig[clickedItemName]["name"]);
    $engineIcon.attr("class", "icon "+clickedItemName);
    globalConfig["searchEngine"] = clickedItemName;
    localStorage.setItem("GLOBAL", JSON.stringify(globalConfig));
});

$submitBtn.on("click", function  (evt) {
    $searchForm.trigger("submit");
});

var $searchBarBtn = $("#o1 #search-bar-btn");

$("#o1 .dropdown-menu").on("click", function (evt) {
    $searchBarBtn.text($(evt.target).text());
    // $searchBarBtn.attr("data-sign", $(evt.target).text() === "打开" ? 1 : 0);
    globalConfig["isSearchBarOpen"] = $(evt.target).text() === "打开" ? 1 : 0;
    localStorage.setItem("GLOBAL", JSON.stringify(globalConfig));
    // console.log(globalConfig);
    // console.log(localStorage.getItem("GLOBAL"));
    // console.log(JSON.parse(localStorage.getItem("GLOBAL")));
    // console.log($searchBarBtn.attr("data-sign"));
});


// backup and restore
var $menuModal = $("#menu-context"),
    $myInputFileDiv = $("#o3 .my-input-file"),
    $textInput = $myInputFileDiv.find("input[type='text']"),
    $clearBtn = $myInputFileDiv.find("button.btn-danger"),
    $fileBtn = $("#o3 #file-btn");

function createInputFileGhost() {
    var $newIF = $("<input type='file' class='input-ghost' style='display: none;'>");

    if ($menuModal.find(".input-ghost").length) {
        return ;
    }
    $newIF.attr("name", $myInputFileDiv.attr("name"));
    $newIF.on("change", function (evt) {
        // console.log($newIF.prop("files"));
        // localJSONFileHandler($newIF.prop("files")[0]);
        $textInput.val($newIF.val().split("\\").pop());
    });
    $textInput.css("cursor", "pointer");
    $textInput.on("click", function (evt) {
        $newIF.click();
    });
    $clearBtn.on("click", function (evt) {
        // console.log($newIF.prop("files"));
        $newIF.val("");
        // console.log($newIF.val());
        $textInput.val("");
        // console.log($newIF.prop("files"));
        // console.log($textInput.val());
    });
    return $newIF;
}

$menuModal.on("shown.bs.modal", function (evt) {
    $(this).append(function (index, html) {
        return createInputFileGhost();
    });
});

$menuModal.on("hidden.bs.modal", function (evt) {
    $(".input-ghost", $menuModal).val("");
    $textInput.val("");
});

$myInputFileDiv.on("mouseover", function (evt) {
    $textInput.removeAttr('disabled');
    $clearBtn.removeAttr('disabled');
    $fileBtn.text("导入");
    $fileBtn.attr("data-sign", "1");
});

$myInputFileDiv.on("mouseout", function (evt) {
    if ($textInput.val()) {
        return ;
    }
    $(".input-ghost", $menuModal).val("");
    $textInput.attr('disabled','disabled');
    $clearBtn.attr('disabled','disabled');
    $fileBtn.text("导出");
    $fileBtn.attr("data-sign", "0");
});

function getConfig($block) {
    var ret = {},
        $grids = $("div.website", $block),
        configOfAllGrids = [],
        i;

    ret["title"] = $("div.block-name", $block).text().trim();
    for (i = 0; i < $grids.length; i++) {
        var siteObj = {};

        siteObj["name"] = $("a span", $grids[i]).text();
        siteObj["href"] = $("a", $grids[i]).attr("href");
        configOfAllGrids.push(siteObj);
    }
    ret["websites"] = configOfAllGrids;
    return ret;
}

function setConfig($block, configObj) {
    var $grids = $("div.website", $block),
        webs = configObj["websites"],
        i;

    $("div.block-name", $block).text(configObj["title"]);
    for (i = 0; i < webs.length; i++) {
        $("a span", $grids[i]).text(webs[i]["name"]);
        $("a", $grids[i]).attr("href", webs[i]["href"]);
    }
}

function configJSONFileDownload(content, filename) {
    var a = "<a style='display: none;' download='" + filename +"'></a>",
        blob = new Blob([content], {type : 'application/json'}),
        $a = $(a);

    $a.attr("href", URL.createObjectURL(blob));
    $a.appendTo($menuModal);
    $a[0].click();
    $a.remove();
}

function localJSONFileHandler(file) {
    var tempFR = new FileReader();

    return new Promise(function (resolve, reject) {
        tempFR.onload = function () {
            resolve(this.result);
        };
        tempFR.onerror = function () {
            tempFR.abort();
            reject(new Error("Problem parsing input file!"));
        };
        tempFR.readAsText(file);
    });
}

$fileBtn.on("click", function (evt) {
    var sign = +$(this).attr("data-sign"),
        $blocks = $("div.building"),
        configJSON, configOfAllBlocks, now,
        fileContent, filename,
        localFile;

    if (!$blocks.length) {
        console.error("ERROR! Please use this script at http://qianshan.co!");
        return ;
    }
    if (sign) {
        // localFile = $(".input-ghost", $menuModal)[0].files[0];
        localFile = $(".input-ghost", $menuModal).prop("files")[0];
        // console.log(localFile);
        localJSONFileHandler(localFile).then(function (json) {
            json = JSON.parse(json);
            if (!json["data"] || !json["config"]) {
                console.error("ERROR! JSON file content is incorrect!");
            }
            json = json["config"];
            $blocks.each(function (index, element) {
                setConfig(element, json[index]);
            });
            console.log("the import operation succeeded.");
        }, function (error) {
            console.error("ERROR!", error);
        });
    } else {
        configOfAllBlocks = [];
        configJSON = {};
        now = new Date();
        $blocks.each(function (index, element) {
            // console.log(element);
            // console.log(getConfig(element));
            configOfAllBlocks.push(getConfig(element));
        });
        configJSON["data"] = now.toLocaleString();
        configJSON["configJSON"] = configOfAllBlocks;
        fileContent = JSON.stringify(configJSON, null, 4);
        filename = "qianshan-config-" + now.getUTCFullYear() + "-"
                   + (now.getUTCMonth()+1) + "-"
                   + now.getUTCDate() + ".json";
        configJSONFileDownload(fileContent, filename);
        console.log("the export operation succeeded.");
    }
});

})();
