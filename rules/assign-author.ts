import { danger, schedule } from "danger";

// Make schedule testable with Jest. Inspiration: https://git.io/fNh6i
const testableSchedule = (reason: string, action: any) =>
  typeof jest !== "undefined" ? action : schedule(action);

export const assignAuthor = testableSchedule(
  "Automatically assign the author to a new pull request",
  async () => {
    const github = danger.github as any;
    const thisPR = github.thisPR;
    const pr = github.pr;

    github.api.issues.addAssigneesToIssue({
      assignees: pr.user,
      number: thisPR.number,
      owner: thisPR.owner,
      repo: thisPR.repo
    });
  }
);
