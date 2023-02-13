import ErrorBoundary from './components/ErrorBoundary';
import DogBreedsSearch from "./pages/DogBreedsSearch";


export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <DogBreedsSearch />
      </ErrorBoundary>
    </div>
  );
}
