import React from "react";
import { useState } from "react";

let Formhandling = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    let handleSubmit = (e) => {
         e.preventDefault();
        alert("Your Form has been Submitted " + " " + name + " " + email + " " + password );
        setname('');
        setemail('');
        setpassword('');
    }
    return <>
    <form  onSubmit = {handleSubmit} action="">
        <div>
            Name : <input type="text" onChange={(e)=> setname(e.target.value)} value={name} />
            <h4>{name}</h4>
        </div>
         <div>
            Email : <input type="email" onChange={(e)=> setemail(e.target.value)} value={email} />
            <h4>{email}</h4>
        </div>
         <div>
            Password : <input type="password" onChange={(e)=> setpassword(e.target.value)} value={password} />
            <h4>{password}</h4>
        </div>

        <div>
           <input type="submit" value="Submit" />
        </div>
    </form>
    </>
}

export default Formhandling