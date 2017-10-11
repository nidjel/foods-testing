import React, { Component } from 'react'
import client from '../client.js'

class App extends Component {
  state = {
    selectedFoods: []
  }

  handleAddFood = (food) => {
    if (this.state.selectedFoods.includes(food)) return
    this.setState({
      selectedFoods: [...this.state.selectedFoods, food]
    })
  }
  
  handleDeleteFood = (food) => {
    const idx = this.state.selectedFoods.findIndex(f => f === food )
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

const SelectedFoods = (props) => (
  <table>
    <caption>Выбранная еда</caption>
    <thead>
      <tr>
        <th>Description</th>
        <th>Kcal</th>
        <th>Protein (g)</th>
        <th>Fat (g)</th>
        <th>Carbs (g)</th>
      </tr>
    </thead>
    <tbody>
      {props.foods.map((f, i) => (
        <tr key={i} onClick={() => props.onFoodClick(props.foods[i])} >
          <td>{f.description}</td>
          <td>{f.kcal}</td>
          <td>{f.protein_g}</td>
          <td>{f.fat_g}</td>
          <td>{f.carbohydrate_g}</td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td>Сумма</td>
        <td>{props.foods.reduce((sum, f) => sum + f.kcal, 0)}</td>
        <td>{(props.foods.reduce((sum, f) => sum + f.protein_g, 0)).toFixed(2)}</td>
        <td>{(props.foods.reduce((sum, f) => sum + f.fat_g, 0)).toFixed(2)}</td>
        <td>{(props.foods.reduce((sum, f) => sum + f.carbohydrate_g, 0)).toFixed(2)}</td>
      </tr>
    </tfoot>
  </table>
)

class FoodSearch extends Component {
  state={
    foodQuery: '',
    foods: []
  }

  handleChange = (e) => {
    const foodQuery = e.target.value
    this.setState({
      foodQuery
    })
    client.getFoods(foodQuery).then(foods => {
      if (foods.error) {
        console.log(foods.error)
        this.setState({
          foods: []
        })
      } else {
        this.setState({
          foods
        })
      }
    })
  }
  
  handleFoodClick = (i) => {
    this.props.onFoodClick(this.state.foods[i])
  }
  
  handleClearInputButtonClick = () => {
    this.setState({
      foodQuery: ''
    })
  }
  
  render() {
    return (
      <table>
        <caption>
          <input type='text' name='foodQuery' value={this.state.foodQuery} onChange={this.handleChange} />
          <span onClick={this.handleClearInputButtonClick}>x</span>
        </caption>
        <thead>
          <tr>
            <th>Description</th>
            <th>Kcal</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Carbs (g)</th>
          </tr>
        </thead>
        <tbody>
          {this.state.foods.map((f, i) => (
            <tr key={i} onClick={() => this.handleFoodClick(i)} >
              <td>{f.description}</td>
              <td>{f.kcal}</td>
              <td>{f.protein_g}</td>
              <td>{f.fat_g}</td>
              <td>{f.carbohydrate_g}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default App
