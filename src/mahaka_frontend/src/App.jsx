import React from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
// import Table from "./customer/Components/LandingPageComponents/Table";


function App() {
  // const { theme, toggleTheme } = useTheme();
  // const data = [
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: 'Open' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: '3 left' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Ongoing', tickets: 'Sold out' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: 'Open' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: '3 left' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Finished', tickets: 'Sold out' }, 
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: 'Open' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: '3 left' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Finished', tickets: 'Sold out' }, 
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: 'Open' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: '3 left' },
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Ongoing', tickets: 'Sold out' }, 
  //   { eventName: 'Halloween Retreat', startingDate: '29 October 24', endingDate: '1 November 24', time: '11:00 am - 8:00 pm', orders: '1,000', status: 'Starting in 2 months', tickets: 'Open' },
  //   // ...more data
  // ];

  return (
    <div className="light">
      
       {/* <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Event Table</h1>
      <Table data={data} />
    </div> */}

      {/* <div className="p-4">
      <div className="bg-foreground p-4 rounded-2xl">I am {theme} theme.</div>
      <button
        onClick={toggleTheme}
        className="bg-primary px-4 py-2 rounded-2xl"
      >
        Toggle Theme
      </button>
    </div>     */}
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
