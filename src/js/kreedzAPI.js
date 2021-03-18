const xmlhttprequest = require("xmlhttprequest");

const getJSON = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new xmlhttprequest.XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error("Error! Non 200 response."));
            }
        }
        xhr.send();
        xhr.onerror = (err) => reject(err);
        xhr.ontimeout = () => reject(new Error("Error! Request timed out."));
    });
};

export async function getMapPerTier() {
    const globalMapsURL = "https://kztimerglobal.com/api/v2.0/maps?is_validated=true&limit=10000";
    const tiers = { "t1": [], "t2": [], "t3": [], "t4": [], "t5": [], "t6": [], "t7": [] };
    const weeklyMaps = []
    const mapsResponse = await getJSON(globalMapsURL);
    const maps = JSON.parse(mapsResponse);

    return new Promise((resolve, reject) => {
        for (const map of maps) {
            const tier = map.difficulty;
            const objKey = "t" + tier;
            const arr = tiers[objKey];

            if (arr) {
                arr.push(map);
            } else {
                reject(new Error(`Tier ${tier} was not found (as a key) in our object!`));
            }
        }
        const tierKeys = Object.keys(tiers);

        for (const tierKey of tierKeys) {
            const min = 0;
            var max = Object.keys(tiers[tierKey]).length;
            var index = getRandomInt(min, max - 1);
            var randomMap = tiers[tierKey][index];

            if (randomMap) {
                weeklyMaps.push(randomMap);
            } else {
                reject(new Error(`Tier ${tierKey} object is empty (no element) - no global map for this tier!`));
            }
        }
        resolve(weeklyMaps);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getFirstMapNameSubstring(pattern) {
    const globalMapsURL = "https://kztimerglobal.com/api/v2.0/maps?is_validated=true&limit=10000";
    const mapsResponse = await getJSON(globalMapsURL);
    const maps = JSON.parse(mapsResponse);

    return new Promise((resolve, reject) => {
        for (const map of maps) {
            if (map.name.includes(pattern)) {
                resolve(map.name);
            }
        }
        reject(new Error(`pattern ${pattern} not found in any global map!`));
    });
}