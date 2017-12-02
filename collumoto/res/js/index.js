import '../css/main.css';
import '../css/brand.css';
import '../css/nav.css';

import AuthPage from './AuthPage/AuthPage';

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    if (location.href.indexOf('auth') !== -1) {
        const authPage = new AuthPage();
    }
}