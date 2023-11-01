function Search({ city, state, setCity, setState, onSearch }) {
  return (
    <div>
      <h2>Search for a City:</h2>
      <p>Do not enter state code for cities outside of U.S.</p>
      <input
        type="text"
        placeholder="Type city name here"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type state code here"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button onClick={() => onSearch(city, state)} disabled={!city}>
        Search
      </button>
    </div>
  );
}

export default Search;
