
import React from 'react';
import './App.css';



class Header extends React.Component {
  render() {
    return (
<div className="Header">
<h1>Fill your basket.</h1>
</div>
    );
  }
}



class Footer extends React.Component {
  render() {
    return (
<div className="Footer">
</div>
    );
  }
}

class SearchArea extends React.Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};
    }


  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    const myFunction = (e) => {
    this.props.filter(e)
    }

const input = <input
        onChange={this.handleChange}
        type="text"
        value={this.state.value}
        id="myInput"
        className="SearchArea"
        onKeyUp={myFunction(this.state.value)}
        placeholder="Search for a product..."></input>
      


    return (
<div>
{input}
</div>
    );
  }
}


function App() {

const list = [];

function pass(e){
  list.shift();
  list.push(e)
  return list;
}

  return (
    <div className="App">
      <Header/>
      <SearchArea filter={(e) => pass(e)}/>
      <Main filter={pass()}/>
      <Footer/>
    </div>
  );
}

class Main extends React.Component {



render(){
  


        const items = [
      {name: 'Strawberry'},
      {name: 'Blueberry'},
      {name: 'Orange'},
      {name: 'Banana'},
      {name: 'Apple'},
      {name: 'Carrot'},
      {name: 'Celery'},
      {name: 'Mushroom'},
      {name: 'Green Pepper'},
      {name: 'Eggs'},
      {name: 'Cheese'},
      {name: 'Butter'},
      {name: 'Chicken'},
      {name: 'Beef'},
      {name: 'Pork'},
      {name: 'Fish'},
      {name: 'Rice'},
      {name: 'Pasta'},
      {name: 'Bread'}
    ];

const basketItems = [{name:'Apple', count:1}];

const productsAdd = (product) => {
let flag = true;
for (let item of basketItems){
if (item.name === product){
flag = false;
item.count++;
break;
}}
if (flag){
basketItems.push({name:product, count:1})
}
}



    return (
<main className="Main">
  <GroceriesList array={items} products={(e) => productsAdd(e)} filter={this.props.filter} />
  <BasketList array={basketItems} filter={this.props.filter}/>
</main>
    );
  }
}


class GroceriesList extends React.Component {



  render() {
    const handleClick = (name) => {
    this.props.products(name)
    }

    return (
<div className="GroceriesList">
  <h2>Groceries:</h2>
  <GroceryItem array={this.props.array} onClick={(e) => handleClick(e)} filter={this.props.filter} />
</div>
    );
  }
}



class GroceryItem extends React.Component {
constructor(props){
super(props)
this.state={filter: this.props.filter,
            list: [],
            array: this.props.array}
}

  static getDerivedStateFromProps(props, state) {
    return {filter: props.filter, array:props.array}
  }

     componentDidMount() {
    setTimeout(() => {
     this.setState({filter: this.props.filter, array:this.props.array})
    }, 100)
  }

  componentDidUpdate() {
    setTimeout(() => {
    this.setState({filter: this.props.filter, array:this.props.array})
    }, 100);
  }
   
    
  render() {

const list = [];
const x = this.state.filter.toString().toUpperCase();

for (let i = 0; i < this.state.array.length; i++){
if (this.state.array[i].name.toUpperCase().indexOf(x) > -1){
list.push(
    <li key={this.state.array[i].name}  onClick = {() => this.props.onClick(this.state.array[i].name)}>
    <button className="plusButton">+</button>
    {this.state.array[i].count} {this.state.array[i].name}</li> 
)
   }}


    return (
<ul className="GroceryItem">
{list}
</ul> 
    )
}
}


class BasketList extends React.Component  {

render(){


    const productsRemove = (product) => {
      let basket = this.props.array;
      for (let item of basket){
      if (item.name === product){
      if (item.count > 0){
      item.count--;
      }
      if (item.count === 0){
basket.splice(basket.indexOf(item), 1)

  ;}
      }}
    }



    return (
<div className="BasketList">
<h2>Basket:</h2>
  <BasketItem  filter={this.props.filter} array={this.props.array} onClick={(e) => productsRemove(e)}/>
</div>
    );
  }
}


class BasketItem extends React.Component {
constructor(props){
super(props)
this.state={array: this.props.array,
            filter: this.props.filter,
            list: []
            }}

            
  static getDerivedStateFromProps(props, state) {
    return {filter: props.filter, array: props.array}
  }

   componentDidMount() {
    setTimeout(() => {
     this.setState({filter: this.props.filter, array:this.props.array})
    }, 100)
  }

  componentDidUpdate() {
    setTimeout(() => {
    this.setState({filter: this.props.filter, array:this.props.array})
    }, 100);
  }
  

   
render(){


const list= [];
const x = this.state.filter.toString().toUpperCase();

for (let i = 0; i < this.state.array.length; i++){
if (this.state.array[i].name.toUpperCase().indexOf(x) > -1){
list.push(
    <li key={this.state.array[i].name}  onClick = {() => this.props.onClick(this.state.array[i].name)}>
    <button className="minusButton">-</button>
    {this.state.array[i].count} {this.state.array[i].name}</li> 
)
   }}



    return (
<ul className="BasketItem" >
{list}
</ul>

    );
  }
}


export default App;
