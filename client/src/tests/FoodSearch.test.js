import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FoodSearch from '../components/FoodSearch.jsx'
import client from '../client.js'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('../client.js')

describe('FoodSearch', () => {
  let wrapper
  const onFoodClick = jest.fn()
  client.getFoods.mockReturnValue({then: cb => cb([])})
  
  beforeEach(() => {
    wrapper = shallow(<FoodSearch onFoodClick={onFoodClick} />)
  })
  
  afterEach(() => {
    client.getFoods.mockClear()
    onFoodClick.mockClear()
  })
  
  it('should initialize state property `foods` with empty array', () => {
    expect(wrapper.state().foods).toEqual([])
  })
  
  it('should dispaly no rows with food', () => {
    expect(wrapper.find('table tbody tr').length).toBe(0)
  })
  
  describe('when user fill input', () => {
    const inputValue = 'tomat'
    
    beforeEach(() => {
      wrapper.find('input').simulate('change', {target: {value: inputValue}})
    })
    
    it('should invoke `client.getFoods` with input value', () => {
      expect(client.getFoods.mock.calls[0][0]).toBe(inputValue)
    })
    
    describe('and API return result', () => {
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
      const result = [food1, food2]
      client.getFoods.mockReturnValue({then: cb => cb(result)})
      
      it('should add result to state', () => {
        expect(wrapper.state().foods).toEqual(result)
      })
      
      it('should display two rows with food', () => {
        expect(wrapper.find('table tbody tr').length).toBe(2)
      })
      
      it('should display first food description', () => {
        expect(wrapper.find('table tbody tr').first().find('td').first().text()).toBe(food1.description)
      })
      
      it('should display second food description', () => {
        expect(wrapper.html()).toContain(food2.description)
      })
      
      describe('and then user click on row with food', () => {
        
        beforeEach(() => wrapper.find('table tbody tr').first().simulate('click'))
        
        it('should invoke `onFoodClick` from props with clicked food', () => {
          expect(onFoodClick.mock.calls[0][0]).toEqual(food1)
        })
      })
    })
    
    describe('and then user clear input field with backspace', () => {
      
      beforeEach(() => {
        client.getFoods.mockReturnValue({then: cb => cb([])})
        wrapper.find('input').simulate('change', {target: {value: ''}})
      })
      
      it('should set `foods` and `foodQuery`', () => {
        expect(wrapper.state()).toEqual({foodQuery: '', foods: []})
      })
      
      it('should display no `foods`', () => {
        expect(wrapper.find('table tbody tr').length).toBe(0)
      })
    })
    
    describe('and user click on clear input button', () => {
      
      beforeEach(() => wrapper.find('input + span').simulate('click'))
      
      it('should set `foods` and `foodQuery`', () => {
        expect(wrapper.state()).toEqual({foodQuery: '', foods: []})
      })
    })
  })
})