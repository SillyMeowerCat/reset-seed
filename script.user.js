// ==UserScript==
// @name         Reset Seed
// @namespace    reset-seed
// @version      1.1
// @description  Reset GeoGuessr seed.
// @author       Sidecans
// @match        *://*.geoguessr.com/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    // Change keybind if you want
    const keybind = ']';

    // Dont change anything below this (unless you know what youre doing)
    function getEl(xpath) {return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} // <-- Get button using xpath

    function getButtonByText(text) {
        const buttons = document.querySelectorAll('button'); // <-- Creating list of all buttons
        for (const btn of buttons) { //<-- Parsing thru each one
            if (btn.textContent.trim().toLowerCase().includes(text.toLowerCase())) {return btn;}
        }
        return null;
    }
    function waitAndClick(xpath) {
        return new Promise((resolve) => {
            const start = Date.now();
            const id = setInterval(() => {
                const el = getEl(xpath);
                if (el) {
                    clearInterval(id);
                    el.click();
                    resolve(true);
                } else if (Date.now() - start > 1000) {
                    clearInterval(id);
                    resolve(false);
                }
            }, 100);
        });
    }

    document.addEventListener('keydown', async function (e) {
        if (e.key !== keybind || !/geoguessr\.com\/game\/[a-zA-Z0-9]+/.test(window.location.href)) {return;}
        const settingsBtn = getEl('//*[@id="__next"]/div[2]/div[1]/main/div/div/aside/div/div[1]/div[2]/span/button'); // <-- Open Settings
        if (settingsBtn) settingsBtn.click();
        await waitAndClick('//*[@id="__next"]/div[2]/div[1]/main/div[2]/div/div/div[2]/div[7]/button[2]'); // <-- Click leave game

        await waitAndClick('//*[@id="__next"]/div[2]/main/div/div/div/div[2]/div[2]/div/div[6]/div/div/div/button'); // <-- click play
    });
})();
