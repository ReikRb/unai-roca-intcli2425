import { useEffect, useState } from 'react'
import './App.css'
import { Potion } from './types/Potion'
import { potions } from './data/data'
import { calculateCraftingTime, filterByLevelRequirement, findPotionByEffect, getPotionsByRarity } from './helpers/potionHelpers'
import { Ingredient } from './types/Ingredient'
import { SecondaryEffect } from './types/SecondaryEffect'

function App() {
  const [potionsToDisplay, setPotionsToDisplay] = useState<Potion[]>(potions)
  const [rarityToDisplay, setRarityToDisplay] = useState<string>('all')
  const [effectToDisplay, setEffectToDisplay] = useState<string>('')
  const [value, setValue] = useState(100);
  const [displayMinutes, setDisplayMinutes] = useState(false)
  const [totalCraftTime, setTotalCraftTime] = useState(0)
  const [displayDetails, setDisplayDetails] = useState(false)
  const [potionToDisplay, setPotionToDisplay] = useState<Potion>()

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

  const handleOpenDisplayDetails = (potion: Potion) => {
    window.scrollTo(0, 50)
    setDisplayDetails(true)
    setPotionToDisplay(potion)
  }

  const handleCloseDisplayDetails = () => {
    setDisplayDetails(false)
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
                    <button className='bg-[#e5d774] text-black' onClick={() => handleOpenDisplayDetails(potion)}> Show Potion Details</button>
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
        {displayDetails ? (
          <>
            <div className='absolute justify-center top-0 left- 0 w-full h-[1378px] bg-[#000000d9] text-[#e5d774]' onClick={() => handleCloseDisplayDetails()}>
              <div className='w-full text-center text-6xl my-[3%] text-[#e5d774]'>CLICK ANYWHERE TO CLOSE DETAILS WINDOW</div>
              {potionToDisplay != undefined ? (
                <>
                  <div className='w-full h-[900px] flex justify-center'>
                    <div className='w-[70%] h-[80%] bg-gray-900 rounded'>
                      <div className='w-full h-[60px] text-center text-2xl mt-[20px]'>
                        <p>{potionToDisplay.name}'s Details</p>
                      </div>
                      <div className='grid grid-cols-2'>
                        <div>
                          <div className='grid grid-cols-1 w-[95%] text-center text-xl'>
                            <div className='my-[10px]'>
                              <p className='text-2xl'>MAIN EFFECT</p>
                              <p>{`The main effect attribute is "${potionToDisplay.effects.primary.attribute}".`}</p>
                              <p>{` It has a duration of ${potionToDisplay.effects.primary.duration.amount} ${potionToDisplay.effects.primary.duration.unit} and has a value in market of ${potionToDisplay.effects.primary.value}. `}</p>
                            </div>
                          </div>
                          <div className='grid grid-cols-1 w-[95%] text-center text-xl'>
                            <p className='text-2xl'>SECONDARY EFFECTS</p>
                            {potionToDisplay.effects.secondary.map((effect: SecondaryEffect) => {
                              return (
                                <>
                                  <div className='my-[10px]'>
                                    <p>{`One of the secondary effects attribute is "${effect.attribute}".`}</p>
                                    <p>{` It has a duration of ${effect.duration.amount} ${effect.duration.unit} and has a value in market of ${potionToDisplay.effects.primary.value}. `}</p>
                                  </div>
                                </>
                              )
                            })}

                          </div>
                        </div>
                        <div className=' text-center'>
                          <div>
                            <p className='text-2xl '>OTHER DETAILS</p>
                          </div>
                          <div>
                            <p className='text-xl'>This potion can be used if the user is at least level {potionToDisplay.usage.restrictions.levelRequirement}</p>
                            <p className='mt-[20px] text-xl'>Only this classes can use the potion:</p>
                            <p className='text-xl'>{potionToDisplay.usage.restrictions.classRestrictions.map((name: string) => { return `${name} ` })}</p>
                            <p className='mt-[20px] text-xl'>{potionToDisplay.crafting.time.amount} {potionToDisplay.crafting.time.unit} of crafting time.</p>
                            <p className='mt-[20px] text-xl ml-[15%] w-[70%]' >{potionToDisplay.usage.instructions}.</p>
                            <p className=' text-2xl mt-[20px]'>USAGE'S WARNING</p>
                            {potionToDisplay.usage.restrictions.warnings.map((warning: string) => {
                              return <p className=''>{warning}</p>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-900 w-[95%] ml-[2.5%] px-[5%] mt-[2%] pb-[2%]'>
                        <div className='w-full h-[8%] bg-gray-900 grid grid-cols-1'>
                          <div className='w-full h-[100%] text-center text-xl bg-gray-900 grid grid-cols-3 gap-x-[5%] gap-y-[0%] mt-[10px] pb-[10px]'>
                            <p className='border'>Name</p>
                            <p className='border'>Location</p>
                            <p className='border'>Region</p>
                          </div>
                        </div>
                        {
                          potionToDisplay.ingredients.map((ingredient: Ingredient) => {
                            return (
                              <>
                                <div className='w-full h-[8%] bg-gray-900 grid grid-cols-1 mt-[10px]'>
                                  <div className='w-full h-[100%] text-center text-xl bg-gray-900 grid grid-cols-3 gap-x-[5%] border-b'>
                                    <p className=''>{ingredient.name}</p>
                                    <p className=''>{ingredient.origin.location}</p>
                                    <p className=''>{ingredient.origin.region}</p>
                                  </div>
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null
        }
      </div>
    </>
  )
}

export default App
