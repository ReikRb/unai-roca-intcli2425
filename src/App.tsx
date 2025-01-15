import { useState } from 'react'
import './App.css'
import { Potion } from './types/Potion'
import { potions } from './data/data'
import { filterByLevelRequirement } from './helpers/potionHelpers'

function App() {
  const [potionsToDisplay, setPotionsToDisplay] = useState<Potion[]>(potions)
  const [value, setValue] = useState(100);

  const handleChange = (event: any) => {
    const level = event.target.value
    setValue(level)
    const newPotions = filterByLevelRequirement(potions, level)
    setPotionsToDisplay(newPotions)
  }

  return (
    <>
    <div className=' w-[900px] h-[500px] ml-[30%] flex flex-row space-x-[5%] overflow-y-auto'>
      {
        potionsToDisplay.map((potion: Potion, index: number) => {
          return (
            <div className=' w-[350px] h-[500px] mb-[7%] border-2 border-[#e5d774]'>
              <div className='justify-items-center'>
                <p className='mb-[7%]'>{potion.name}</p>
                <img src={`./${potion.image}`} className='pl-[15%]'/>
              </div>
              <div className='flex flex-block mt-[5%] space-x-[10%]'>
                <p>Rarity: {potion.rarity}</p>
                <p>Boss: {potion.meta.availability.drop_rate.boss}</p>
                <p>Drop Chance: {potion.meta.availability.drop_rate.chance}</p>
              </div>
              <div className='mt-[6%] mb-[6%]'>
                <button>Details</button>
              </div>
            </div>
          )
        })
      }
    </div>
        <span>FILTERS {value}</span>
    <div className=' flex w-[1800px] h-[300px] ml-[4%] mt-[4%]'>
      <div className='flex flex-block w-[20%] mr-[5%]'>


      <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min-max range</label>
      <input id="minmax-range" type="range" min="0" max="100" defaultValue={value} 
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      </div>
      <div className='w-[20%] mr-[5%]'>
      </div>
      <div className='w-[20%] mr-[5%]'>
      </div>
      <div className=' w-[20%] bg-white'>

      </div>
    </div>
    </>
  )
}

export default App
