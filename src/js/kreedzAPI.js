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
        var count = 0;

        for (const tierKey of tierKeys) {
            const min = 0;
            var max = Object.keys(tiers[tierKey]).length;
            var index = getRandomInt(min, max - 1);
            var randomMap = tiers[tierKey][index];

            if (randomMap) {
                addWRHolder(randomMap).then((response) => {
                    weeklyMaps.push(response)
                    count += 1;
                    if (count === tierKeys.length) {
                        resolve(weeklyMaps);
                    }
                });
            } else {
                reject(new Error(`Tier ${tierKey} object is empty (no element) - no global map for this tier!`));
            }
        }
    });
}

const addWRHolder = async function (obj) {
    if (obj) {
        const map_id = obj.id;
        var modes = ['kz_timer', 'kz_simple', 'kz_vanilla'];
        var types = ['PRO', 'TP'];

        for (var i = 0; i < modes.length; i++) {
            for (var j = 0; j < types.length; j++) {
                var has_teleports;
                if (types[j] === 'PRO') {
                    has_teleports = false;
                } else if (types[j] === 'TP') {
                    has_teleports = true;
                }
                var url = "https://kztimerglobal.com/api/v2.0/records/top?map_id=" + map_id + "&overall=false&stage=0&modes_list=" + modes[i] + "&has_teleports=" + has_teleports + "&limit=1";
                const wrResponse = await getJSON(url);
                const wr = JSON.parse(wrResponse);

                if (wr[0] && wr[0].player_name && wr[0].time) {
                    obj[modes[i] + types[j] + 'player_name'] = wr[0].player_name;
                    var timeFormatNew = new Date(wr[0].time * 1000).toISOString().substr(11, 8)
                    obj[modes[i] + types[j] + 'time'] = timeFormatNew;
                } else {
                    obj[modes[i] + types[j] + 'player_name'] = "NULL";
                    obj[modes[i] + types[j] + 'time'] = "NULL";
                }
            }
        }
    }
    return obj;
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

const sortTimes = async function (list) {
    return list.sort(function (a, b) {
        return a.time - b.time;
    });
}

export async function getTop20Past30DaysPRO(mapName, mode) {
    if (mapName) {
        const TIMES_LIMIT = 20;
        const DAY_INTERVAL = 30;
        var created_since = new Date(new Date().setDate(new Date().getDate() - DAY_INTERVAL)).toISOString()
        var urlPRO = "https://kztimerglobal.com/api/v2.0/records/top/recent?map_name=" + mapName + "&has_teleports=false&stage=0&modes_list=" + mode + "&created_since=" + created_since + "&limit=100000";
        const responsePRO = await getJSON(urlPRO);
        var timesPRO = JSON.parse(responsePRO);

        if (timesPRO) {
            timesPRO = await sortTimes(timesPRO);

            if (timesPRO.length && timesPRO.length > TIMES_LIMIT - 1) {
                timesPRO = timesPRO.slice(0, TIMES_LIMIT);
            }
            return timesPRO;
        }
    }
}

export async function getTop20Past30DaysTP(mapName, mode) {
    if (mapName && mode) {
        const TIMES_LIMIT = 20;
        const DAY_INTERVAL = 30;
        var created_since = new Date(new Date().setDate(new Date().getDate() - DAY_INTERVAL)).toISOString()
        var urlTP = "https://kztimerglobal.com/api/v2.0/records/top/recent?map_name=" + mapName + "&has_teleports=true&stage=0&modes_list=" + mode + "&created_since=" + created_since + "&limit=100000";
        const responseTP = await getJSON(urlTP);
        var timesTP = JSON.parse(responseTP);

        if (timesTP) {
            timesTP = await sortTimes(timesTP);

            if (timesTP.length && timesTP.length > TIMES_LIMIT - 1) {
                timesTP = timesTP.slice(0, TIMES_LIMIT);
            }
            return timesTP;
        }
    }
}