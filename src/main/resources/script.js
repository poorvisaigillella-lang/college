
// CampusConnect Event Data

const events = [
    {
        id: 1,
        title: "Web Development Workshop",
        category: "Workshop",
        date: "2026-12-05",
        time: "10:00 AM - 1:00 PM",
        venue: "Computer Science Lab",
        icon: "💻",
        description:
            "Learn HTML, CSS and JavaScript through hands-on activities. Build your first responsive website with guidance from experienced trainers."
    },
    {
        id: 2,
        title: "Artificial Intelligence Seminar",
        category: "Seminar",
        date: "2026-12-12",
        time: "11:00 AM - 1:00 PM",
        venue: "Main Auditorium",
        icon: "🤖",
        description:
            "Explore artificial intelligence, machine learning and their applications in modern industries. Interact with guest speakers and technology experts."
    },
    {
        id: 3,
        title: "Annual Cultural Fest",
        category: "Event",
        date: "2026-12-20",
        time: "9:00 AM - 5:00 PM",
        venue: "College Ground",
        icon: "🎭",
        description:
            "Celebrate creativity and talent with music, dance, drama, competitions and exciting student performances."
    },
    {
        id: 4,
        title: "Python Programming Workshop",
        category: "Workshop",
        date: "2027-01-08",
        time: "10:00 AM - 2:00 PM",
        venue: "Programming Lab",
        icon: "🐍",
        description:
            "An interactive workshop covering Python fundamentals, programming logic and practical coding exercises."
    },
    {
        id: 5,
        title: "Entrepreneurship Seminar",
        category: "Seminar",
        date: "2027-01-15",
        time: "2:00 PM - 4:00 PM",
        venue: "Seminar Hall",
        icon: "🚀",
        description:
            "Understand startup ecosystems, business planning, innovation and entrepreneurial opportunities with industry professionals."
    },
    {
        id: 6,
        title: "Sports Day Celebration",
        category: "Event",
        date: "2027-01-25",
        time: "8:00 AM - 4:00 PM",
        venue: "College Sports Ground",
        icon: "🏆",
        description:
            "Participate in athletics, team sports and fun competitions while celebrating teamwork and sportsmanship."
    }
];

const eventContainer = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const noEvents = document.getElementById("noEvents");

const modal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");

function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");

    return {
        day: date.getDate(),
        month: date.toLocaleString("en-US", {
            month: "short"
        })
    };
}

function displayEvents(data) {
    eventContainer.innerHTML = "";

    document.getElementById("eventCount").textContent =
        events.filter(event =>
            new Date(event.date + "T23:59:59") >= new Date()
        ).length;

    if (data.length === 0) {
        noEvents.hidden = false;
        return;
    }

    noEvents.hidden = true;

    data.forEach(event => {
        const date = formatDate(event.date);

        const card = document.createElement("article");
        card.className = "event-card";

        const top = document.createElement("div");
        top.className = "card-top";

        const dateBox = document.createElement("div");
        dateBox.className = "date-box";

        const day = document.createElement("strong");
        day.textContent = date.day;

        const month = document.createElement("small");
        month.textContent = date.month.toUpperCase();

        dateBox.append(day, month);

        const icon = document.createElement("span");
        icon.className = "card-icon";
        icon.textContent = event.icon;

        top.append(dateBox, icon);

        const body = document.createElement("div");
        body.className = "card-body";

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = event.category;

        const heading = document.createElement("h3");
        heading.textContent = event.title;

        const description = document.createElement("p");
        description.textContent = event.description;

        const info = document.createElement("div");
        info.className = "event-info";
        info.textContent =
            "📅 " + event.date + "\n" +
            "🕒 " + event.time + "\n" +
            "📍 " + event.venue;

        info.style.whiteSpace = "pre-line";

        const button = document.createElement("button");
        button.className = "details-btn";
        button.textContent = "View Event Details";

        button.addEventListener("click", () => {
            showDetails(event.id);
        });

        body.append(
            category,
            heading,
            description,
            info,
            button
        );

        card.append(top, body);
        eventContainer.appendChild(card);
    });
}

function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = events.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        const isUpcoming =
            new Date(event.date + "T23:59:59") >= new Date();

        return matchesSearch && matchesCategory && isUpcoming;
    });

    displayEvents(filtered);
}

function showDetails(id) {
    const event = events.find(item => item.id === id);

    if (!event) return;

    document.getElementById("modalCategory").textContent =
        event.category;

    document.getElementById("modalTitle").textContent =
        event.title;

    document.getElementById("modalDate").textContent =
        "📅 Date: " + event.date;

    document.getElementById("modalTime").textContent =
        "🕒 Time: " + event.time;

    document.getElementById("modalVenue").textContent =
        "📍 Venue: " + event.venue;

    document.getElementById("modalDescription").textContent =
        event.description;

    modal.classList.add("show");
}

searchInput.addEventListener("input", filterEvents);

categoryFilter.addEventListener("change", filterEvents);

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        modal.classList.remove("show");
    }
});

// Initial page rendering
filterEvents();
