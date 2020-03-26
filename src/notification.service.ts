import { Injectable } from '@nestjs/common';
import Octokit from '@octokit/rest';
import MarkdownIt from 'markdown-it/lib';
import { MarkdownitLinks } from './markdownit.links';

const REPO_INVITATION = 'RepositoryInvitation';
const ISSUE = 'Issue';
const REASON_ASSIGN = 'assign';

@Injectable()
export class NotificationService {
  private token: any;
  private octokit: Octokit;
  private markdownit: MarkdownIt;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    this.markdownit = new MarkdownIt();
  }

  async acceptInvitation(invitation) {
    return await this.octokit.request(
      `/user/repository_invitations/${invitation.id}`,
      {
        method: 'PATCH',
      },
    );
  }

  async fetchInvitations() {
    let response: any = await this.octokit.request(
      '/user/repository_invitations',
    );

    return response.data;
  }

  async fetchNotification(params: any = {}) {
    let response: any = await this.octokit.activity.listNotifications({
      per_page: 5,
      since: '2019-12-27T00:00:00Z',
    });

    return response.data;
  }

  async searchAndReadyNotificationIfAny(): Promise<object> {
    let response: any = await this.fetchNotification();

    for(let thread of response){
      this.handleNotification(thread);
    }

    return response;
  }

  private async handleNotification(thread) {
    let response;

    console.log({ thread });

    if (!thread) {
      return thread;
    }

    let repoId = thread.repository.id;
    let repoName = thread.repository.name;
    let repoOwner = thread.repository.owner.login;

    if (thread.reason === REASON_ASSIGN) {

      response = await this.octokit.request(thread.subject.url);
      let issue = response.data;
      const links = new MarkdownitLinks(issue.body, this.markdownit);

      console.log({ instructions: links.toJSON() });


      response = await this.octokit.issues.createComment({
        repo: repoName,
        owner: repoOwner,
        issue_number: issue.number,
        body: `Reading issue description...`
      });

      // await this.octokit.activity.markThreadAsRead({
      //   thread_id: thread.id
      // });

    } else if (thread.subject.type === REPO_INVITATION) {

      const invitations = await this.fetchInvitations();

      const invitation = invitations.find(invitation => {
        return invitation.repository.id === repoId;
      });

      console.log({ invitation });

      if (invitation) {
        const accept = await this.acceptInvitation(invitation);
        console.log({ accept });
      }

    } else if (thread.subject.type === ISSUE) {
      try {
        response = await this.octokit.request(thread.subject.url);
        let issue = response.data;
        response = await this.octokit.request(thread.subject.latest_comment_url);
        let ownerLogin = response.data.user.login;

        /**
         * @todo #9:30m/DEV Answer on latest comment, where bot was mentioned
         *  it's possible that latest comment in issue is not the comment
         *  where you was mentioned
         */

        console.log({issue});

        response = await this.octokit.issues.createComment({
          repo: repoName,
          owner: repoOwner,
          issue_number: issue.number,
          body: `Hi there ! ${ownerLogin}`
        });

        console.log({response, thread});

        await this.octokit.activity.markThreadAsRead({
          thread_id: thread.id
        });

      } catch (e) {
        console.error('Error Creating Comments', e);
        console.error('Validate', e.request);
      }
    } else {
      await this.octokit.activity.markThreadAsRead({
        thread_id: thread.id
      });
    }
  }
}

