const urls = {
    login: '/login',
    signup: '/signup',
    getPhotos: function (limit, offset) {
        return `/get_photos?limit=${limit}&offset=${offset}`
    }
};
export default urls;