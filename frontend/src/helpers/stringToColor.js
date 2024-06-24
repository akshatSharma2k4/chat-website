function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    const length = string ? string.length : 0;

    for (i = 0; i < length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export default stringToColor;
