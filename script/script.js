let allIssues = [];

// Load all isses
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      allIssues = json.data;
      displayIssues(allIssues);
    });
};

loadIssues();


// Status priority color
const getPriorityColor = (priority) => {

  if (priority === "high") {
    return "bg-red-100 text-red-600";
  }

  if (priority === "medium") {
    return "bg-yellow-100 text-yellow-600";
  }

  if (priority === "low") {
    return "bg-gray-200 text-gray-600";
  }

};


// labels show
const getLabels = (labels) => {

  return labels.map(label => {

    if (label === "bug") {
      return `<span class="bg-red-100 text-red-600 px-3 py-1 rounded text-md">BUG</span>`;
    }

    if (label === "help wanted") {
      return `<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded text-md">HELP WANTED</span>`;
    }

    if (label === "enhancement") {
      return `<span class="bg-green-100 text-green-600 px-3 py-1 rounded text-md">ENHANCEMENT</span>`;
    }

  }).join("");

};

// show issues
const displayIssues = (issues) => {
  document.getElementById("issues-count").innerText = issues.length;//Dynamic Issues count 
  const issusCard = document.getElementById('card-section');
  issusCard.innerHTML = '';

  for (let issue of issues) {
    const card = document.createElement('div');

    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    // status icon
    const statusImg = issue.status === "open"
      ? "asset/Open.png"       // open issue icon
      : "asset/Closed.png";    // closed issue icon

    card.innerHTML = `
      <div class="bg-white p-10 rounded-xl space-y-3 shadow-md text-left  transition duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:translate-y-[-4px] ${borderColor} ">

        <div class="flex justify-between items-center">

           <button>
             <img src="${statusImg}" alt="${issue.status}">
           </button>

           <span class="px-3 py-1 rounded text-md uppercase ${getPriorityColor(issue.priority)}">
             ${issue.priority}
           </span>

        </div>

        <h3 class="font-bold text-xl">${issue.title}</h3>
        <p class="text-md text-gray-600">${issue.description}</p>
        <div class="flex gap-2 mt-2">
          ${getLabels(issue.labels)}
        </div>
        <hr class="text-gray-200">

        <div class="text-lg text-gray-500">
          #${issue.id} by ${issue.author}
        </div>

        <p class="text-lg text-gray-400">
          ${new Date(issue.createdAt).toLocaleDateString()}
        </p>

      </div>
    `;
    issusCard.appendChild(card);
  }
};

// Tabs 
const tabButtons = document.querySelectorAll('.tab-btn');

// Set default active tab
tabButtons.forEach(btn => {
  if (btn.getAttribute('data-status') === 'all') {
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-soft');
  } else {
    btn.classList.add('btn-soft');
    btn.classList.remove('btn-primary');
  }
});

// Tab click event
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove primary from all
    tabButtons.forEach(b => {
      b.classList.remove('btn-primary');
      b.classList.add('btn-soft');
    });

    // Add primary to clicked
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-soft');

    //Tab filter
    const status = btn.getAttribute('data-status');
    if (status === 'all') {
      displayIssues(allIssues); // All issues
    } else {
      displayIssues(allIssues.filter(issue => issue.status === status));
    }
  });
});