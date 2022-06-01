import React, {useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



function App() {
  useEffect(()=>{
    axios.get('/api/value')
      .then( response => {
        console.log(response,'response')
        setLists(response.data)
    })
  },[])  
  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
      event.preventDefault();
      axios.post('/api/value',{value: value})
        .then(response => {
          if(response.data.success){
            console.log(response,'response');
            setLists([...lists,response.data]);
            setValue('');
          } else{
            alert('data를 DB에 저장하지 못 했습니다')
          }
        })
  }

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  return (
    <React.Fragment>
      <div className="App">

        <h1>React 연습</h1>
        <div className="container">
          {lists && lists.map((list, index)=>(
            <li key={index}>{list.value}</li>
          ))}
            <form className="example" onSubmit={submitHandler}>
              <input 
                type="text" 
                placeholder='입력해주세요...'
                onChange={changeHandler}
                value={value}
                />
                <button type="submit">확인</button>
            </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
