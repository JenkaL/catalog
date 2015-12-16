export function filterByType(){
    return (arr, type) => arr.filter(item => item.type === type);
}
