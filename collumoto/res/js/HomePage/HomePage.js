import './home.css';
import BasePage from "../BasePage";
import {appendChild, createElement} from "../util/htmlElement";

export default class HomePage extends BasePage{
    constructor() {
        super();

        this._nodeHome = document.getElementById('home');
        this._listContainer = document.getElementById('list-container');
        this._btnAddPhotoHandler = this._btnAddPhotoHandler.bind(this);
        this._init();
    }

    _init() {
        this._btnAddPhoto = HomePage._createBtnAddPhoto();
        appendChild(this._nodeHome, this._btnAddPhoto);
        this._initBtnAddPhotoListener();
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
        alert(123);
    }
}