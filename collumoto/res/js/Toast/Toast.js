import iziToast from "izitoast";
import "../../../node_modules/izitoast/dist/css/iziToast.min.css";
export default class Toast {
    constructor() {

    }

    static showError(title, message = '') {
        iziToast.show({
            title,
            message,
            backgroundColor: '#DD0A17',
            messageColor: '#fff',
            titleColor: '#fff',
            position: 'topRight'
        });
    }
}