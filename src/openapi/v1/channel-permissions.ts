import { ChannelPermissionsAPI, OpenAPIRequest, Config } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export interface IChannelPermissions {
  channel_id: string;
  user_id: string;
  permissions: string;
}

export interface UpdateChannelPermissions {
  add: string;
  remove: string;
}
export default class ChannelPermissions implements ChannelPermissionsAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 获取指定子频道的权限
  public channelPermissions(channelID: string, userID: string): Promise<RestyResponse<IChannelPermissions>> {
    const options = {
      method: 'GET' as const,
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID,
      },
    };
    return this.request<IChannelPermissions>(options);
  }
  // 修改指定子频道的权限
  public putChannelPermissions(
    channelID: string,
    userID: string,
    p: UpdateChannelPermissions,
  ): Promise<RestyResponse<any>> {
    try {
      // 校验参数
      parseInt(p.add, 10);
      parseInt(p.remove, 10);
    } catch (error) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const options = {
      method: 'PUT' as const,
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID,
      },
      data: p,
    };
    return this.request<IChannelPermissions>(options);
  }
}
