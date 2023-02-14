# Dog Breeds Search

### Github

https://github.com/Juster5/dog-breeds-search

### Feature

- Dog breeds search, and present result in table, click "Search" button to reload new data
- Sort by height, name, life span unit tests, location: src/pages/DogBreedsSearch/SortDogBreed(test).js
- Debounce, and unit tests, location: src/utils/debounce(test).js
- Images loading with indicator, location: src/components/SImage
- Fetch api with handle errors, location: src/pages/DogBreedsSearch/fetchData(test).js

### Framework

- cli: create react app
- ui: react
- test: jest and @testing-library/react

### Data can sort by life span, the rules as follow: (height is the same)

- 1 longest years is priority, eg '8 - 12' < '7 - 13'
- 2 if longest years equals, compare shortest years, eg '7 - 12' < '8 - 12'
- 3 if only one year provided, longest years and shortest years is the same, eg '12' = '12 - 12' < '12 - 13'; '12' = '12-12'>'11 -12'
