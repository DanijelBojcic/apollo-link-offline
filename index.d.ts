declare module 'apollo-link-offline' {
  import type { gql, ApolloLink, Operation, NextLink ,ApolloClient,NormalizedCacheObject} from '@apollo/client'

  type Options = Partial<{
    storage: {
      getItem:(key:string)=>Promise<string|null|undefined>,
      setItem:(key:string,value:string,client:ApolloClient<NormalizedCacheObject>)=>Promise<void>,
      removeItem:(key:string)=>Promise<void>
    };
    retryInterval: number;
    sequential: boolean;
    retryOnServerError: boolean;
  }>;

  export const syncStatusQuery: ReturnType<typeof gql>;

  export default class OfflineLink extends ApolloLink {
    constructor(options: Options);

    request(operation: Operation, forward: NextLink): any;

    async migrate(): Promise<void>;

    async getQueue(): Promise<Map<string, Record<string, any>>>;

    saveQueue(attemptId: string, item: Record<string, any>): void;

    updateStatus(inflight: boolean): void;

    add(item): string;

    remove(itemId: string): void;

    async sync(): Promise<void>;

    async setup(client: any): Promise<void>;
  }
}
