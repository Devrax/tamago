export default function timeDifference(from: Date, to: Date, lang?: string): string {
    const timeFrom = from.getTime(), timeTo = to.getTime(),
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
            : { timeStep: "minute", time: resultAbs * 24 * 60 },
            val = timeFrom > timeTo ? -t : t;

return relativeTimeFormatter.format(
    Math.ceil(val),
    timeStep as Intl.RelativeTimeFormatUnit
);
}