import { Injectable } from '@nestjs/common';
import { createTokenAuth } from '@octokit/auth';
import Octokit from '@octokit/rest';

/**
 * @todo #9:30m/DEV  Define start/stop endpoint watch over notifications
 *  use simple setInterval for listen over notifications
 *
 */

@Injectable()
export class NotificationService {

  async searchAndReadyNotificationIfAny(): Promise<object> {

    const auth = createTokenAuth(process.env.GITHUB_TOKEN);
    const authentication = await auth();

    console.log({authentication});

    const octokit  = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });


    let response: any  = await octokit.activity.listNotifications({
      per_page: 5,
      participating: true,
      since: '2019-12-27T00:00:00Z'
    });

    let thread: any = response.data.pop();

    console.log({data: thread});

    if (!thread){
      return thread;
    }

    try {
      let issueUrl = thread.subject.url;

      let issueNumber = issueUrl.match(/(\d.)$/)[0];
      response = await octokit.request(thread.subject.latest_comment_url);
      let ownerLogin = response.data.user.login;

      let repoName = thread.repository.name;
      let repoOwner = thread.repository.owner.login;

      /**
       * @todo #9:30m/DEV Answer on latest comment, where bot was mentioned
       *  it's possible that latest comment in issue is not the comment
       *  where you was mentioned
       */

      response = await octokit.issues.createComment({
        repo: repoName,
        owner: repoOwner,
        issue_number: issueNumber,
        body: `Hi there ! ${ownerLogin}`
      });

      console.log({response, thread});

      await octokit.activity.markThreadAsRead({
        thread_id: thread.id
      });

    } catch (e) {
      console.error('Error Creating Comments', e);
      console.error('Validate', e.request);
    }



    return thread;
  }
}
