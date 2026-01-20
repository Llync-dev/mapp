import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* -----------------------------
   TIME DATA
----------------------------- */

const timePeriods = [
  { year: -70000, label: "70,000 BCE", era: "Upper Paleolithic" },
  { year: -3000, label: "3,000 BCE", era: "Bronze Age" },
  { year: 1, label: "1 CE", era: "Classical Antiquity" },
  { year: 1492, label: "1492", era: "Age of Discovery" },
  { year: 1800, label: "1800", era: "Industrial Revolution" },
  { year: 2024, label: "2024", era: "Contemporary" }
];

/* -----------------------------
   BORDERS DATA
----------------------------- */

const bordersData = {
  "1": [
    { 
      id: "rome_1ce",
      name: "Roman Empire", 
      lat: 41.9, 
      lng: 12.5,
      color: "#DC2626",
      population: "~56 million",
      capital: "Rome",
      desc: "At its territorial peak under Trajan"
    },
    { 
      id: "han_1ce",
      name: "Han Dynasty", 
      lat: 34.3, 
      lng: 108.9,
      color: "#EF4444",
      population: "~57 million",
      capital: "Chang'an",
      desc: "Golden age of Chinese civilization"
    }
  ],
  "1492": [
    { 
      id: "ottoman_1492",
      name: "Ottoman Empire", 
      lat: 41.0, 
      lng: 28.9,
      color: "#DC2626",
      population: "~15 million",
      capital: "Constantinople",
      desc: "Recently conquered Constantinople"
    },
    { 
      id: "aztec_1492",
      name: "Aztec Empire", 
      lat: 19.4, 
      lng: -99.1,
      color: "#F59E0B",
      population: "~5 million",
      capital: "Tenochtitlan",
      desc: "Sophisticated Mesoamerican civilization"
    },
    { 
      id: "inca_1492",
      name: "Inca Empire", 
      lat: -13.5, 
      lng: -71.9,
      color: "#D97706",
      population: "~10 million",
      capital: "Cusco",
      desc: "Largest empire in pre-Columbian America"
    }
  ],
  "2024": [
    { 
      id: "usa_2024",
      name: "United States", 
      lat: 38.9, 
      lng: -77.0,
      color: "#1E40AF",
      population: "~335 million",
      capital: "Washington DC",
      desc: "Global superpower"
    },
    { 
      id: "china_2024",
      name: "China", 
      lat: 39.9, 
      lng: 116.4,
      color: "#DC2626",
      population: "~1.4 billion",
      capital: "Beijing",
      desc: "Economic powerhouse"
    },
    { 
      id: "india_2024",
      name: "India", 
      lat: 28.6, 
      lng: 77.2,
      color: "#F97316",
      population: "~1.4 billion",
      capital: "New Delhi",
      desc: "Largest democracy"
    }
  ]
};

/* -----------------------------
   MIGRATION DATA
----------------------------- */

const migrationData = {
  "-70000": [
    {
      id: "out_of_africa",
      name: "Out of Africa",
      path: [
        [2.0, 36.8],   // East Africa
        [31.2, 35.2]   // Middle East
      ],
      color: "#EF4444",
      people: "Homo sapiens",
      desc: "First major human migration"
    }
  ],
  "1492": [
    {
      id: "columbian",
      name: "Columbian Exchange",
      path: [
        [40.4, -3.7],    // Spain
        [18.5, -72.3]    // Caribbean
      ],
      color: "#F59E0B",
      people: "Spanish colonizers",
      desc: "European colonization of Americas"
    }
  ],
  "1800": [
    {
      id: "irish_diaspora",
      name: "Irish Diaspora",
      path: [
        [53.3, -6.3],    // Ireland
        [40.7, -74.0]    // New York
      ],
      color: "#10B981",
      people: "Irish immigrants",
      desc: "Famine-driven emigration"
    },
    {
      id: "australia_colonization",
      name: "Australia Colonization",
      path: [
        [51.5, -0.1],    // London
        [-33.9, 151.2]   // Sydney
      ],
      color: "#8B5CF6",
      people: "British settlers",
      desc: "First Fleet arrives"
    }
  ]
};

/* -----------------------------
   LANGUAGE + MUSIC DATA
----------------------------- */

const languageData = {
  "1": [
    { 
      id: "latin", 
      name: "Latin", 
      lat: 41.9, 
      lng: 12.5,
      family: "Indo-European",
      speakers: "~60M"
    }
  ],
  "1492": [
    { 
      id: "spanish", 
      name: "Spanish", 
      lat: 40.4, 
      lng: -3.7,
      family: "Indo-European",
      speakers: "~10M"
    },
    { 
      id: "nahuatl", 
      name: "Nahuatl", 
      lat: 19.4, 
      lng: -99.1,
      family: "Uto-Aztecan",
      speakers: "~1M"
    }
  ],
  "2024": [
    { 
      id: "english", 
      name: "English", 
      lat: 51.5, 
      lng: -0.1,
      family: "Indo-European",
      speakers: "~1.5B"
    },
    { 
      id: "mandarin", 
      name: "Mandarin", 
      lat: 39.9, 
      lng: 116.4,
      family: "Sino-Tibetan",
      speakers: "~1.1B"
    },
    { 
      id: "spanish", 
      name: "Spanish", 
      lat: -12.0, 
      lng: -77.0,
      family: "Indo-European",
      speakers: "~500M"
    }
  ]
};

const musicData = {
  "1": [
    { 
      id: "greek", 
      name: "Ancient Greek Music", 
      lat: 37.9, 
      lng: 23.7,
      genre: "Classical"
    }
  ],
  "1492": [
    { 
      id: "renaissance", 
      name: "Renaissance Music", 
      lat: 45.4, 
      lng: 11.9,
      genre: "Classical"
    }
  ],
  "2024": [
    { 
      id: "jazz", 
      name: "Jazz", 
      lat: 29.9, 
      lng: -90.0,
      genre: "Jazz",
      origin: "New Orleans"
    },
    { 
      id: "hiphop", 
      name: "Hip Hop", 
      lat: 40.8, 
      lng: -73.9,
      genre: "Urban",
      origin: "Bronx, NYC"
    },
    { 
      id: "kpop", 
      name: "K-Pop", 
      lat: 37.5, 
      lng: 127.0,
      genre: "Pop",
      origin: "Seoul"
    }
  ]
};

/* -----------------------------
   HELPERS
----------------------------- */

function getClosestData(data, year) {
  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  let closest = years[0];
  let minDiff = Math.abs(year - closest);

  for (const y of years) {
    const diff = Math.abs(year - y);
    if (diff < minDiff) {
      minDiff = diff;
      closest = y;
    }
  }

  return minDiff < 500 ? data[closest] : [];
}

function formatYear(year) {
  return year < 0 ? `${Math.abs(year).toLocaleString()} BCE` : `${year} CE`;
}

/* -----------------------------
   MAIN COMPONENT
----------------------------- */

export default function App() {
  const [timeValue, setTimeValue] = useState(2024);
  const [visibleLayers, setVisibleLayers] = useState({
    borders: true,
    migration: false,
    language: false,
    music: false
  });

  const borders = getClosestData(bordersData, timeValue);
  const migrations = getClosestData(migrationData, timeValue);
  const languages = getClosestData(languageData, timeValue);
  const music = getClosestData(musicData, timeValue);

  const toggleLayer = (layer) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const currentPeriod = timePeriods.find((p, i) => {
    if (i === timePeriods.length - 1) return true;
    return timeValue >= p.year && timeValue < timePeriods[i + 1].year;
  }) || timePeriods[0];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ 
        padding: "16px 20px", 
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#f9fafb"
      }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: "24px", fontWeight: 600 }}>
          Human History Explorer
        </h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button 
            onClick={() => toggleLayer("borders")}
            style={{
              padding: "8px 16px",
              border: visibleLayers.borders ? "2px solid #3b82f6" : "2px solid #e5e7eb",
              backgroundColor: visibleLayers.borders ? "#eff6ff" : "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
              color: visibleLayers.borders ? "#1e40af" : "#6b7280"
            }}
          >
            {visibleLayers.borders ? "✓" : ""} Political Borders
          </button>
          <button 
            onClick={() => toggleLayer("migration")}
            style={{
              padding: "8px 16px",
              border: visibleLayers.migration ? "2px solid #ef4444" : "2px solid #e5e7eb",
              backgroundColor: visibleLayers.migration ? "#fef2f2" : "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
              color: visibleLayers.migration ? "#dc2626" : "#6b7280"
            }}
          >
            {visibleLayers.migration ? "✓" : ""} Human Migration
          </button>
          <button 
            onClick={() => toggleLayer("language")}
            style={{
              padding: "8px 16px",
              border: visibleLayers.language ? "2px solid #8b5cf6" : "2px solid #e5e7eb",
              backgroundColor: visibleLayers.language ? "#f5f3ff" : "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
              color: visibleLayers.language ? "#7c3aed" : "#6b7280"
            }}
          >
            {visibleLayers.language ? "✓" : ""} Languages
          </button>
          <button
            onClick={() => toggleLayer("music")}
            style={{
              padding: "8px 16px",
              border: visibleLayers.music ? "2px solid #ec4899" : "2px solid #e5e7eb",
              backgroundColor: visibleLayers.music ? "#fdf2f8" : "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
              color: visibleLayers.music ? "#db2777" : "#6b7280"
            }}
          >
            {visibleLayers.music ? "✓" : ""} Music
          </button>
        </div>
      </div>

      {/* MAP */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        maxBounds={[
          [-85, -180],
          [85, 180]
        ]}
        style={{ flex: 1 }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* BORDERS LAYER */}
        {visibleLayers.borders &&
          borders.map((border) => (
            <CircleMarker
              key={border.id}
              center={[border.lat, border.lng]}
              radius={10}
              pathOptions={{ 
                color: border.color,
                fillColor: border.color,
                fillOpacity: 0.7,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>
                    {border.name}
                  </h3>
                  <p style={{ margin: "4px 0", fontSize: "14px", color: "#4b5563" }}>
                    {border.desc}
                  </p>
                  <div style={{ marginTop: "8px", fontSize: "13px" }}>
                    <div><strong>Capital:</strong> {border.capital}</div>
                    <div><strong>Population:</strong> {border.population}</div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* MIGRATION LAYER */}
        {visibleLayers.migration &&
          migrations.map((mig) => (
            <Polyline
              key={mig.id}
              positions={mig.path}
              pathOptions={{
                color: mig.color,
                weight: 3,
                opacity: 0.7,
                dashArray: "10, 10"
              }}
            >
              <Popup>
                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>
                    {mig.name}
                  </h3>
                  <p style={{ margin: "4px 0", fontSize: "14px", color: "#4b5563" }}>
                    {mig.desc}
                  </p>
                  <div style={{ marginTop: "8px", fontSize: "13px" }}>
                    <div><strong>People:</strong> {mig.people}</div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          ))}

        {/* LANGUAGE LAYER */}
        {visibleLayers.language &&
          languages.map((lang) => (
            <CircleMarker
              key={lang.id}
              center={[lang.lat, lang.lng]}
              radius={8}
              pathOptions={{ 
                color: "#8b5cf6",
                fillColor: "#8b5cf6",
                fillOpacity: 0.6,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>
                    {lang.name}
                  </h3>
                  <div style={{ fontSize: "13px" }}>
                    <div><strong>Family:</strong> {lang.family}</div>
                    <div><strong>Speakers:</strong> {lang.speakers}</div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* MUSIC LAYER */}
        {visibleLayers.music &&
          music.map((m) => (
            <CircleMarker
              key={m.id}
              center={[m.lat, m.lng]}
              radius={8}
              pathOptions={{ 
                color: "#ec4899",
                fillColor: "#ec4899",
                fillOpacity: 0.6,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>
                    {m.name}
                  </h3>
                  <div style={{ fontSize: "13px" }}>
                    <div><strong>Genre:</strong> {m.genre}</div>
                    {m.origin && <div><strong>Origin:</strong> {m.origin}</div>}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* TIMELINE */}
      <div style={{ 
        padding: "16px 20px", 
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "white"
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "12px"
        }}>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {formatYear(timeValue)}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              {currentPeriod.era}
            </div>
          </div>
        </div>
        <input
          type="range"
          min={timePeriods[0].year}
          max={timePeriods[timePeriods.length - 1].year}
          value={timeValue}
          onChange={(e) => setTimeValue(Number(e.target.value))}
          style={{ 
            width: "100%",
            height: "8px",
            borderRadius: "4px"
          }}
        />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          fontSize: "12px",
          color: "#9ca3af"
        }}>
          {timePeriods.map((p, i) => (
            <button
              key={i}
              onClick={() => setTimeValue(p.year)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
                fontWeight: 500
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}