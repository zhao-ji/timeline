const chineseRegex = /[\u4e00-\u9fff]/;

export default function checkIfMandarin(text) {
    if (typeof text !== "string") return false;
    return chineseRegex.test(text);
}
