export default {
    // Credit to https://stackoverflow.com/a/16348977 to generate a random (but consistant) hash for color
    stringToHexColor(str) {
        let hash = 0;
        for (let x = 0; x < str.length; x++) {
            hash = str.charCodeAt(x) + ((hash << 5) - hash);
        }
        let colour = "#";
        for (let y = 0; y < 3; y++) {
            let value = (hash >> (y * 8)) & 0xFF;
            colour += ("00" + value.toString(16)).substr(-2);
        }
        return colour;
    }
}