export function csv2Json(data: string) {
    let json = [];

    const linebreak = data.split("\n");
    let i = 1;
    const len = linebreak.length - 1;
    const keys = linebreak[0].split(",");

    for (; i < len; i++) {
        const obj: any = new Object();
        const line = linebreak[i].split(",");

        for (let j = 0; j < keys.length; j++) {
            const key: string = keys[j];
            const k_1 = keys.length - 1;

            if (j === k_1) {
                const lastKey = key.replace('"', "");
                const lastValue = line[j].replace("\r", "");

                obj[lastKey.trim()] = lastValue;
            } else {
                obj[key] = line[j];
            }
        }
        json.push(obj);
    }
    return json;
}
