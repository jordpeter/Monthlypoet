// ---- Configure this month here ----
// Update these values on the 1st each month.
const CONFIG = {
  theme: "The joy of a yellow bouncy ball",
  wordleWords: ["POPPY","DREAD","TIZZY","FRILL"],
  // Link your real forms here:
  submissionFormUrl: "#submit-form", // e.g. https://tally.so/r/xxxx
  votingFormUrl: "#vote-form",       // e.g. https://tally.so/r/yyyy
  // Schedule (local time of the visitor)
  submissionCloseDay: 7,   // last day to submit
  votingCloseDay: 14,      // last day to vote
  revealHour: 9,           // 24h clock
  revealMinute: 0
};

// ---- Helpers ----
function fmtDate(d){
  return d.toLocaleString(undefined, {
    weekday: "short", year:"numeric", month:"short", day:"numeric",
    hour:"2-digit", minute:"2-digit"
  });
}

function phaseForNow(now){
  const y = now.getFullYear();
  const m = now.getMonth();
  const submissionClose = new Date(y, m, CONFIG.submissionCloseDay, 23, 59, 0);
  const votingClose     = new Date(y, m, CONFIG.votingCloseDay, 23, 59, 0);
  const revealDate      = new Date(y, m, 15, CONFIG.revealHour, CONFIG.revealMinute, 0);

  if (now <= submissionClose) return {phase: "submit", submissionClose, votingClose, revealDate};
  if (now <= votingClose)     return {phase: "vote", submissionClose, votingClose, revealDate};
  if (now <= revealDate)      return {phase: "waiting", submissionClose, votingClose, revealDate};
  return {phase: "archive", submissionClose, votingClose, revealDate};
}

// ---- Init ----
(function init(){
  const now = new Date();
  const {phase, submissionClose, votingClose, revealDate} = phaseForNow(now);

  // Fill content
  document.getElementById("theme").textContent = CONFIG.theme;
  document.getElementById("archiveTheme").textContent = "Theme: " + CONFIG.theme;
  document.getElementById("archiveWords").textContent = "Words: " + CONFIG.wordleWords.join(", ");
  document.getElementById("words").innerHTML = CONFIG.wordleWords
    .map(w => `<li>${w}</li>`).join("");

  document.getElementById("subClose").textContent = fmtDate(submissionClose);
  document.getElementById("voteClose").textContent = fmtDate(votingClose);
  document.getElementById("revealDate").textContent = fmtDate(revealDate);
  document.getElementById("archiveMonth").textContent = now.toLocaleString(undefined, {month:"long", year:"numeric"});

  document.getElementById("year").textContent = now.getFullYear();

  // Buttons
  const submitBtn = document.getElementById("submitBtn");
  const voteBtn = document.getElementById("voteBtn");
  submitBtn.href = CONFIG.submissionFormUrl;
  voteBtn.href = CONFIG.votingFormUrl;

  // Phase controls
  const note = document.getElementById("phaseNote");
  if (phase === "submit"){
    voteBtn.classList.add("disabled");
    voteBtn.setAttribute("aria-disabled","true");
    note.textContent = "Submissions are open. Voting unlocks on the 8th for submitters.";
  } else if (phase === "vote"){
    submitBtn.classList.add("disabled");
    submitBtn.setAttribute("aria-disabled","true");
    note.textContent = "Voting is open for those who submitted a poem this month.";
  } else if (phase === "waiting"){
    submitBtn.classList.add("disabled");
    voteBtn.classList.add("disabled");
    submitBtn.setAttribute("aria-disabled","true");
    voteBtn.setAttribute("aria-disabled","true");
    note.textContent = "Thanks for playing! Results reveal on " + fmtDate(revealDate) + ".";
  } else {
    // archive
    note.textContent = "This round has ended. See results in the Archive below.";
  }
})();
