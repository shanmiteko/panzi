import axios from "axios"

const bili = axios.create({
});

/**
 * @param {number} topic_id
 */
async function top_details(topic_id) {
    const res = await bili.get(
        "https://app.bilibili.com/x/topic/web/details/top",
        {
            "params": { topic_id }
        }
    );
    if (res.status !== 200) {
        console.log(res.data);
    }
    const traffic_card = res?.data?.data?.functional_card?.traffic_card
    if (traffic_card) {
        return {
            topic: "https://www.bilibili.com/v/topic/detail/?topic_id=" + topic_id,
            text: traffic_card.name + " " + traffic_card.benefit_point + " " + traffic_card.card_desc,
            jump_url: traffic_card.jump_url,
        }
    }
}

/**
 * 
 * @param {string} url 
 * @returns 
 */
async function activity(url) {
    if (/^https.*?activity/.test(url)) {
        return bili.get(url).then(it => it.data)
    }
}

/**
 * @param {string} html 
 */
function lotteryId(html) {
    if (html) {
        const id = html.match(/newLottery_(.*?)"/)?.[1];
        if (id) {
            return "newLottery_" + id
        }
    }
}

async function find_lottery(topic_id) {
    const tdetails = await top_details(topic_id);
    if (tdetails) {
        const sid = lotteryId(await activity(tdetails.jump_url));
        if (sid) {
            return { sid, topic: tdetails.topic, url: tdetails.jump_url, desp: tdetails.text }
        }
    }
}

async function get_winner_list(lott) {
    if (lott) {
        const res = await bili.get(
            "https://api.bilibili.com/x/lottery/win/list",
            {
                "params": { sid: lott.sid }
            }
        );
        if (res.status !== 200) {
            console.log(res.data);
        }
        const winner = res?.data?.data
        if (winner instanceof Array) {
            return { lott, winners: winner.map(it => it.name + " " + it.gift_name + " " + new Date(it.ctime * 1000).toLocaleString()) }
        }
    }

}

(async () => {
    const num = 100;
    for (let tid = Number(process.argv[2]); ; tid += num) {
        console.log(tid);
        let ret = await Promise.all(
            new Array(num)
                .fill()
                .map(
                    (_, i) => find_lottery(tid + i)
                        .then(get_winner_list)
                )
        )
        console.log(ret.filter(it => typeof it !== "undefined"));
    }
})()
