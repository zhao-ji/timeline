const chineseRegex = /[\u4e00-\u9fff]/;
const japaneseRegex = /[\u3040-\u30ff]/;

export default function checkIfMandarin(text) {
    if (typeof text !== "string") return false;
    if (japaneseRegex.test(text)) return false;
    return chineseRegex.test(text);
}
