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


    const { data } = await octokit.activity.listNotifications({
      per_page: 5,
      participating: true,
      since: '2019-12-27T00:00:00Z'
    });

    console.log({data});


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
