import '../css/main.scss';
import '../css/brand.scss';
import '../css/nav.scss';

import AuthPage from './AuthPage/AuthPage';
import HomePage from "./HomePage/HomePage";
import PhotoPage from "./PhotoPage/PhotoPage";

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    const href = location.href;
    if (href.indexOf('auth') !== -1) {
        const authPage = new AuthPage();
    } else if (href.indexOf('photo') !== -1) {
        const photoPage = new PhotoPage();
    } else {
        const homePage = new HomePage();
    }
}