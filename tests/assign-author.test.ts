jest.mock("danger", () => jest.fn());
import * as danger from "danger";
const dm = danger as any;

import { assignAuthor } from "../rules/assign-author";
import { notDeepEqual } from "assert";

beforeEach(() => {
  dm.danger = {
    github: {
      pr: {
        user: {
          login: "username"
        }
      },
      thisPR: {
        repo: "peril-gatsbyjs",
        number: 100,
        owner: "gatsbyjs"
      },
      api: {
        issues: {
          addAssigneesToIssue: jest.fn()
        }
      }
    }
  };
});

describe("a new pull request", () => {
  it("will assign the author", () => {
    return assignAuthor().then(() => {
      expect(dm.danger.github.api.issues.addAssigneesToIssue).toBeCalledWith({
        assignees: { login: "username" },
        number: 100,
        owner: "gatsbyjs",
        repo: "peril-gatsbyjs"
      });
    });
  });
});
