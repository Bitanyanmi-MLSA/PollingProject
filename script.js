const pollData = {
    question: "Who is your favorite candidate?",
    options: ["Prince", "Benard", "Diego", "Justice"],
    votes: [0, 0, 0, 0,]
};

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitVoteButton = document.getElementById("submitVote");
const resultsElement = document.getElementById("results");
const resultsListElement = document.getElementById("resultsList");
const backToPollButton = document.getElementById("backToPoll");
const backToPollFromTableButton = document.getElementById("backToPollFromTable");

function renderPoll() {
    questionElement.textContent = pollData.question;
    const pollOptions = document.getElementById("pollOptions");
    pollOptions.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select an option";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    pollOptions.appendChild(defaultOption);
    pollData.options.forEach((option, index) => {
        const optionElement = document.createElement("option");
        optionElement.value = index;
        optionElement.textContent = option;
        pollOptions.appendChild(optionElement);
    });
}

function showResults() {
    updateVoteTable();
    document.getElementById("poll").style.display = "none";
    document.getElementById("voteTable").style.display = "table";
    backToPollFromTableButton.style.display = "block";
    saveCurrentView("table");
}

function backToPoll() {
    resultsElement.style.display = "none";
    document.getElementById("poll").style.display = "block";
}

backToPollFromTableButton.addEventListener("click", () => {
    document.getElementById("voteTable").style.display = "none";
    backToPollFromTableButton.style.display = "none";
    document.getElementById("poll").style.display = "block";
    document.getElementById("pollOptions").selectedIndex = 0; // Reset dropdown to default option
    saveCurrentView("poll");
});

function updateVoteTable() {
    const voteTableBody = document.getElementById("voteTableBody");
    voteTableBody.innerHTML = "";
    pollData.options.forEach((option, index) => {
        const row = document.createElement("tr");
        const optionCell = document.createElement("td");
        optionCell.textContent = option;
        optionCell.style.border = "1px solid #ddd";
        optionCell.style.padding = "8px";
        const voteCell = document.createElement("td");
        voteCell.textContent = pollData.votes[index];
        voteCell.style.border = "1px solid #ddd";
        voteCell.style.padding = "8px";
        row.appendChild(optionCell);
        row.appendChild(voteCell);
        voteTableBody.appendChild(row);
    });
    document.getElementById("voteTable").style.display = "table";
}

function saveVotesToLocalStorage() {
    localStorage.setItem("pollVotes", JSON.stringify(pollData.votes));
}

function loadVotesFromLocalStorage() {
    const savedVotes = localStorage.getItem("pollVotes");
    if (savedVotes) {
        pollData.votes = JSON.parse(savedVotes);
    }
}

// Track the current view (poll or table) in local storage
function saveCurrentView(view) {
    localStorage.setItem("currentView", view);
}

function loadCurrentView() {
    return localStorage.getItem("currentView") || "poll";
}

// Load the correct view on page load
window.addEventListener("load", () => {
    const currentView = loadCurrentView();
    if (currentView === "table") {
        showResults();
    } else {
        document.getElementById("poll").style.display = "block";
    }
});

// Load votes from local storage on page load
loadVotesFromLocalStorage();
renderPoll();

submitVoteButton.addEventListener("click", () => {
    const selectedOption = document.getElementById("pollOptions").value;
    const notification = document.getElementById("notification");
    if (selectedOption !== "") {
        const voteIndex = parseInt(selectedOption);
        pollData.votes[voteIndex]++;
        saveVotesToLocalStorage();
        updateVoteTable();
        showResults();
        notification.style.display = "none"; // Hide notification on successful submission
    } else {
        notification.style.display = "block"; // Show notification if no option is selected
    }
});

backToPollButton.addEventListener("click", backToPoll);
