import './photoPopup.scss';
import {appendChild, createElement, removeChild} from "../util/htmlElement";
import Toast from "../Toast/Toast";
import {request} from "../util/http";
import urls from "../util/urls";
import getCsrf from "../util/csrf";
import {check200} from "../util/checkStatus";

export default class AddPhotoPopup {
    constructor(page) {
        this._page = page;
    }

    addPopup() {
        this._photoPopup = createElement('div', {
            'class': 'photo-popup'
        });

        this._photoPopupContainer = createElement('div', {
            'class': 'photo-popup-container'
        });

        this._name = createElement('input', {
            'class': 'text-field',
            type: 'text',
            placeholder: 'photo name'
        });

        this._description = createElement('textarea', {
            'class': 'text-field',
            rows: 5,
            placeholder: 'photo description'
        });

        this._imgFile = createElement('input', {
            type: 'file'
        });

        this._imgContainer = createElement('img', {
            'class': 'hidden',
            width: 300
        });

        this._submit = createElement('input', {
            'class': 'button',
            type: 'button',
            value: 'Add'
        });

        this._close = createElement('span', {
            'class': 'close'
        });

        appendChild(this._photoPopupContainer, this._name);
        appendChild(this._photoPopupContainer, this._description);
        appendChild(this._photoPopupContainer, this._imgFile);
        appendChild(this._photoPopupContainer, this._imgContainer);
        appendChild(this._photoPopupContainer, this._submit);
        appendChild(this._photoPopupContainer, this._close);

        appendChild(this._photoPopup, this._photoPopupContainer);
        appendChild(document.body, this._photoPopup);

        this._setListeners();
        this._setListenersImg();
        this._setListenersClose();
        this._setListenersSubmit();
    }

    removePopup() {
        removeChild(document.body, this._photoPopup);
    }

    _hideImg() {
        this._imgContainer.classList.add('hidden');
    }

    _showImg() {
        this._imgContainer.classList.remove('hidden');
    }

    _setListenersClose() {
        this._close.addEventListener('click', () => {
            this.removePopup();
        });
    }

    _setListeners() {
        this._name.oninput = () => {
            this._name.classList.remove('error');
        };

        this._description.oninput = () => {
            this._description.classList.remove('error');
        };
    }

    _setListenersImg() {
        this._imgFile.onchange = (el) => {
            const target = el.currentTarget;
            if (target.files && target.files[0]) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this._imgContainer.setAttribute('src', e.target.result);
                    this._imgResultData = e.target.result;
                    this._showImg();
                };

                reader.readAsDataURL(target.files[0]);
            }
        }
    }

    _setListenersSubmit() {
        this._submit.addEventListener('click', () => {
            let check = true;
            if (this._name.value.trim() === '') {
                this._name.classList.add('error');
                check = false;
            }

            if (this._description.value.trim() === '') {
                this._description.classList.add('error');
                check = false;
            }

            if (!this._imgResultData) {
                check = false;
                Toast.showError('Upload photo');
            }

            if (!check) return;
            this._sendPhotoData();
        });
    }

    _sendPhotoData() {
        this._page.showBlocker();
        request(urls.addPhoto, {
            'X-CSRFToken': getCsrf()
        }, 'POST', {
            name: this._name.value,
            description: this._description.value,
            photo: this._imgResultData
        }).then(data => {
            if (!check200(data.status)) {
                throw new Error('Wrong data');
            }
            this._page.hideBlocker();
            this.removePopup();
            this._page._refresh();
        }).catch(err => {
            this._page.hideBlocker();
            Toast.showError(err.message);
        });
    }
}