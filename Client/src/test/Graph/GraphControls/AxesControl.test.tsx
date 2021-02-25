import { random, seedValue } from "faker"

import { DimensionFactory } from "../../Factories/Dimensions/DimensionFactory"

export { }

test('dummy dummy boi', () => {
  const test = DimensionFactory.build()
  const firstRandom = random.word()
  const secondRandom = random.word()

  console.log("🚀 ~ file: AxesControl.test.tsx ~ line 19 ~ test ~ firstRandom", firstRandom)
  console.log("🚀 ~ file: AxesControl.test.tsx ~ line 19 ~ test ~ secondRandom", secondRandom)
  console.log(seedValue)
  console.log(JSON.stringify(test, null, 4))
})