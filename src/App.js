
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




class Main extends React.Component {
constructor(props){
  super(props)
  this.state={array: " "}
}

  render() {

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
console.log(basketItems)
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
  <GroceriesList array={items} products={productsAdd.bind(this)}/>
  <BasketList onChange={basketItems} products={productsRemove.bind(this)}/>
</main>
    );
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
  <BasketItem onChange={this.props.onChange} onClick={handleClick.bind(this), productsRemove.bind(this)}/>
</div>
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
  <GroceryItem array={this.props.array} onClick={handleClick.bind(this)}/>
</div>
    );
  }
}


class BasketItem extends React.Component {
constructor(props){
super(props)
this.state={array: this.props.onChange}
}


render(){
  
setInterval(() => {this.setState({array: this.props.onChange})}, 100);

const list = this.state.array.map((element =>
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

class GroceryItem extends React.Component {
constructor(props){
super(props)
}

  render() {

    const GroceriesArray = [];
    this.props.array.forEach(element => GroceriesArray.push(element.name))
    const ListItems = GroceriesArray.map((element =>
    <li key={element} onClick = {() => this.props.onClick(element)}>
    <button>+</button>
    {element}</li>))

    return (
<ul className="GroceryItem">
{ListItems}
</ul> 
    )
}
}








function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>

    {/*

<SearchArea/>
    */}
    </div>
  );
}

export default App;
