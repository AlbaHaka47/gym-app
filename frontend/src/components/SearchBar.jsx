import '../assets/SearchBar.css';

function SearchBar({ value, onChange, placeholder = "Buscar ejercicio..." }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder={placeholder}
      aria-label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;