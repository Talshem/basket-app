
import React, {useState} from 'react';
import './App.css';

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
    setTimeout(() => {
    this.props.onChange()
    }, 100);
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

function useForceUpdate(){
const [value, setValue] = useState(0);
return () => setValue(value => ++value);
}

const forceUpdate = useForceUpdate();

const list = [];

function pass(e){
  list.shift();
  list.push(e)
  return list;
}

  return (
    <div className="App">
      <Header/>
      <SearchArea onChange={forceUpdate} filter={(e) => pass(e)}/>
      <Main filter={pass()}/>
      <Footer/>
    </div>
  );
}



class Main extends React.Component {

render(){

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
this.forceUpdate();
}


    return (
<main className="Main"  key={this.props.array + this.props.filter}>
  <GroceriesList  array={items} products={(e) => productsAdd(e)} filter={this.props.filter} />
  <BasketList  array={basketItems} filter={this.props.filter}/>
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
<div className="GroceriesList" key={this.props.array + this.props.filter}>
  <h2>Groceries:</h2>
  <GroceryItem array={items} onClick={(e) => handleClick(e)} filter={this.props.filter} />
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

   
    
  render() {

const list = [];
const x = this.state.filter.toString().toUpperCase();
for (let i = 0; i < items.length; i++){
if (items[i].name.toUpperCase().indexOf(x) > -1){
list.push(
    <li key={items[i].name}  onClick = {() => this.props.onClick(items[i].name)}>
    <button className="plusButton">+</button>
    {items[i].count} {items[i].name}</li> 
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


    return (
<div className="BasketList " key={this.props.array + this.props.filter}>
<h2>Basket:</h2>
<BasketItem filter={this.props.filter} array={basketItems}/>
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

componentDidUpdate(prevProps) {
  if(prevProps.array !== basketItems) {
    this.setState({array: basketItems});
  }
}

productsRemove = (product) => {
      for (let item of basketItems){
      if (item.name === product){
      if (item.count > 0){
      item.count--;
      }
      if (item.count === 0){
basketItems.splice(basketItems.indexOf(item), 1)

  ;}
      }}
    this.setState({array:basketItems})
    }

render(){


const list= [];

for (let i = 0; i < basketItems.length; i++){
if (basketItems[i].name.toUpperCase().indexOf(this.state.filter.toString().toUpperCase()) > -1){
list.push(
    <li key={this.props.array[i].name + basketItems[i].count}  onClick = {() => this.productsRemove(basketItems[i].name)}>
    <button className="minusButton">-</button>
    {basketItems[i].count} {basketItems[i].name}</li> 
)
   }}


    return (
<ul className="BasketItem" >
<div key={this.props.array}>{list}</div>
</ul>

    );
  }
}


export default App;
