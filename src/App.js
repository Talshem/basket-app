
import React, { useState } from 'react';
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
constructor(props){
super(props)
}


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


const productsRemove = (product) => {
let flag = true;
for (let item of basketItems){
if (item.name === product){
flag = false;
item.count++;
break;
}
}}


    return (
<main className="Main">
  <GroceriesList array={items} products={productsAdd.bind(this)} filter={this.props.filter} />
  <BasketList onChange={basketItems} products={productsRemove.bind(this)} filter={this.props.filter}/>
</main>
    );
  }
}


class GroceriesList extends React.Component {
constructor(props){
super(props)
}



  render() {
    const handleClick = (name) => {
    this.props.products(name)
    }

    return (
<div className="GroceriesList">
  <h2>Groceries:</h2>
  <GroceryItem array={this.props.array} onClick={handleClick.bind(this)} filter={this.props.filter} />
</div>
    );
  }
}



class GroceryItem extends React.Component {
constructor(props){
super(props)
this.state={filter: this.props.filter,
           list: []}

this.filterList = this.filterList.bind(this)
}

    filterList(filter, array){
    let GroceriesArray = [];
    var x = filter.toString().toUpperCase();
    for (let i = 0; i < array.length; i++){
    if (array[i].name.toUpperCase().indexOf(x) > -1){
    GroceriesArray.push(array[i].name)
    }
    }
    this.setState({list: GroceriesArray})
    }
   
    
  render() {

setInterval(() => {
  this.filterList(this.state.filter, this.props.array)
}, 1000);

    const ListItems = this.state.list.map((element =>
    <li key={element} onClick = {() => this.props.onClick(element)}>
    <button>+</button>{element}</li>))


    return (
<ul className="GroceryItem">
{ListItems}
</ul> 
    )
}
}


class BasketList extends React.Component  {
render(){



    const handleClick = (name) => {
    this.props.products(name)
    }

    const productsRemove = (product) => {
      let basket = this.props.onChange;
      for (let item of basket){
      if (item.name === product.name){
      if (item.count > 0){
      item.count--;
      }
      if (item.count == 0){
basket.splice(basket.indexOf(item), 1)
  ;}

      }}
    }


    return (
<div className="BasketList">
<h2>Basket:</h2>
  <BasketItem  filter={this.props.filter} onChange={this.props.onChange} onClick={handleClick.bind(this), productsRemove.bind(this)}/>
</div>
    );
  }
}




class BasketItem extends React.Component {
constructor(props){
super(props)
this.state={array: this.props.onChange,
            filter: this.props.filter,
            list: []}

this.filterList = this.filterList.bind(this)
}

    filterList(filter, array){
    let GroceriesArray = [];
    var x = filter.toString().toUpperCase();
    for (let i = 0; i < array.length; i++){
    if (array[i].name.toUpperCase().indexOf(x) > -1){
    GroceriesArray.push({name:array[i].name, count:array[i].count})
    }
    }
    this.setState({array: this.props.onChange})
    this.setState({list: GroceriesArray})
    }
   
render(){
  
setInterval(() => this.filterList(this.state.filter, this.state.array), 1000);

const list = this.state.list.map((element =>
    <li key={element.name}  onClick = {() => this.props.onClick(element)}>
    <button>-</button>
    {element.count} {element.name}</li> ))


    return (
<ul className="BasketItem" >
{list}
</ul>

    );
  }
}


export default App;
