// ==UserScript==
// @name          千山助手
// @namespace
// @description   为站点千山导航添加一些实用功能，比如搜索框、更换背景和导入备份等
// @include       http://qianshan.co/*
// @include       http://*.qianshan.co/*
// @version       3.0
// @copyright     2018,11,01; By duke
// @github        https://github.com/DukeLuo/QianShan
// ==/UserScript==

;(function () {

// add html
var $styleBody = $("style[type='text/css']"),
    $body = $("body");


//global config
var globalConfig = {
    "isSearchBarOpen": 1,        // 0 means off, 1 means on
    "searchEngine": "google",    // google is the default search engine
    "isBgSet": 1,                // 0 means no setting, 1 means setting
    "bgData": ""
};

$(function () {
    var config = localStorage.getItem("GLOBAL");

    $menuModal.append(function (index, html) {
        return createInputFileGhost();
    });
    $(".input-ghost", $menuModal).val("");
    $textInput.val("");
    if (!config) {
        return ;
    }
    config = JSON.parse(config);
    if (config["isSearchBarOpen"]) {
        $searchBarBtn.text("打开");
        $searchForm.attr("action", engineConfig[config["searchEngine"]]["action"]);
        $inputField.attr("name", engineConfig[config["searchEngine"]]["name"]);
        $engineIcon.attr("class", "icon "+config["searchEngine"]);
    }
    if (config["isBgSet"]) {
        $bgBtn.text("打开");
        $body.css("backgroundImage", "url("+config["bgData"]+")");
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
    if (!$inputField.val()) {
        return ;
    }
    $searchForm.trigger("submit");
});

var $searchBarBtn = $("#o1 #search-bar-btn");

$("#o1 .dropdown-menu").on("click", function (evt) {
    $searchBarBtn.text($(evt.target).text());
    globalConfig["isSearchBarOpen"] = $(evt.target).text() === "打开" ? 1 : 0;
    localStorage.setItem("GLOBAL", JSON.stringify(globalConfig));
});


// change background
var $bgBtn = $("#o2 #bg-btn");

$("#o2 .dropdown-menu").on("click", function (evt) {
    var sign = $(evt.target).text() === "打开" ? 1 : 0;

    $bgBtn.text($(evt.target).text());
    globalConfig["isBgSet"] = sign;
    if (sign) {
        $(".input-ghost", $menuModal).one("change", function (evt) {
            var fr = new FileReader(),
                file = $(this).prop("files")[0];

            $textInput.val("");
            if (!/image*/.test(file.type)) {
                console.error("ERROR! Please select an image!");
                return ;
            }
            fr.onload = function (evt) {
                $body.css("backgroundImage", "url("+fr.result+")");
                globalConfig["bgData"] = ""+fr.result;
            };

            fr.readAsDataURL(file);
        });
        $(".input-ghost", $menuModal).trigger("click");
    }  else {
        $body.css("backgroundImage", 'url("https://qianshan.sfo2.digitaloceanspaces.com/mountain.jpg")');
        globalConfig["bgData"] = "";
    }
    localStorage.setItem("GLOBAL", JSON.stringify(globalConfig));
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
        $textInput.val($newIF.val().split("\\").pop());
    });
    $textInput.css("cursor", "pointer");
    $textInput.on("click", function (evt) {
        $newIF.click();
    });
    $clearBtn.on("click", function (evt) {
        $newIF.val("");
        $textInput.val("");
    });
    return $newIF;
}

// $menuModal.on("shown.bs.modal", function (evt) {
//     $(this).append(function (index, html) {
//         return createInputFileGhost();
//     });
// });



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
        localFile = $(".input-ghost", $menuModal).prop("files")[0];
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
