import SortDagBreed,{ commpareArea,LIFE_SPAN_DESC,LIFE_SPAN_ASC } from './SortDogBreed';

describe('commpareArea should execute correctly',() => {

  test('8 - 15 years should equals 8 - 15 years',() => {
    expect(commpareArea('8 - 15 years','8 - 15 years')).toBe(0)
  })

  test('8 - 15 years should smaller than 12 -15 years',() => {
    expect(commpareArea('8 - 15 years','12 - 15 years')).toBe(1)
  })

  test('8 - 15 years should smaller than 8 -17 years',() => {
    expect(commpareArea('8 - 15 years','12 - 15 years')).toBe(1)
  })

  test('7 - 15 years should smaller than 8 -15 years',() => {
    expect(commpareArea('7 - 15 years','8 - 15 years')).toBe(1)
  })

  test('9 years should smaller than 8 - 15 years',() => {
    expect(commpareArea('8 - 15 years','9 years')).toBe(-1)
  })

})


describe('SortDagBreed by life span',() => {

  test('SortDagBreed by life span desc',() => {
    const data = [{
      life_span: '8 - 15 years'
    },{
      life_span: '8 - 12 years'
    },{
      life_span: '7 - 19 years'
    },{
      life_span: '12 years'
    }]

    expect(SortDagBreed({ data,sortOption: LIFE_SPAN_DESC })).toEqual([{
      life_span: '7 - 19 years'
    },{
      life_span: '8 - 15 years'
    },{
      life_span: '12 years'
    },{
      life_span: '8 - 12 years'
    }])
  })

  test('SortDagBreed by life span asc',() => {
    const data = [{
      life_span: '8 - 15 years'
    },{
      life_span: '8 - 12 years'
    },{
      life_span: '7 - 19 years'
    },{
      life_span: '12 years'
    }]

    expect(SortDagBreed({ data,sortOption: LIFE_SPAN_ASC })).toEqual([{
      life_span: '8 - 12 years'

    },{
      life_span: '12 years'

    },{
      life_span: '8 - 15 years'

    },{
      life_span: '7 - 19 years'

    }])
  })

})