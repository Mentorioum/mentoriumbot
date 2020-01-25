import { Injectable } from '@nestjs/common';
import { createTokenAuth } from '@octokit/auth';
import Octokit from '@octokit/rest';

@Injectable()
export class NotificationService {

  async getLatestNotification(): Promise<object> {

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

    let data: any = response.data.pop();

    console.log({data});

    try {
      let ownerLogin = data.repository.owner.login;
      let issueUrl = data.subject.url;

      /**
       * @todo #9:20m/DEV Use user information from latest comment
       *  get information from latest command about user and add it's name to answer
       *
       */

      let issueNumber = issueUrl.match(/(\d.)$/)[0];
      response = await octokit.request(data.subject.latest_comment_url);

      console.log('Comment', {response});
      let repoName = data.repository.name;

      /**
       * @todo #9:30m/DEV Answer on latest comment, where bot was mentioned
       *  it's possible that latest comment in issue is not the comment
       *  where you was mentioned
       */

      response = await octokit.issues.createComment({
        repo: repoName,
        owner: ownerLogin,
        issue_number: issueNumber,
        body: `Hi there ! ${ownerLogin}`
      });

      console.log({response});

    } catch (e) {
      console.error('Error Creating Comments', e);
    }

    /**
     * @todo #9:30m/DEV Remove notification after answer
     *  remove notification after answer
     *
     */

    return data;
  }

  /**
   * @todo #9,30m/DEV  Define start/stop endpoint watch over notifications
   *  use simple setInterval for listen over notifications
   *
   */

}
