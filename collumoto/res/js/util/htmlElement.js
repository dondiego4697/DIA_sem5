export function createElement(type, attributes, inner) {
    const el = document.createElement(type);
    if (attributes) {
        Object.keys(attributes).forEach(key => {
            el.setAttribute(key, attributes[key]);
        });
    }
    if (inner) el.innerHTML = inner;
    return el;
}

export function appendChild(parent, child) {
    parent.appendChild(child);
}

export function removeChild(paren, child) {
    paren.removeChild(child);
}