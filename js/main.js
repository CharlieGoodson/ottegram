'use strict';

const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const ESC_KEY = 27;

function imageFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-title');
}

function setDetails(imageUrl, titleText) {
    const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumbnail) {
    thumbnail.addEventListener('click', (event) => {
        event.preventDefault();
        setDetailsFromThumb(thumbnail);
        showDetails();
    });
}

function getThumbnailsArray() {
    const thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    const thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetail() {
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
    document.body.addEventListener('keyup', event => {
        event.preventDefault();
        if (event.keyCode === ESC_KEY) {
            hideDetail();
        }
    });
}

function initializeEvents() {
    const thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();