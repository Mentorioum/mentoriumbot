import { Injectable } from '@nestjs/common';
import {
  createTokenAuth,
} from "@octokit/auth";
import { graphql } from '@octokit/graphql';

@Injectable()
export class NotificationService {
  /**
   * @todo #1:30m/DEV User other client to get list notification
   *  looks like grapql doesn't have notification data use other client
   */
  async getHello(): Promise<object> {


    const auth = createTokenAuth(process.env.GITHUB_TOKEN);
    const authentication = await auth();

    console.log({authentication});


    const graphqlWithAuth = graphql.defaults({
      request: {
        hook: auth.hook
      }
    });


    return await graphqlWithAuth(`{
       viewer {
        login
        name
      }
    }`);
  }
}
