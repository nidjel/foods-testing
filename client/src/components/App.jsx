import React, { Component } from 'react'
import SelectedFoods from './SelectedFoods.jsx'
import FoodSearch from './FoodSearch.jsx'

class App extends Component {
  state = {
    selectedFoods: []
  }

  handleAddFood = (food) => {
    if (this.state.selectedFoods.some(f => food.description === f.description)) return
    this.setState({
      selectedFoods: [...this.state.selectedFoods, food]
    })
  }
  
  handleDeleteFood = (idx) => {
    this.setState({
      selectedFoods: [...this.state.selectedFoods.slice(0, idx),
                     ...this.state.selectedFoods.slice(idx + 1)]
    })
  }
  
  render() {
    return (
      <div className="App">
        <SelectedFoods foods={this.state.selectedFoods} onFoodClick={this.handleDeleteFood} />
        <FoodSearch onFoodClick={this.handleAddFood} />
      </div>
    )
  }
}

export default App
