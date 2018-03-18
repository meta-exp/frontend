import React from 'react';

function LoginView(props) {
    return (<div>
        <label htmlFor="uname"> Your Name: </label>
        <input type="text"
               id="uname"
               name="userName"
               value={props.account.userName}
               onChange={(event) => props.onUpdateUsername(event.target.value)}/>
        <br/>
        <br/>
          <label htmlFor="dataset">Choose a dataset: </label>
        <select value={props.account.dataset} name='dataset' onChange={(event) => props.onDatasetSelection(event.target.value)}>
            <option value="a">a</option>
            <option value="b">b</option>
        </select>
        <div>
            <button onClick={() => props.onLogin()}>Submit</button>
        </div>
    </div>);
}

export default LoginView;
