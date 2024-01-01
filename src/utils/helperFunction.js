
export const roundToNearestWholeNumber = (decimalNumber) => {
    return Math.round(decimalNumber / 2);
}

export const isEmpty = (obj) => !Object.keys(obj).length > 0;

export const findProp = (arr, id) => arr.some((item) => item.id === id)

export const uniqueData = (data) => [...new Set(data.map(obj => obj.id))].map(id => data.find(obj => obj.id === id));

