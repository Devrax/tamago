import timeDifference from "../utils/timeDifference";

export default class Tamago extends HTMLElement {

    private paragraph = document.createElement('p');

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const from = this.getAttribute('from')!,
        to = this.getAttribute('to')!;
        this.paragraph.setAttribute('class', 'tamago');
        this.paragraph.textContent = this.processTime(from, to);
        this.shadowRoot!.append(this.paragraph);
    }

    public attributeChangedCallback() {
        const from = this.getAttribute('from')!,
        to = this.getAttribute('to')!;
        this.paragraph.textContent = this.processTime(from, to);
    }

    public processTime(from: string, to:string) {
        const conversionFrom = new Date(from), conversionTo = new Date(to), locale = this.getAttribute('locale');
        return timeDifference(conversionFrom, conversionTo, locale!);
    }

}
