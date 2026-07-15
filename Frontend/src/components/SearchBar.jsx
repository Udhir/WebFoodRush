import "../css/SearchBar.css";

const SearchBar = ({ search, setSearch }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Search Food..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
);

export default SearchBar;