import quote from './quote';

const arrayToCsv = (data, separator = ',', replacer) => {
    if (data == null) {
        return '';
    }

    if (!Array.isArray(data)) {
        throw new Error('The target argument should be an array.');
    }

    return data
        .map((elem) => {
            elem = replacer ? replacer(elem) : elem.toString();
            return elem.indexOf(separator) !== -1 ? quote(elem, '"') : elem;
        })
        .join(separator);
};

export default arrayToCsv;
