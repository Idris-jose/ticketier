import Header from "./Header.jsx";
import Section1 from "./Section1.jsx";
import Section2 from "./Section2.jsx";
import Section3 from "./Section3.jsx";
import Section4 from "./Section4.jsx";
import Footer from "./Footer.jsx";
import SignUp from "./SIgnup.jsx";
import Login from "./LogIn.jsx";
import MainApp from "./MainApp.jsx";
import Tickets from "./tickets.jsx";
import Support from "./support.jsx";
import Profile from "./profile.jsx";
import { TicketProvider } from "./ticketcontext.jsx";
import {DarkModeProvider} from "./toogledarkmode.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <DarkModeProvider>

      
      <TicketProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <div id="nav-home">
                  <Section1 />
                </div>
                <div id="nav-about-us">
                  <Section2 />
                </div>
                <div id="nav-booking">
                  <Section3 />
                </div>
                <div id="nav-support">
                  <Section4 />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainapp" element={<MainApp />} />
          <Route path="/mainapp/tickets" element={<Tickets />} />
          <Route path="/mainapp/support" element={<Support />} />
          <Route path="/mainapp/profile" element={<Profile />} />
        </Routes>
      </TicketProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;