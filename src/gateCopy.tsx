// Every word the recruiter gate shows lives here, so the tone can be edited in one
// place without touching the component or its styles.
import type { ReactNode } from 'react'

export const gateCopy = {
  eyebrow: 'Recruiters start here',
  closeLabel: 'Close',
  open: {
    title: 'The interview brief is open.',
    body: (company: string, until: string): ReactNode => (
      <>
        I promised the {company} panel that the work I showed them would be one click away. Until{' '}
        <strong>{until}</strong> the brief opens directly — no application number needed. After that, the
        number from the interview invite unlocks it again.
      </>
    ),
    timeLeftSuffix: 'of open access',
    openBrief: 'Open the interview brief ↗',
    copyLink: 'Copy link',
    copiedLink: 'Link copied ✓',
    numberLink: 'I have an application number',
    resumeLink: 'Resume',
  },
  number: {
    title: 'Enter your application number',
    body: 'If you are a recruiter, enter the application number from your interview invite. It opens a dedicated brief for that role — the documents I attached, the matching work, and the short version of why I fit.',
    placeholder: 'e.g. 922497',
    submit: 'Open my brief ↗',
    error:
      'No brief is linked to that number yet. Check the number on your interview invite, or email me and I will send it directly.',
    dismiss: 'Just browsing — show me the portfolio',
    resumeLink: 'Resume',
  },
}
