const urls = {
    login: '/login',
    signup: '/signup',
    addPhoto: '/addPopup-photo',
    getPhotos: function (limit, offset) {
        return `/get-photos?limit=${limit}&offset=${offset}`
    }
};
export default urls;