const cases = [
  {
    caseNum: 1,
    title: "Case #1: The Ledger's Origin",
    desc: "A mysterious funding request has surfaced. The audit trail points to the foundations of Financial Management itself. Identify which activity is responsible.",
    suspect: "The Finance Director",
    round: "CASE 1: FM Activities",
    questions: [
      { q: "Which financial management activity enables the IT organization to account fully for the way its money is spent?",
        options: ["Budgeting", "Accounting", "Chargeback", "Demand Modeling"],
        answer: 1 },
      { q: "Demand Modeling works with the process of Demand Management to anticipate usage of services by the business and the associated financial implications.",
        options: ["True", "False"],
        answer: 0 },
      { q: "According to the Financial Management overview, which of the following is a primary objective of the function?",
        options: [
          "To write and test software source code",
          "To quantify the value of IT services and guarantee efficient, cost-effective delivery",
          "To handle physical server maintenance and hardware replacement",
          "To manage external marketing and public relations campaigns"
        ],
        answer: 1 }
    ]
  },
  {
    caseNum: 2,
    title: "Case #2: The Vanishing Value",
    desc: "A critical IT service lost its value overnight. The CFO suspects a misclassification between cost centers and profit centers. Dig deeper.",
    suspect: "The CFO",
    round: "CASE 2: Service Valuation",
    questions: [
      { q: "In a Profit Center model, the IT department is positioned as a department that charges for the services it provides to the rest of the organization.",
        options: ["True", "False"],
        answer: 0 },
      { q: "A Cost Center is an IT department to which costs are assigned, but which does not charge for the services provided.",
        options: ["True", "False"],
        answer: 0 },
      { q: "Opportunity loss, such as missing business goals because IT staff spend time fixing old bugs instead of building new features, is classified as an intangible IT cost.",
        options: ["True", "False"],
        answer: 0 }
    ]
  },
  {
    caseNum: 3,
    title: "Case #3: The Silent Downtime",
    desc: "Three hours were lost last Tuesday. The system crashed, employees panicked, and productivity vanished. Uncover the hidden costs of intangible failures.",
    suspect: "The IT Director",
    round: "CASE 3: Intangible Costs",
    questions: [
      { q: "What is process disruption during a system migration?",
        options: [
          "Temporary slowdowns in daily business operations",
          "An increase in employee productivity",
          "A reduction in data entry errors",
          "An improvement in customer satisfaction"
        ],
        answer: 0 },
      { q: "What does opportunity loss mean in IT management?",
        options: [
          "Spending money on new computer hardware",
          "Missing business goals because IT staff spend time fixing old bugs",
          "Training employees to use new software",
          "Increasing the number of system features"
        ],
        answer: 1 },
      { q: "How can poor system design lead to data errors?",
        options: [
          "By making information easier to understand",
          "By improving the accuracy of data entry",
          "By creating complex workflows that cause incorrect information entry",
          "By reducing the number of tasks employees perform"
        ],
        answer: 2 }
    ]
  },
  {
    caseNum: 4,
    title: "Case #4: The Equity Trail",
    desc: "An unexpected loan was taken out to fund a data center upgrade. Trace the money back to its source and classify the financial input.",
    suspect: "The Treasury Officer",
    round: "CASE 4: Financial Inputs",
    questions: [
      { q: "A company raises equity financing and takes a bank loan to upgrade its data center. What type of financial input is this?",
        options: ["Data", "Capital and Funds", "Resources", "Financial Statements"],
        answer: 1 },
      { q: "The IT team uses historical cost estimates to forecast future service demand. What type of financial input is being used?",
        options: ["Capital and Funds", "Resources", "Data", "Value Delivered"],
        answer: 2 }
    ]
  },
  {
    caseNum: 5,
    title: "Case #5: The Ledger's Secret",
    desc: "The final case. A system crash, lost hours, and scattered financial statements. Only the true detective can piece together the full ledger.",
    suspect: "The Accountant",
    round: "CASE 5: Inputs, Outputs & Costs",
    questions: [
      { q: "A system crashes and employees lose three hours of work. What type of cost is this?",
        options: [
          "Tangible Cost",
          "Hardware Cost",
          "Intangible Cost",
          "Licensing Cost"
        ],
        answer: 2 }
    ]
  }
];

// Flatten into single question list with case metadata
const questions = [];
cases.forEach(c => {
  c.questions.forEach(q => {
    questions.push({ ...q, round: c.round, caseNum: c.caseNum });
  });
});