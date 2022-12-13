import stringSimilarity from 'string-similarity';

export const rankedSearchResults = (searchTerm: string, searchList: any[], searchKey: string) => {
    const matches = stringSimilarity.findBestMatch(searchTerm, searchList.map(li => li[searchKey])).ratings;
    return matches.sort((a, b) => b.rating-a.rating).map((rating => rating.target));
};

export const stringSortFunction = (a: string, b: string) => {
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
}