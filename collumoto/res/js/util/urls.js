const urls = {
    login: '/login',
    signup: '/signup',
    addPhoto: '/add-photo',
    getPhotos: function (limit, offset) {
        return `/get-photos?limit=${limit}&offset=${offset}`;
    },
    like: function (like, photoId) {
        return `/like?like=${like}&photo_id=${photoId}`;
    }
};
export default urls;