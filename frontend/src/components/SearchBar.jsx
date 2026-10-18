import '../assets/SearchBar.css';

function SearchBar({ value, onChange, placeholder = "Buscar ejercicio..." }) {
  return (
    <div className="search-bar">
      <i className="pi pi-search" aria-hidden="true"></i>
      <input
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;