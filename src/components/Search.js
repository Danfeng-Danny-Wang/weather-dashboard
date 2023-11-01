function Search({ city, state, setCity, setState, onSearch }) {
  return (
    <div>
      <h2>Search for a City:</h2>
      <p>Only supports city in US now...</p>
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
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default Search;
