import axios from 'axios';

interface IApiDetails {
   API: string;
   Description: string;
   Auth: string;
   HTTPS: boolean;
   Cors: string;
   Link: string;
   Category: string;
}

interface IApiResponse {
   data: {
      entries: IApiDetails[],
      count: number,
   }
}

// API URL and Config for Axios
const config = {
   method: 'get',
   url: "https://api.publicapis.org/entries",
}
axios(config)
   .then((response: IApiResponse) => {
      const { entries, count } = response.data;
      console.log(entries, count);
   })