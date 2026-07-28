import React from 'react'
import { useState } from 'react'

const Multi_form_handle = () => {
    const [formdata,setformdata] = useState({
        names : '',
        fathername : '',
        mothername : '',
        age : '',
        education : '',
        phone : '',

})

const Onchange = (e) => {

    const {name,value} = e.target

    setformdata({...formdata, [name]:value})

}

const Onsubmit = (e) => {
      e.preventDefault();
      alert("Your is Submit Successfully")
      console.log(formdata)

      setformdata({
        names : '',
        fathername : '',
        mothername : '',
        age : '',
        education : '',
        phone : '',

})
}


  return (
   <>
     <form onSubmit={Onsubmit} action="" >
     <div>
        Name:- <input type="text" value={formdata.names} onChange={Onchange} name='names' />
     </div>
     <div>
        Father Name:- <input type="text" value={formdata.fathername} onChange={Onchange} name='fathername' />
     </div>
     <div>
        Mother Name:- <input type="text" value={formdata.mothername} onChange={Onchange} name='mothername' />
     </div>
     <div>
       Age:- <input type="text" value={formdata.age} onChange={Onchange} name='age' />
     </div>
     <div>
        Education:- <input type="text" value={formdata.education} onChange={Onchange} name='education' />
     </div>
     <div>
        Phone:- <input type="text" value={formdata.phone} onChange={Onchange} name='phone' />
     </div>
     <div>
    <input type="submit" value="Submit" />
     </div>
     </form>
   </>
  )
}

export default Multi_form_handle