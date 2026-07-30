// import React from 'react'
// import Test from './components/Test'
// import Events from './components/Events'
// import Counter from './components/Counter'
// import Productbymap from './components/Productbymap'
// import Productbyfilter from './components/Productbyfilter'
// import Useeffects from './components/Useeffects'
// import Fetch_Data_Api from './components/Fetch_Data_Api'
// import Formhandling from './components/Formhandling'
// import Multi_form_handle from './components/Multi_form_handle'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Course from './pages/Course'
import Team from './pages/Team'
import Course_detail from './pages/Course_detail'

const App = () => {
  return (
    <>
    {/* <Test brand='lanova'></Test> */}
    {/* <Events></Events>
    <Counter></Counter> */}
    {/* <Productbymap></Productbymap> */}
    {/* <Productbyfilter></Productbyfilter> */}
    {/* <Useeffects></Useeffects> */}
    {/* <Fetch_Data_Api></Fetch_Data_Api> */}
    {/* <Formhandling></Formhandling> */}
    {/* <Multi_form_handle></Multi_form_handle> */}

    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/About' element={<About></About>} />
        <Route path='/Contact' element={<Contact></Contact>} />
        <Route path='/Course' element={<Course></Course>} />
        <Route path='/Team' element={<Team></Team>} />
        <Route path='/Course_detail/:id' element={<Course_detail></Course_detail>} />
        </Routes>
    </Router>
    </>
  )
}

export default App