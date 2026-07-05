function Dropdown({selectedCountry, onCountryChange, countries}) {
    return (
        <select
            value={selectedCountry}
            onChange={(event) => onCountryChange(event.target.value)}>
            {countries.map((country) => (<option key={country.isoCode} value={country.isoCode}>{country.name?.[0]?.text ?? country.isoCode}</option>))}
        </select>
    );

}

export default Dropdown;