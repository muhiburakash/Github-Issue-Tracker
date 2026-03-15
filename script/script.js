let allIssues = [];

const loadIssues = () => {

  manageSpinner(true); //spinner show

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      allIssues = json.data;
      displayIssues(allIssues);

      manageSpinner(false);//spinner hide
    });

};
//Loading spinner 
const manageSpinner = (status) => {
  const spinner = document.getElementById('spinner');

  if (status) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}
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


// labels 
const getLabels = (labels) => {

  return labels.map(label => {

    if (label === "bug") {
      return `<span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-md">BUG</span>`;
    }

    if (label === "help wanted") {
      return `<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-md">HELP WANTED</span>`;
    }

    if (label === "enhancement") {
      return `<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-md">ENHANCEMENT</span>`;
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
      <div onclick="loadSingleIssue(${issue.id})" class="bg-white p-10 rounded-xl space-y-3 shadow-md text-left transition duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:translate-y-[-4px] ${borderColor}">

        <div class="flex justify-between items-center">

           <button>
             <img src="${statusImg}" alt="${issue.status}">
           </button>

           <span class="px-3 py-1 rounded-full text-md uppercase ${getPriorityColor(issue.priority)}">
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
    // Remove primary btn from all
    tabButtons.forEach(b => {
      b.classList.remove('btn-primary');
      b.classList.add('btn-soft');
    });

    // Add primary btn
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

document.getElementById('search-btn').addEventListener('click', () => {

  const input = document.getElementById('search-input');
  const searchValue = input.value.trim().toLowerCase();

  const filteredIssues = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchValue)
  );

  displayIssues(filteredIssues);

});
// Load single issue by ID
const loadSingleIssue = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displaySingleIssue(data.data);

};

const displaySingleIssue = (issue) => {

  const singleIssue = document.getElementById('single-issue');
  const statusImg = issue.status === "open"
    ? "opened"
    : "closed";
  singleIssue.innerHTML = `
      <h3 class="font-bold text-xl">${issue.title}</h3>
      <div class="flex items-center gap-2">
      <button class="border-none bg-green-700 text-white rounded-full py-1 px-3">${issue.status}</button>
      <p class="flex items-center gap-1 text-sm text-[#64748B]"><span class="text-[5px]"><i class="fa-solid fa-circle"></i></span> ${issue.status} by ${issue.author} <span class="text-[5px]"><i class="fa-solid fa-circle"></i></span> ${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>
      
      <p class="text-md text-gray-600">${issue.description}</p>
      <div class="flex gap-2 mt-2">
          ${getLabels(issue.labels)}
        </div>
      <div class="bg-slate-100 p-3 rounded-md flex">
      <div class="w-50">
      <p>Assignee:</p>
      
      <p class="font-semibold">${issue.assignee ? issue.assignee : 'No Assignee'}</p>
      </div> 
      <div class="w-50">
      <p class="pb-2">Priority:</p>
      <span class="px-3 py-1 rounded-full text-md  ${getPriorityColor(issue.priority)}">${issue.priority}</span>
      </div>
      </div>
    
  `;

  document.getElementById('my_modal_5').showModal();
};