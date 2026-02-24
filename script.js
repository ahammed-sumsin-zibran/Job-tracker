// start with basic counters
let interviews = 0;
let rejects = 0;
let totalJobs = document.querySelectorAll(".job-card").length;

const totalDisplay = document.getElementById("total-count");
const interviewDisplay = document.getElementById("interview-count");
const rejectedDisplay = document.getElementById("rejected-count");
const jobsCountDisplay = document.getElementById("section-count");

// empty states
const emptyAll = document.getElementById("empty-all");
const emptyInterview = document.getElementById("empty-interview");
const emptyRejected = document.getElementById("empty-rejected");

function refreshNumbers() {
  totalDisplay.textContent = totalJobs;
  interviewDisplay.textContent = interviews;
  rejectedDisplay.textContent = rejects;
}

function showCorrectTab() {
  let active = "all";
  const activeBtn = document.querySelector(".tab-btn.active");
  if (activeBtn) active = activeBtn.dataset.tab;

  let shown = 0;

  document.querySelectorAll(".job-card").forEach((card) => {
    let visible = false;

    if (active === "all") {
      visible = true;
    } else if (active === "interview" && card.dataset.status === "interview") {
      visible = true;
    } else if (active === "rejected" && card.dataset.status === "rejected") {
      visible = true;
    }

    if (visible) {
      card.classList.remove("hidden");
      shown++;
    } else {
      card.classList.add("hidden");
    }
  });

  // update small count next to title
  jobsCountDisplay.textContent = shown + (shown === 1 ? " job" : " jobs");

  // show right empty message
  emptyAll.classList.add("hidden");
  emptyInterview.classList.add("hidden");
  emptyRejected.classList.add("hidden");

  if (shown === 0) {
    if (active === "all") emptyAll.classList.remove("hidden");
    if (active === "interview") emptyInterview.classList.remove("hidden");
    if (active === "rejected") emptyRejected.classList.remove("hidden");
  }
}

// tab buttons
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    showCorrectTab();
  });
});

// handle each job card
document.querySelectorAll(".job-card").forEach((card) => {
  const tag = card.querySelector("[data-status-tag]");
  const btnInterview = card.querySelector('[data-action="interview"]');
  const btnReject = card.querySelector('[data-action="rejected"]');
  const trash = card.querySelector(".trash-btn");

  function changeStatus(to) {
    const was = card.dataset.status;

    if (was === "interview") interviews--;
    if (was === "rejected") rejects--;

    if (to === "interview") interviews++;
    if (to === "rejected") rejects++;

    card.dataset.status = to;

    tag.className = "status-tag status-" + to;
    tag.textContent =
      to === "not-applied"
        ? "NOT APPLIED"
        : to === "interview"
          ? "INTERVIEW"
          : "REJECTED";

    btnInterview.disabled = to === "interview";
    btnReject.disabled = to === "rejected";

    refreshNumbers();
    showCorrectTab();
  }

  if (btnInterview) btnInterview.onclick = () => changeStatus("interview");
  if (btnReject) btnReject.onclick = () => changeStatus("rejected");

  // disable buttons if already set
  if (card.dataset.status === "interview") btnInterview.disabled = true;
  if (card.dataset.status === "rejected") btnReject.disabled = true;

  // delete card
  if (trash) {
    trash.onclick = () => {
      const current = card.dataset.status;

      if (current === "interview") interviews--;
      if (current === "rejected") rejects--;

      totalJobs--;
      card.remove();

      refreshNumbers();
      showCorrectTab();
    };
  }
});

// first load
refreshNumbers();
showCorrectTab();
