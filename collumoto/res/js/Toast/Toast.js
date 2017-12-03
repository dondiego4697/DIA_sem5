import iziToast from "izitoast";
import "../../../node_modules/izitoast/dist/css/iziToast.min.css";
export default class Toast {
    constructor() {

    }

    static showError(title, message = '') {
        iziToast.error({
            title,
            message
        });
    }
}