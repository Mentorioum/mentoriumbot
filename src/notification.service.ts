import { Injectable } from '@nestjs/common';
import Octokit from '@octokit/rest';
import MarkdownIt from 'markdown-it/lib';
import { Client, HandlerArgs, logger, Variables } from 'camunda-external-task-client-js';
import { MarkdownitLinks } from './links/markdownit.links';
import { LinkInstructions } from './instructions/link.instructions';

const REPO_INVITATION = 'RepositoryInvitation';
const ISSUE = 'Issue';
const REASON_ASSIGN = 'assign';


/**
 * @todo #53:30m/DEV Extract configuration to upper layers
 *  config should be in root of app and take it from env
 *
 */
// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = {
  baseUrl: 'http://localhost:8080/engine-rest',
  use: logger, asyncResponseTimeout: 10000
};

@Injectable()
export class NotificationService {
  private token: any;
  private octokit: Octokit;
  private markdownit: MarkdownIt;
  private workflow: Client;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    this.markdownit = new MarkdownIt();

    this.workflow = new Client(config);

    this.handleTaskCheck = this.handleTaskCheck.bind(this);
    this.handleTaskReport = this.handleTaskReport.bind(this);

    this.workflow.subscribe('check-task', this.handleTaskCheck);
    this.workflow.subscribe('collaboration-step-report', this.handleTaskReport);
  }


  private async handleTaskCheck(args : HandlerArgs) {
    const { task, taskService } = args;
    let variables = task.variables;

    console.log({
      message: 'Task Check',
      task,
      variables: variables.getAll()
    });

    const number = variables.get('firstIssueNumber');
    const owner = variables.get('owner');
    const repo = variables.get('repo');

    const responseIssue = await this.octokit.issues.get({
      owner,
      repo,
      issue_number: number
    });

    const issue = responseIssue.data;

    console.log({ issue });

    if (issue.state === 'closed'){

      const newVars = new Variables().setAll({ done: true });

      await taskService.complete(task, newVars);
    }
  }

  private async handleTaskReport(args: HandlerArgs) {
    const { task, taskService } = args;
    let variables = task.variables;

    console.log({
      message: 'Task Report',
      task,
      variables: task.variables.getAll()
    });

    const rootIssueNumber = variables.get('rootIssueNumber');
    const firstIssueNumber = variables.get('firstIssueNumber');
    const owner = variables.get('owner');
    const repo = variables.get('repo');

    const response = await this.octokit.issues.createComment({
      repo,
      owner,
      issue_number: rootIssueNumber,
      body: `Closed issue: #${firstIssueNumber}`
    });

    await taskService.complete(task);
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
      // TODO: #42 Provide validation over parsed links
      const links = new MarkdownitLinks(issue.body, this.markdownit);
      let instructions = new LinkInstructions(links);

      console.log({ instructions });

      const numbers = [];

      while (instructions.hasNext()) {

        let task = instructions.next();
        console.log({ task: task.toJSON() });

        /**
         * @todo #42:30m/DEV - Handle issue's creation errors
         *  at least inform creator of that root issue that error occurs
         *
         */

        // TODO: #42 provide link to root issue for other tasks
        response = await this.octokit.issues.create({
          owner: repoOwner,
          repo: repoName,
          title: task.title(),
          body: task.description(),
          assignees: [task.assignee().login()]
        });

        numbers.push('#' + response.data.number);

        console.log({ issueCreated: response});
      }

      response = await this.octokit.issues.createComment({
        repo: repoName,
        owner: repoOwner,
        issue_number: issue.number,
        body: `Created next issues: ${numbers.join(',')}`
      });

      await this.octokit.activity.markThreadAsRead({
        thread_id: thread.id
      });

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

