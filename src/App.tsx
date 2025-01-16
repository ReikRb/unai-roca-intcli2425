import { useEffect, useState } from 'react'
import './App.css'
import { Potion } from './types/Potion'
import { potions } from './data/data'
import { calculateCraftingTime, filterByLevelRequirement, findPotionByEffect, getPotionsByRarity } from './helpers/potionHelpers'

function App() {
  const [potionsToDisplay, setPotionsToDisplay] = useState<Potion[]>(potions)
  const [rarityToDisplay, setRarityToDisplay] = useState<string>('all')
  const [effectToDisplay, setEffectToDisplay] = useState<string>('')
  const [value, setValue] = useState(100);
  const [displayMinutes, setDisplayMinutes] = useState(false)
  const [totalCraftTime, setTotalCraftTime] = useState(0)
  const [displayDetails, setDisplayDetails] = useState(false)

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

  const handleCrafting = () => {
    setDisplayMinutes(true)
    const time = calculateCraftingTime(potionsToDisplay)

    setTotalCraftTime(time)
  }

  useEffect(() => {
    let newPotions: Potion[] = filterByLevelRequirement(potions, value)
    if (rarityToDisplay !== 'all') newPotions = getPotionsByRarity(newPotions, rarityToDisplay)
    if (effectToDisplay !== '' && effectToDisplay !== '') newPotions = findPotionByEffect(newPotions, effectToDisplay)
    setPotionsToDisplay(newPotions)
    setDisplayMinutes(false)
  }, [value, rarityToDisplay, effectToDisplay])

  return (
    <>
      <div className=''>
        <div className='w-[1850px] rounded pt-[30px] ml-[35px] h-[1200px] grid grid-cols-5 gap-x-[1%] gap-y-[6%] auto-rows-max bg-[#010001bf] border border-[]'>
          {
            potionsToDisplay.map((potion: Potion) => {
              return (
                <div className='border-2 w-[320px] ml-[20px] h-[530px] border-[#e5d774] pb-[2%] bg-[#010001bf] rounded'>
                  <div className='w-full h-[50px] text-center text-2xl pt-[5px]'>
                    <p className='mb-[7%]'>{potion.name}</p>
                  </div>
                  <div className='w-full flex justify-center mb-[40px]'>
                    <img src={`./${potion.image}`} className='border rounded w-[200px] ' />
                  </div>
                  <div className=' text-center text-xl mt-[5%] px-[20px] space-y-[5%]'>
                    <div className=' flex w-[100%] divide-x'>
                      <p className='w-[40%]'>Rarity</p>
                      <p className='w-[60%]'>{potion.rarity}</p>
                    </div>
                    <div className='flex w-[100%] divide-x'>
                      <p className='w-[40%]'>Boss</p>
                      <p className='w-[60%] pl-[8px]'>{potion.meta.availability.drop_rate.boss}</p>
                    </div>
                    <div className='flex w-[100%] divide-x'>
                      <p className='w-[40%]'>Drop Chance</p>
                      <p className='w-[60%] pt-[16px]'>{potion.meta.availability.drop_rate.chance}</p>
                    </div>
                  </div>
                  <div className='mt-[6%] flex justify-center '>
                    <button className='bg-[#e5d774] text-black'> Show Potion Details</button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className=' flex w-[1850px] h-[100px] ml-[2%] mt-[4%] grid grid-cols-4 gap-x-[1%]'>
          <div className='border flex  rounded justify-center align-center h-[70px] bg-black'>
            <div className='w-[90%]'>
              <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-xl">FILTERING BY LEVEL: {value}</label>
              <input id="minmax-range" type="range" min="0" max="100" defaultValue={value}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
          </div>

          <div className='border flex flex-center rounded justify-center h-[70px] bg-black'>
            <div className='w-[90%] h-[70%] flex justify-center mt-[10px]'>
              <select
                onChange={handleChangeRarity}
                value={rarityToDisplay}
                className="block w-full bg-gray-800 text-white border border-gray-800 rounded-md py-1 pl-6 pr-10 2xl:text-3xl lg:text-xl sm:text-base appearance-none">
                {dropdownValues.map((option, i) => {
                  return <option key={i} value={option.key}>{option.label}</option>;
                })}
              </select>
            </div>
          </div>
          <div className='border flex flex-center rounded justify-center h-[70px] bg-black'>
            <div className='w-[90%] h-[70%] flex justify-center mt-[10px]'>
              <input
                type="text"
                value={effectToDisplay}
                onChange={handleInputChange}
                placeholder='Search By Secondary Effect Name...'
                className='w-full bg-gray-800 rounded text-center'
              />

            </div>
          </div>
          <div className='border flex flex-center rounded justify-center h-[70px] bg-black'>
            <div className='w-[90%] h-[70%] flex mt-[10px] text-sm'>
              <button onClick={handleCrafting} className='w-[50%] bg-gray-800 flex align-center'><p>CALCULATE TIME TO CRAFT ALL POTIONS</p></button>
              {displayMinutes && (
                <>
                <div className='text-center ml-[10px]'>
                  <p>TIME TO CRAFT ALL POTIONS: </p>
                  <p>{totalCraftTime} Minutes</p>
                </div>
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
