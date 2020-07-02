const chineseRegex = /[\u4e00-\u9fff]/;
const japaneseRegex = /[\u3040-\u30ff]/;

export function checkIfMandarin(text) {
    if (typeof text !== "string") return false;
    if (japaneseRegex.test(text)) return false;
    return chineseRegex.test(text);
}

export function filterTweet(tweets, language) {
    let filteredHistory = [];
    switch (language) {
        case "All":
            filteredHistory = tweets;
            break;
        case "Mandarin":
            filteredHistory = tweets.filter(checkIfMandarin);
            break;
        case "English":
            filteredHistory = tweets.filter(content => !checkIfMandarin(content));
            break;
        default:
            break;
    }
    return filteredHistory;
}
