class Tamago extends HTMLParagraphElement {

    private paragraph = document.createElement('p');

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const from = this.getAttribute('from')!,
        to = this.getAttribute('to')!;
        this.paragraph.textContent = this.processTime(from, to);
        this.shadowRoot!.append(this.paragraph);
    }

    public attributeChangedCallback() {
        const from = this.getAttribute('from')!,
        to = this.getAttribute('to')!;
        this.paragraph.textContent = this.processTime(from, to);
    }

    public processTime(from: string, to:string) {
        const conversionFrom = new Date(from), conversionTo = new Date(to);
        return this.timeDifference(conversionFrom, conversionTo);
    }

    public timeDifference(from: Date, to: Date): string {
        const timeFrom = from.getTime(), timeTo = to.getTime(),
        lang = this.getAttribute('locale'),
        relativeTimeFormatter = new Intl.RelativeTimeFormat(lang || "en", {
			localeMatcher: "best fit", // other values: "lookup"
			numeric: "always", // other values: "auto"
			style: "long", // other values: "short" or "narrow"
		}),
		result = (timeFrom - timeTo) / 86_400_000,
		resultAbs = Math.abs(result),
		{ timeStep, time: t } =
			resultAbs / 365 >= 1
				? { timeStep: "year", time: resultAbs / 365 }
				: resultAbs / 30 >= 1
				? { timeStep: "month", time: resultAbs / 29 }
				: resultAbs / 1 >= 1
				? { timeStep: "day", time: resultAbs / 1 }
				: resultAbs * 24 >= 1
				? { timeStep: "hour", time: resultAbs * 24 }
				: { timeStep: "minute", time: resultAbs * 24 * 60 };

	return relativeTimeFormatter.format(
		Math.ceil(-t),
		timeStep as Intl.RelativeTimeFormatUnit
	);
    }

}

customElements.define('time-ago', Tamago);