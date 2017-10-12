import React, { Component } from 'react'
import client from '../client.js'

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
    this.props.onFoodClick({...this.state.foods[i]})
  }
  
  handleClearInputButtonClick = () => {
    this.setState({
      foodQuery: '',
      foods: []
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

export default FoodSearch