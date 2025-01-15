import { useEffect, useState } from 'react'
import './App.css'
import { Potion } from './types/Potion'
import { potions } from './data/data'
import { filterByLevelRequirement, findPotionByEffect, getPotionsByRarity } from './helpers/potionHelpers'

function App() {
  const [potionsToDisplay, setPotionsToDisplay] = useState<Potion[]>(potions)
  const [rarityToDisplay, setRarityToDisplay] = useState<string>('all')
  const [effectToDisplay, setEffectToDisplay] = useState<string>('search')
  const [value, setValue] = useState(100);
  const dropdownValues = [
    { key: 'all', label: 'All' },
    { key: 'epic', label: 'Epic' },
    { key: 'legendary', label: 'Legendary' },
    { key: 'mythic', label: 'Mythic' }]

  const handleChange = (event: any) => {
    const level = event.target.value
    setValue(level)
  }
  const handleChangeRarity = (event: any) => {
    setRarityToDisplay(event.target.value)
    

  }

  const handleInputChange = (event: any) => {
    setEffectToDisplay(event.target.value)
  }

  useEffect(() => {
    let newPotions: Potion[] = filterByLevelRequirement(potions, value)
    if (rarityToDisplay !== 'all') newPotions = getPotionsByRarity(newPotions, rarityToDisplay)
    if (effectToDisplay !== '' && effectToDisplay !== 'search') newPotions = findPotionByEffect(newPotions, effectToDisplay)
    setPotionsToDisplay(newPotions)
  },[value, rarityToDisplay, effectToDisplay])
  return (
    <>
    <div className=' w-[900px] h-[500px] ml-[30%] flex flex-row space-x-[5%] overflow-y-hidden'>
      {
        potionsToDisplay.map((potion: Potion) => {
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
    <div className=' flex w-[1800px] h-[300px] ml-[4%] mt-[4%]'>
      <div className='flex flex-block w-[20%] mr-[5%]'>
      <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FILTERING BY LEVEL: {value}</label>
      <input id="minmax-range" type="range" min="0" max="100" defaultValue={value} 
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>

      <div className='w-[20%] mr-[5%]'>
         <select
                onChange={handleChangeRarity}
                value={rarityToDisplay}
                className="block w-8/12 bg-gray-200 text-black border border-gray-800 rounded-md py-1 pl-6 pr-10 2xl:text-3xl lg:text-xl sm:text-base appearance-none">
                {dropdownValues.map((option, i) => {
                    return <option key={i} value={option.key}>{option.label}</option>;
                })}
            </select>
      </div>
      <div className='w-[20%] mr-[5%]'>
      <input
        type="text"
        value={effectToDisplay}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      </div>
      <div className=' w-[20%]'>

      </div>
    </div>
    </>
  )
}

export default App
