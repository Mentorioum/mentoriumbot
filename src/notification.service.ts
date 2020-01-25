import { Injectable } from '@nestjs/common';
import {
  createTokenAuth,
} from "@octokit/auth";
import Octokit from '@octokit/rest';

@Injectable()
export class NotificationService {


  /**
   * @todo #1:30m/DEV Provide proper time/since params to control list of notifications
   *  find notification/subscriptions for mentioned user
   *
   */


  async getLatestNotification(): Promise<object> {

    const auth = createTokenAuth(process.env.GITHUB_TOKEN);
    const authentication = await auth();

    console.log({authentication});

    const octokit  = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });


    let response  = await octokit.activity.listNotifications({
      per_page: 5,
      participating: true,
      since: '2019-12-27T00:00:00Z'
    });

    let data: any = response.data.pop();

    console.log({data});

    try {
      let ownerLogin = data.repository.owner.login;
      let issueUrl = data.subject.url;
      let issueNumber = issueUrl.match(/(\d.)$/)[0];

      let repoName = data.repository.name;
      const response = await octokit.issues.createComment({
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
     * @todo #1:30m/DEV answer to latest notification in thread
     *  answer 'hello' if you was mentioned
     *
     */


    return data;
  }

  /**
   * @todo #1,30m/DEV  Define start/stop watch over notifications
   *  it starts/stops simple interval over watcher
   *
   */

  /**
   * @todo #1,30m/DEV  Define interface for worker
   *  it starts/stops simple interval over watcher
   *
   */

}
