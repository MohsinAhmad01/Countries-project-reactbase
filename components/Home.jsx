import { useState, useContext } from 'react';
import SearchBar from './SearchBar';
import SelectMenu from './SelectMenu';
import CountriesList from './CountriesList';
import {ThemeContext} from '../Contexts/ThemeContext'; // Correctly importing ThemeContext

export default function Home() {
  const [query, setQuery] = useState('');
  console.log(ThemeContext);

   // Check the current theme context value

  return (
    <main>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      { <CountriesList query={query} />}
    </main>
  );
}
