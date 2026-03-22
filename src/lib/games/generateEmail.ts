type Difficulty = "Easy" | "Medium" | "Hard" | "Intense";
const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Intense"];

type Email = {
  header: {
    name_abbr: string;
    email: string;
    date: string;
  };
  body: {
    text: string;
    hasAttachment: boolean;
    attachment?: string;
  };
  isReal: boolean;
  difficulty: Difficulty;
};

export function generateEmail(): Email {
  const firstNames = [
    "Olivia",
    "Liam",
    "Emma",
    "Noah",
    "Charlotte",
    "Oliver",
    "Amelia",
    "Elijah",
    "Sophia",
    "Mateo",
    "Ava",
    "Lucas",
    "Isabella",
    "Levi",
    "Mia",
    "Asher",
    "Evelyn",
    "Theodore",
    "Luna",
    "James",
    "Jayvn"
  ];

  const abbr = [
    "IT",
    "HR",
    "FD",
    "AD",
    "TS",
    "SL",
    "CJ",
    "GO",
    "PP",
    "DR",
  ] as const;

  const legitDomains = [
    "company.com",
    "googlemail.com",
    "bankofamerica.com",
    "github.com",
  ];

  const spoofDomains = [
    "company.co",
    "company-secure.co",
    "secure-company.com",
    "company.com.secure-auth.co",
    "goog1e.com",
    "paypaI.com",
    "micrsoft.com",
    "dropbox-mail.com",
    "slack-mail.com",
    "zoom-mail.co",
  ];

  type Scenario =
    | "login_alert"
    | "invoice"
    | "file_share"
    | "hr_update"
    | "security_notice"
    | "team_notification"
    | "ceo_request";

  const scenarios: Scenario[] = [
    "login_alert",
    "invoice",
    "file_share",
    "hr_update",
    "security_notice",
    "team_notification",
    "ceo_request",
  ];

  const attachments = [
    "Invoice_4821.pdf",
    "Report_Q2.docx",
    "Meeting_Notes.pdf",
    "Security_Update.html",
    "Documents.zip",
  ];

  const random = <T>(arr: readonly T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const getDate = (): string => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const isPhishing = (difficulty: Difficulty): boolean => {
    switch (difficulty) {
      case "Easy":
        return Math.random() < 0.7;
      case "Medium":
        return Math.random() < 0.6;
      case "Hard":
        return Math.random() < 0.5;
      case "Intense":
        return Math.random() < 0.5;
    }
  };

  const buildEmailText = (type: Scenario, phishing: boolean): string => {
    const endings = [
      "\n\nLet us know if you have any questions.",
      "\n\nIf anything looks unusual, please review it.",
      "\n\nReach out if you need assistance.",
      "\n\nThanks,\nTeam",
    ];

    switch (type) {
      case "login_alert":
        return `Hi ${firstName},

We noticed a recent login attempt from a device that does not match your usual activity.

${
  phishing
    ? "Please verify your session to avoid any disruption in access."
    : "If this was you, no action is needed. Otherwise, we recommend updating your password."
}
${random(endings)}`;

      case "invoice":
        return `Hello,

An invoice has been generated and is currently pending in the system.

${
  phishing
    ? "Please review and process it as soon as possible to avoid delays."
    : "Please review the details and let us know if anything needs clarification."
}
${random(endings)}`;

      case "file_share":
        return `Hi ${firstName},

A document has been shared with you.

${
  phishing
    ? "Access the file securely to review the contents."
    : "You can open it from your usual workspace tools."
}
${random(endings)}`;

      case "hr_update":
        return `Hello ${firstName},

We are reviewing employee information as part of a routine update.

${
  phishing
    ? "Please confirm your details to ensure there are no interruptions."
    : "No action is required unless something appears incorrect."
}
${random(endings)}`;

      case "security_notice":
        return `Hello,

We detected activity that may require your attention.

${
  phishing
    ? "Please review your account details to maintain access."
    : "If this wasn’t you, we recommend checking your security settings."
}
${random(endings)}`;

      case "team_notification":
        return `Hi ${firstName},

You’ve been included in a new team workspace.

You may see shared files, conversations, or updates relevant to your role.
${random(endings)}`;

      case "ceo_request":
        return `${firstName},

Are you available right now?

${
  phishing
    ? "I need a quick favor handled as soon as possible. I’ll send details once you reply."
    : "Let me know when you're free to discuss a quick request."
}

Thanks`;
    }
  };

  const difficulty = random(difficulties);
  const firstName = random(firstNames);
  const phishing = isPhishing(difficulty);
  const scenario = random(scenarios);
  const hasAttachment = Math.random() < 0.4;

  const email: Email = {
    header: {
      name_abbr: random(abbr),
      email: `${random(abbr).toLowerCase()}@${phishing ? random(spoofDomains) : random(legitDomains)}`,
      date: getDate(),
    },
    body: {
      text: buildEmailText(scenario, phishing),
      hasAttachment,
    },
    isReal: !phishing,
    difficulty: difficulty,
  };

  if (hasAttachment) {
    email.body.attachment = random(attachments);
  }

  return email;
}
