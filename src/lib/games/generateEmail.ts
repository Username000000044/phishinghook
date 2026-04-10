type Difficulty = "Easy" | "Medium" | "Hard" | "Intense";
const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Intense"];

type Email = {
  header: {
    from_name: string;
    email: string;
    subject: string;
    date: string;
  };
  body: {
    text: string;
    hasAttachment: boolean;
    attachment?: string;
    cta_text?: string;
  };
  isReal: boolean;
  difficulty: Difficulty;
};

export function generateEmail(): Email {
  const random = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // --- 1. Data Pools ---
  const employees = ["Sarah Jenkins", "Michael Chen", "IT Service Desk", "HR Benefits", "Global Security", "Accounts Payable"];
  const depts = ["Information Technology", "Human Resources", "Finance", "Operations", "Cyber Security"];
  const legitDomains = ["acme-corp.com", "microsoft.com", "okta.com", "zoom.us"];
  
  const getSpoofDomain = (diff: Difficulty) => {
    const easy = ["win-office365.pw", "secure-login-check.xyz", "urgent-hr.net"];
    const hard = ["acme-c0rp.com", "acme-corp.co", "microsoft-support.com", "okta-auth.com"];
    return diff === "Easy" || diff === "Medium" ? random(easy) : random(hard);
  };

  const difficulty = random(difficulties);
  const isPhishing = Math.random() < 0.5;

  // --- 2. Scenario Factory with Matching Attachments ---
  const scenarios = [
    {
      type: "password_expire",
      subject: (p: boolean) => p ? "Action Required: Password Expiring" : "Reminder: Your password expires in 3 days",
      real: "Your corporate password for acme-corp.com is set to expire soon. Please use the standard Windows Ctrl+Alt+Del method to change it while connected to the VPN.",
      fake: "Your account access is scheduled for suspension. To keep your current password, click 'Keep My Password' below to verify your identity on our secure portal.",
      cta: "Verify Identity",
      attachments: ["Password_Policy_Guide.pdf", "IT_Security_Protocol.docx"]
    },
    {
      type: "docu_sign",
      subject: (p: boolean) => "Completed: Signature requested on " + (p ? "Direct_Deposit_Form.pdf" : "NDA_Template_v2.pdf"),
      real: "All parties have completed the document. You can download the final version for your records from your DocuSign dashboard.",
      fake: "You have a new encrypted document from HR regarding your 2024 Bonus Structure. Please sign the attached document to acknowledge receipt and process payment.",
      cta: "View Completed Document",
      attachments: ["NDA_Final_Signed.pdf", "Direct_Deposit_Instructions.pdf", "Bonus_Structure_v4.zip"]
    },
    {
      type: "it_ticket",
      subject: (p: boolean) => `Ticket #${Math.floor(Math.random() * 90000)} - Update`,
      real: "This is an automated notification that your ticket has been resolved. If you are still experiencing issues, please reply to this thread.",
      fake: "We found a synchronization error with your Outlook mailbox. To prevent data loss, please run the 'Mailbox Repair Tool' attached to this email immediately.",
      cta: "Run Diagnostic",
      attachments: ["Outlook_Repair_Utility.exe", "Mail_Diagnostic_Logs.zip", "Support_Ticket_Summary.pdf"]
    }
  ];

  const scenario = random(scenarios);
  const senderName = random(employees);
  const domain = isPhishing ? getSpoofDomain(difficulty) : random(legitDomains);
  const signOff = random(["Best regards,", "Thanks,", "Regards,", "Sincerely,"]);

  // --- 3. Body Construction ---
  const greeting = "Hello,";
  const mainContent = isPhishing ? scenario.fake : scenario.real;
  
  const signature = isPhishing && difficulty === "Easy" 
    ? `\n\nClick here to unsubscribe from these alerts.` 
    : `\n\n${signOff}\n${senderName}\n${random(depts)} Department | Acme Corp`;

  const fullBody = `${greeting}\n\n${mainContent}${signature}`;

  // --- 4. Final Object Assembly ---
  const hasAttachment = Math.random() < 0.4; // 40% chance of an attachment
  
  const email: Email = {
    header: {
      from_name: senderName,
      email: `${senderName.split(' ').join('.').toLowerCase()}@${domain}`,
      subject: scenario.subject(isPhishing),
      date: new Date().toLocaleString(),
    },
    body: {
      text: fullBody,
      hasAttachment: hasAttachment,
      attachment: hasAttachment ? random(scenario.attachments) : undefined,
      cta_text: scenario.cta
    },
    isReal: !isPhishing,
    difficulty: difficulty,
  };

  return email;
}
