import './home.scss';
import BasePage from '../BasePage';
import {appendChild, createElement} from '../util/htmlElement';
import PhotoCard from './PhotoCard/PhotoCard';
import {request} from "../util/http";
import urls from "../util/urls";
import AddPhotoPopup from "../AddPhotoPopup/AddPhotoPopup";
import PhotoPair from "./PhotoCard/PhotoPair";
import Toast from "../Toast/Toast";

export default class HomePage extends BasePage {
    constructor() {
        super();
        this._photoList = [];
        this._isReadyToScroll = true;
        this._clearLimitAndOffset();
        this._nodeHome = document.getElementById('home');
        this._listContainer = document.getElementById('list-container');
        this._addPhotoPopup = new AddPhotoPopup(this);
        this._btnAddPhotoHandler = this._btnAddPhotoHandler.bind(this);
        this._init();
    }

    _init() {
        this._btnAddPhoto = HomePage._createBtnAddPhoto();
        appendChild(this._nodeHome, this._btnAddPhoto);
        this._initBtnAddPhotoListener();

        this._getNewPhotos().then(() => {
            this._initScrollListener();
        });
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

    _clearLimitAndOffset() {
        this._canLoadMore = true;
        this._photoLimit = 10;
        this._photoOffset = 0;
    }

    _clearPhotoList() {
        this._photoList.forEach(photoPair => {
            photoPair.removePair();
        });
    }

    _refresh() {
        this._clearPhotoList();
        this._clearLimitAndOffset();
        this._getNewPhotos();
    }

    _initScrollListener() {
        window.onscroll = () => {
            const el = document.documentElement;
            if (el.scrollTop === el.scrollHeight - el.clientHeight && this._canLoadMore &&
                this._isReadyToScroll) {
                this._getNewPhotos();
            }
        }
    }

    _getNewPhotos() {
        this._isReadyToScroll = false;
        return new Promise((resolve, reject) => {
            this.showBlocker();
            request(urls.getPhotos(this._photoLimit, this._photoOffset)).then(res => {
                this.hideBlocker();
                const arrData = res.json.message;
                if (arrData.length < this._photoOffset) this._canLoadMore = false;
                const result = [];
                for (let i = 0; i < arrData.length; i += 2) {
                    result.push([arrData[i], arrData[i + 1]]);
                }

                result.forEach(pair => {
                    const photoPair = new PhotoPair(this._listContainer);

                    const photoCard1 = new PhotoCard(this, {
                        id: pair[0]['id'],
                        likesCount: pair[0]['likes_count'],
                        isLiked: pair[0]['is_liked'],
                        link: `res/${pair[0].img.slice(7)}`
                    });
                    photoPair.addCard(photoCard1);


                    if (typeof pair[1] !== 'undefined') {
                        const photoCard2 = new PhotoCard(this, {
                            id: pair[1]['id'],
                            likesCount: pair[1]['likes_count'],
                            isLiked: pair[1]['is_liked'],
                            link: `res/${pair[1].img.slice(7)}`
                        });
                        photoPair.addCard(photoCard2);
                    }
                    this._photoList.push(photoPair);
                });
                this._offsetCrement();
                this._isReadyToScroll = true;
                resolve();
            }).catch(err => {
                Toast.showError(err.message);
                reject();
            });
        });
    }
}