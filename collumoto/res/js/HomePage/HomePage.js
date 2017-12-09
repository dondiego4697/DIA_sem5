import './home.scss';
import BasePage from '../BasePage';
import {appendChild, createElement} from '../util/htmlElement';
import PhotoCard from './PhotoCard/PhotoCard';
import {request} from "../util/http";
import urls from "../util/urls";
import AddPhotoPopup from "../AddPhotoPopup/AddPhotoPopup";

export default class HomePage extends BasePage {
    constructor() {
        super();
        this._photoLimit = 10;
        this._photoOffset = 0;
        this._nodeHome = document.getElementById('home');
        this._listContainer = document.getElementById('list-container');
        this._addPhotoPopup = new AddPhotoPopup(this);
        this._btnAddPhotoHandler = this._btnAddPhotoHandler.bind(this);
        this._init();
    }

    _init() {
        debugger;
        this._btnAddPhoto = HomePage._createBtnAddPhoto();
        appendChild(this._nodeHome, this._btnAddPhoto);
        this._initBtnAddPhotoListener();

        this._getNewPhotos();
    }

    static _createBtnAddPhoto() {
        const btn = createElement('div', {
            'class': 'btn-add'
        });
        const plus = createElement('div', {
            'class': 'btn-add_plus'
        });
        appendChild(btn, plus);
        return btn;
    }

    _initBtnAddPhotoListener() {
        this._btnAddPhoto.addEventListener('click', this._btnAddPhotoHandler)
    }

    _btnAddPhotoHandler() {
        this._addPhotoPopup.addPopup();
    }

    _offsetCrement(isDecrement) {
        this._photoOffset += isDecrement ? -this._photoLimit : this._photoLimit;
    }

    _getNewPhotos() {
        this.showBlocker();
        request(urls.getPhotos(this._photoLimit, this._photoOffset), {}).then(res => {
            this.hideBlocker();
            //TODO нормальные данные подтягивать
            /*for (let i = 1; i < 8; i++) {
                const photoCard = new PhotoCard(this._listContainer, {
                    likesCount: i * 100,
                    link: '/res/7579.jpg'
                }, {
                    likesCount: i * 200,
                    link: '/res/7579.jpg'
                });
                photoCard.addToNode();
            }*/
        });
    }
}