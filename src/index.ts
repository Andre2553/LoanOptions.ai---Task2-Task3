import axios from 'axios';
import { IApiDetails, IApiResponse, IArgs } from './types';

// Function to limit the data retrieved from the API
function handleLimit(data: IApiDetails[]) {
   if (limit) {
      if (limit < data.length) {
         data = data.slice(0, limit);
      }
   }
   return data;
}

//Get the arguments from the command line and create the IArgs object
const args = process.argv.slice(2);
const category = args[0];
const limit = args[1] ? parseInt(args[1]) : 10;

const apiArgs: IArgs = { category, limit };

// Fields to store all the data retrieved from the api response.data.entries 
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

      return alldata;
   })
   .then((value) => {

      const limitedData = handleLimit(value);

      //reverse the array so that it prints the APIs name in decreasing alphabetical order
      (limitedData.reverse()).forEach((api) => {
         console.log(api.API);
      });
   })
   .catch((error: Error) => {
      if (axios.isAxiosError(error)) {
         // Access to config, request, and response
         console.log(error.config);
      }
      else {
         // No results returned from the request
         console.log("No results");
      }
   });
