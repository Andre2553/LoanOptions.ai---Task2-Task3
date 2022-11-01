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

interface IArgs {
   category: string;
   limit?: number;
}

function handleLimit(alldata: IApiDetails[]) {
   if (limit) {
      if (limit > alldata.length) {
         console.log(`Limit is greater than the number of APIs available. Showing all APIs.`);
         alldata = alldata;
      } else {
         alldata = alldata.slice(0, limit);
      }
   }
   return alldata;

}

//Get the arguments from the command line and create the IArgs object
const args = process.argv.slice(2);
const category = args[0];
const limit = args[1] ? parseInt(args[1]) : 10;

const apiArgs: IArgs = { category, limit };

let alldata: IApiDetails[] = [];

// API URL and Config for Axios
const config = {
   method: 'get',
   url: `https://api.publicapis.org/entries${apiArgs.category ? `?category=${apiArgs.category}` : ''}`,
}
axios(config)
   .then((response: IApiResponse) => {
      const { entries } = response.data;
      alldata = entries;
      alldata = handleLimit(alldata);
      (alldata.reverse()).forEach((api) => {
         console.log(api.API);
      });
   })