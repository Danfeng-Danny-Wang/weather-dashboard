import Header from "./Header";
import Main from "./Main";
import Result from "./Result";
import SearchBar from "./SearchBar";

function App() {
  return (
    <>
      <Header />
      <SearchBar />
      <Main>
        <Result />
      </Main>
    </>
  );
}

export default App;
