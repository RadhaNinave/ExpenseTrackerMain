import { expenseAction } from "./Expense";

export const addingExpense = (expenseItem) =>{
    return async (dispatch) =>{
        try{
            const res = await fetch(
                `https://expensetracker-1498c-default-rtdb.firebaseio.com/expenses.json` ,
                {
                    method :'POST',
                    headers :{
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(expenseItem),
                }
            );
            const data = await res.json();

            if(res.ok){
                alert("expense added successfully");
                const newData = {
                    ...expenseItem,
                }
            
            dispatch(
                expenseAction.addExpense({
                    expenses: newData,
                    totalAmount : newData.amount
                })
            );
            }
        
        else{
            throw data.error;
         }
        }
        catch(e)
    {
        console.log(e)
    }
 
    };
   
      
};