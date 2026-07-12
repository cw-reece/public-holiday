import Dropdown from "./Dropdown.jsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [selectedCountry, onCountryChange] = useState("NL");
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      fetch("https://openholidaysapi.org/Countries?languageIsoCode=EN")
        .then((response) => response.json()),
  });

  const holidaysQuery = useQuery({
    queryKey: ["holidays", selectedCountry],
    queryFn: () =>
      fetch(
        `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=2026-01-01&validTo=2026-12-31&languageIsoCode=EN`
      ).then((response) => response.json()),
  });

  if (countriesQuery.isPending || holidaysQuery.isPending) {
    return "Loading...";
  }

  if (countriesQuery.error) {
    return "Countries error: " + countriesQuery.error.message;
  }

  if (holidaysQuery.error) {
    return "Holidays error: " + holidaysQuery.error.message;
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${day}-${monthNames[Number(month) - 1]}`;
  }

  return (

    <>
      <h1>Public Holidays</h1>
      <label>
        <Dropdown
          countries={countriesQuery.data}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
      </label>
      <div className="holiday-list">
        {holidaysQuery.data.length === 0 ? (
          <p>No holidays found for the selected country.</p>
        ) : (
          <ul>
            {holidaysQuery.data.map((holiday) => (
              <li key={holiday.id ?? holiday.startDate}>
                {formatDate(holiday.startDate)} - {holiday.name?.[0]?.text ?? "Unnamed holiday"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App
