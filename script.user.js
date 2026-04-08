// ==UserScript==
// @name         Reset Seed
// @namespace    reset-seed
// @version      1.0
// @description  Press ] to leave and restart the game
// @author       Sidecans
// @match        *://*.geoguessr.com/game/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // Change Keybind if you want
    const keybind = ']';

    // -----Dont change anything below this unless you know what your doing-----
    function getEl(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // <-- Selenium type selector (those who know)
    }

    document.addEventListener('keydown', function (e) {
        if (e.key !== keybind) return;
        const button0 = getEl('//*[@id="__next"]/div[2]/div[1]/main/div/div/aside/div/div[1]/div[2]/span/button'); // <-- Open GeoGuessr Settings
        if (button0) button0.click();
        setTimeout(() => {
            const button1 = getEl('//*[@id="__next"]/div[2]/div[1]/main/div[2]/div/div/div[2]/div[7]/button[2]'); // <-- Click Leave Game
            if (button1) button1.click();
            setTimeout(() => {
                const button2 = getEl('//*[@id="__next"]/div[2]/div[3]/div[1]/main/div/div/div/div[2]/div[2]/div/div[6]/div/div/div/button'); // <-- Click Play
                if (button2) button2.click();
            }, 800);

        }, 200);
    });

})();
