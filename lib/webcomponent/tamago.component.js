import timeDifference from "../utils/timeDifference";
export default class Tamago extends HTMLElement {
    constructor() {
        super();
        this.paragraph = document.createElement('p');
        this.attachShadow({ mode: 'open' });
        const from = this.getAttribute('from'), to = this.getAttribute('to');
        this.paragraph.setAttribute('class', 'tamago');
        this.paragraph.textContent = this.processTime(from, to);
        this.shadowRoot.append(this.paragraph);
    }
    attributeChangedCallback() {
        const from = this.getAttribute('from'), to = this.getAttribute('to');
        this.paragraph.textContent = this.processTime(from, to);
    }
    processTime(from, to) {
        const conversionFrom = new Date(from), conversionTo = new Date(to), locale = this.getAttribute('locale');
        return timeDifference(conversionFrom, conversionTo, locale);
    }
}
//# sourceMappingURL=tamago.component.js.map