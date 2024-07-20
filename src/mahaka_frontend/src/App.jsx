import React from "react";
import useTheme from "./common/hooks/ThemeSwitcher";
import Home from "./customer/Pages/Home";
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Master from "./customer/Layout/Master";
import SingleEvent from "./customer/Pages/SingleEvent";
import PaymentComponent from "./customer/Pages/Payment";

function App() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <>
    {/* <div className="p-4">
      <div className="bg-foreground p-4 rounded-2xl">I am {theme} theme.</div>
      <button
        onClick={toggleTheme}
        className="bg-primary px-4 py-2 rounded-2xl"
      >
        Toggle Theme
      </button>
    </div>     */}
    <Router>
        <Routes>
          <Route path="/"element={<Master/>}>
          <Route path="/"element={<Home/>}/>
          <Route path="/single-event"element={<SingleEvent/>}/>
          <Route path="/payment"element={<PaymentComponent/>}/>
          </Route>
          </Routes>
    </Router>
    </>
  );
}

export default App;
