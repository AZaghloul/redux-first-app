const {combineReducers, createStore} = require('redux');

// --------------------------------------- Action Creator ---------------------------------------
const createPolicy = (name,amount) => {
    // return Action
    return {
        type:'CREATE_POLICY',
        payload:{
            name:name,
            amount:amount
        }
    }
}

const createClaim = (name,amount) => {
    return {
        type:'CREATE_CLAIM',
        payload:{
            name:name,
            amount:amount
        }
    }
}

const deletePolicy = (name) =>{
    return {
        type:"DELETE_POLICY",
        payload:{
            name:name
        }
    }
}

// --------------------------------------- Reducers ---------------------------------------
const policiesReducer = (listOfPolicies = [], action) =>{
    if(action.type === 'CREATE_POLICY'){
        return [...listOfPolicies , action.payload];
    }
    else  if(action.type === 'DELETE_POLICY'){
        return listOfPolicies.filter(p => p.name != action.payload.name);
    }

    return listOfPolicies;
}


const claimsReducer = (listOfClaims = [], action)=>{
    if(action.type === 'CREATE_CLAIM'){
        return [...listOfClaims, action.payload];
    }

    return listOfClaims;
}


const accountingReducer = (amountOfMoney = 100, action)=>{
    if(action.type === 'CREATE_POLICY'){
        return amountOfMoney + action.payload.amount;
    }else if(action.type === 'CREATE_CLAIM'){
        return amountOfMoney - action.payload.amount;
    }

    return amountOfMoney;
}

// ===========> Combine Reducers

const reducers = combineReducers({
    policies: policiesReducer,
    claims: claimsReducer,
    money: accountingReducer
})


// =========> Create Store
const store = createStore(reducers);



// +++++++
const action1 = createPolicy('Ahmed Zaghloul', 99);
store.dispatch(action1);

store.dispatch(createPolicy('Menna Shata' , 80));

store.dispatch(createClaim('Ahmed Zaghloul', 150));

console.log(store.getState());