import React from 'react'

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
        <tr key={i} onClick={() => props.onFoodClick(i)} >
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

export default SelectedFoods