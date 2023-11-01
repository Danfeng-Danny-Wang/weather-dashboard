function Histories({ searchHistory, onSearch, setCity, setState }) {
  // function handleSearch(city) {
  //   setCity(city);
  //   setState("");
  //   onSearch();
  // }

  return (
    <div>
      <h4>Search Histories:</h4>
      {searchHistory.map((city) => (
        <button key={city} onClick={() => onSearch(city, "")}>
          {city}
        </button>
      ))}
    </div>
  );
}

export default Histories;
