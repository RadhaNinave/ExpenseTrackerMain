import { useEffect, useRef, useState } from "react";
import "./Expense.css";
import axios from "axios";
import { json } from "react-router-dom";
import AuthContext from '../store/AuthContext';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Table } from "react-bootstrap";
const Expense = () => {

   const AuthContextToken = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setUserData] = useState([]);

   
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [catagory, setCatagory] = useState('');
    const [id,setId]=useState(null);
    const [isEditing,setisEditting]=useState(false);
 
    function onAmountHandler(event) {
      setAmount(event.target.value);
  }
  function onDescriptionHandler(event) {
      setDescription(event.target.value);
  }

  const onCatagoryHandler = (e) => {
      setCatagory(e.target.value);
  };


    const submitHandler = (e) =>{
      e.preventDefault();
      //const enteredAmount = Amount.current.value
      //const enteredDesc = Desc.current.value
      //const enteredCategory = category.current.value
      
      const auth = AuthContextToken.email
      const replaceEmail = auth.replace('.', '')

      if(!isEditing){

      
        fetch(`https://expensetracker-1498c-default-rtdb.firebaseio.com/${replaceEmail}.json`, {
            method: 'POST',
            body: JSON.stringify({  amount: amount, description: description, catagory: catagory }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        alert('Your Item added Successfully')
    }else{
        fetch(`https://expensetracker-1498c-default-rtdb.firebaseio.com/${authreplaced}/${id}.json`, {
            method: "PUT",
            body: JSON.stringify({

               
                amount: amount,
                catagory: catagory,
                description: description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            alert("please Update Your Expence")
        });
        setisEditting(false)
    }



    }
    const auth = AuthContextToken.email;
    const authreplaced = auth.replace('.', '');
    // console.log(authreplaced)




    let UserData = [];
    useEffect(() => {


        fetch(`https://expensetracker-1498c-default-rtdb.firebaseio.com/${authreplaced}.json`, {
            method: 'GET',
        }).then((res) => {
            return res.json().then((res) => {

                // console.log(res)

                for (const key in res) {

                    UserData.push({
                        id: key,
                       
                        amount: res[key].amount,
                        description: res[key].description,
                        catagory: res[key].catagory,
                    })
                }
                setUserData(UserData);
                toDeleteDataHandler()

            })
        })
    }, [])

    const toDeleteDataHandler = (id) => {
      // console.log(id)
      fetch(`https://expensetracker-1498c-default-rtdb.firebaseio.com/${authreplaced}/${id}.json`, {
          method: 'DELETE',
      }).then((res) => {
          if (res.ok) {
              alert("Your Item Delete Please Refresh The Page")

          }

      })
  }
  const editHandlerHandler = (id,amount1,catagory1,description1) => {
    setId(id)
  
    setAmount(amount1);
    setCatagory(catagory1)
    setDescription(description1);
    setisEditting(true)

    
}
    
  return (
    <div>
      <form className="form-expenses" onSubmit={submitHandler}>
        <label htmlFor="amount">Amount</label>
        <input onChange={onAmountHandler} type="number" value={amount}/>

        <label htmlFor="desc">Description</label>
        <textarea type="text" rows="3" onChange={onDescriptionHandler} value={description}></textarea>
        <label htmlFor="category">Choose a car:</label>
        <select
         onChange={onCatagoryHandler}
          value={catagory}
          id="category"
          //   style={{
          //     display: "block",
          //     width: 100 + "%",
          //     padding: 3 + "px",
          //     margin: 5 + "px" + " " + 0 + " " + 5 + "px" + " " + 0,
          //     boxSizing: "border-box",
          //   }}
        >
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <h1>Items</h1>
     
      <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S.No</th>
                   
                    <th>Amount</th>
                    <th>Catagory</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th >Delete</th>
                </tr>
            </thead>

            {data.map((currvalue, index) => {
                return <tbody>
                    <tr>
                        <td>{index + 1}</td>
                        
                        <td>{currvalue.amount}</td>
                        <td>{currvalue.catagory}</td>
                        <td>{currvalue.description}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={editHandlerHandler.bind(null, 
                                    currvalue.id,
                                  
                                    currvalue.amount,
                                    currvalue.catagory,
                                    currvalue.description,
                                    )} >
                                Edit

                            </button>
                        </td>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={toDeleteDataHandler.bind(null, 
                                currvalue.id)}
                        >
                            Delete
                        </button>
                    </tr>
                </tbody>
            })}

        </Table>
     
    </div>
  );
};
export default Expense;
