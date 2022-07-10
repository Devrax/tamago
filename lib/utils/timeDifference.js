export default function timeDifference(from, to, lang) {
    const timeFrom = from.getTime(), timeTo = to.getTime(), relativeTimeFormatter = new Intl.RelativeTimeFormat(lang || "en", {
        localeMatcher: "best fit",
        numeric: "always",
        style: "long",
    }), result = (timeFrom - timeTo) / 86400000, resultAbs = Math.abs(result), { timeStep, time: t } = resultAbs / 365 >= 1
        ? { timeStep: "year", time: resultAbs / 365 }
        : resultAbs / 30 >= 1
            ? { timeStep: "month", time: resultAbs / 29 }
            : resultAbs / 1 >= 1
                ? { timeStep: "day", time: resultAbs / 1 }
                : resultAbs * 24 >= 1
                    ? { timeStep: "hour", time: resultAbs * 24 }
                    : { timeStep: "minute", time: resultAbs * 24 * 60 }, val = timeFrom > timeTo ? -t : t;
    return relativeTimeFormatter.format(Math.ceil(val), timeStep);
}
//# sourceMappingURL=timeDifference.js.map