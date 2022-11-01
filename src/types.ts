export interface IApiDetails {
   API: string;
   Description: string;
   Auth: string;
   HTTPS: boolean;
   Cors: string;
   Link: string;
   Category: string;
}
export interface IApiResponse {
   data: {
      entries: IApiDetails[],
      count: number,
   }
}

export interface IArgs {
   category: string;
   limit?: number;
}