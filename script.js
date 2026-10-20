
// Somewhere in Kashmir — ITINERARY GENERATOR

const tripPlans = [
    {
        title: "Arrive in Srinagar",
        place: "Srinagar",
        interests: ["culture", "relaxation"],
        activities: "Settle in, explore the Dal Lake area and enjoy a shikara ride if conditions permit.",
        tip: "Keep arrival day flexible, especially after a long journey."
    },
    {
        title: "Lakes, gardens & heritage",
        place: "Srinagar",
        interests: ["culture", "relaxation"],
        activities: "Visit Nishat Bagh or Shalimar Bagh, explore the old city's heritage, and consider Nigeen Lake.",
        tip: "Check garden opening times and allow time for local traffic."
    },
    {
        title: "Into the mountains",
        place: "Gulmarg",
        interests: ["nature", "adventure"],
        activities: "Explore Gulmarg's meadows and consider the Gondola if operating and tickets are available.",
        tip: "Mountain weather changes quickly. Check access and conditions before setting out."
    },
    {
        title: "Valleys of Pahalgam",
        place: "Pahalgam",
        interests: ["nature", "adventure"],
        activities: "Explore the scenery around Pahalgam and, subject to local access, visit Aru Valley or Betaab Valley.",
        tip: "Local transport and access rules may apply to individual sightseeing areas."
    },
    {
        title: "Riverside moments",
        place: "Pahalgam",
        interests: ["nature", "relaxation"],
        activities: "Enjoy the Lidder River surroundings, explore the town at a relaxed pace and visit a nearby attraction if time permits.",
        tip: "Keep this day flexible rather than trying to fit in every valley."
    },
    {
        title: "A golden mountain valley",
        place: "Sonamarg",
        interests: ["nature", "adventure"],
        activities: "Explore Sonamarg's mountain scenery and ask local operators about permitted excursions, including Thajiwas Glacier.",
        tip: "Check road conditions and excursion availability before travelling."
    },
    {
        title: "Discover a hidden gem",
        place: "Choose one nearby escape",
        interests: ["hidden", "nature"],
        activities: "Consider Doodhpathri or another suitable nearby destination, depending on your base and travel time.",
        tip: "Remote places such as Gurez Valley usually need more time and advance planning."
    }
];

const generateButton = document.getElementById("generate-plan");

if (generateButton) {
    generateButton.addEventListener("click", function () {
        const days = Number(document.getElementById("trip-days").value);

        const selectedInterests = Array.from(
            document.querySelectorAll('input[name="interest"]:checked')
        ).map(function (checkbox) {
            return checkbox.value;
        });

        const results = document.getElementById("itinerary-results");
        const planDays = document.getElementById("plan-days");
        const planTitle = document.getElementById("plan-title");
        const planSummary = document.getElementById("plan-summary");

        // Prioritise days matching the traveller's selected interests.
        const rankedPlans = tripPlans
            .map(function (plan, index) {
                const score = plan.interests.filter(function (interest) {
                    return selectedInterests.includes(interest);
                }).length;

                return { ...plan, score: score, originalIndex: index };
            })
            .sort(function (a, b) {
                return b.score - a.score || a.originalIndex - b.originalIndex;
            });

        // Select the requested number of days, then restore the intended order.
        const chosenPlans = rankedPlans
            .slice(0, days)
            .sort(function (a, b) {
                return a.originalIndex - b.originalIndex;
            });

        planTitle.textContent = days + "-Day Kashmir Itinerary";

        planSummary.textContent = selectedInterests.length
            ? "A suggested plan shaped around your selected interests. Adjust it to suit your arrival point, pace and travel dates."
            : "A balanced starter itinerary. Select interests for a more personalised suggestion.";

        planDays.innerHTML = "";

        chosenPlans.forEach(function (plan, index) {
            const card = document.createElement("article");
            card.className = "plan-day";

            const dayLabel = document.createElement("span");
            dayLabel.textContent = "DAY " + (index + 1);

            const heading = document.createElement("h3");
            heading.textContent = plan.title;

            const location = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = "Destination: ";
            location.appendChild(strong);
            location.appendChild(document.createTextNode(plan.place));

            const activities = document.createElement("p");
            activities.textContent = plan.activities;

            const tip = document.createElement("p");
            tip.className = "day-tip";
            tip.textContent = "Travel note: " + plan.tip;

            card.append(dayLabel, heading, location, activities, tip);
            planDays.appendChild(card);
        });

        results.hidden = false;
        results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

const printButton = document.getElementById("print-plan");

if (printButton) {
    printButton.addEventListener("click", function () {
        window.print();
    });
}
