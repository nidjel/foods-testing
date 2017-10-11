import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import App from '../components/App.jsx'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  let wrapper
  beforeEach(() => wrapper = shallow(<App />))
  it('should initialize `selectedFoods` in state as empty array', () => {
    expect(wrapper.state().selectedFoods).toEqual([])
  })
  describe('when `FoodSearch` invokes `handleAddFood` twice', () => {
    const food1 = {
     description: 'food1',            
     kcal: 1, 
     protein_g: 1,        
     fat_g: 1,
     carbohydrate_g: 1
    }
    const food2 = {
     description: 'food2',           
     kcal: 1,
     protein_g: 1,
     fat_g: 1,
     carbohydrate_g: 1
    }
    const foods = [food1, food2]
    beforeEach(() => {
      wrapper.find('FoodSearch').props().onFoodClick(food1)
      wrapper.find('FoodSearch').props().onFoodClick(food2)
    })
    it('should add the foods at `selectedFoods` in state', () => {
      expect(wrapper.state().selectedFoods).toEqual(foods)
    })
    describe('and then `SelectedFoods` invoke `handleDeleteFood`', () => {
      beforeEach(() => {
        wrapper.find('SelectedFoods').props().onFoodClick(0)
      })
      it('should delete the food at idx from array in state', () => {
        expect(wrapper.state().selectedFoods[0]).toEqual(food2)
      })
    })
  })
})