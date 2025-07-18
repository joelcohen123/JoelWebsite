// Geography Guessing Game
// You can add new questions by adding to the geoQuestions array below.
// For flags/landmarks, put the image in Images/ and reference the filename.

const geoQuestions = [
  // LANDMARKS
  { type: 'landmark', image: 'Images/landmarks/angkor-wat.png', answer: 'Cambodia', city: 'Siem Reap', landmark_name: 'Angkor Wat', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/arc-de-triomphe.png', answer: 'France', city: 'Paris', landmark_name: 'Arc de Triomphe', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/ayutthaya.png', answer: 'Thailand', city: 'Ayutthaya', landmark_name: 'Ayutthaya Historical Park', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/big-ben.png', answer: 'United Kingdom', city: 'London', landmark_name: 'Big Ben', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/blue-mosque.png', answer: 'Turkey', city: 'Istanbul', landmark_name: 'Blue Mosque', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/borobudur.png', answer: 'Indonesia', city: 'Magelang', landmark_name: 'Borobudur', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/brandenburg-gate.png', answer: 'Germany', city: 'Berlin', landmark_name: 'Brandenburg Gate', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/burj-khalifa.png', answer: 'United Arab Emirates', city: 'Dubai', landmark_name: 'Burj Khalifa', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/chichen-itza.png', answer: 'Mexico', city: 'Yucatán', landmark_name: 'Chichen Itza', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/christ-redeemer.png', answer: 'Brazil', city: 'Rio de Janeiro', landmark_name: 'Christ the Redeemer', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/colosseum.png', answer: 'Italy', city: 'Rome', landmark_name: 'Colosseum', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/easter-island.png', answer: 'Chile', city: 'Easter Island', landmark_name: 'Moai Statues', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/edinburgh-castle.png', answer: 'United Kingdom', city: 'Edinburgh', landmark_name: 'Edinburgh Castle', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/eiffel-tower.png', answer: 'France', city: 'Paris', landmark_name: 'Eiffel Tower', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/forbidden-city.png', answer: 'China', city: 'Beijing', landmark_name: 'Forbidden City', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/giant-causeway.png', answer: 'United Kingdom', city: 'Northern Ireland', landmark_name: 'Giant’s Causeway', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/golden-temple.png', answer: 'India', city: 'Amritsar', landmark_name: 'Golden Temple', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/great-wall.png', answer: 'China', city: 'Beijing', landmark_name: 'Great Wall of China', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/hagia-sophia.png', answer: 'Turkey', city: 'Istanbul', landmark_name: 'Hagia Sophia', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/halong-bay.png', answer: 'Vietnam', city: 'Quang Ninh', landmark_name: 'Ha Long Bay', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/iguazu-falls.png', answer: 'Argentina', city: 'Misiones', landmark_name: 'Iguazu Falls', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/kremlin.png', answer: 'Russia', city: 'Moscow', landmark_name: 'Kremlin', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/kyoto-temple.png', answer: 'Japan', city: 'Kyoto', landmark_name: 'Kiyomizu-dera', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/leaning-tower.png', answer: 'Italy', city: 'Pisa', landmark_name: 'Leaning Tower of Pisa', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/machu-picchu.png', answer: 'Peru', city: 'Cusco Region', landmark_name: 'Machu Picchu', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/marina-bay-sands.png', answer: 'Singapore', city: 'Singapore', landmark_name: 'Marina Bay Sands', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/matterhorn.png', answer: 'Switzerland', city: 'Zermatt', landmark_name: 'Matterhorn', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/mecca.png', answer: 'Saudi Arabia', city: 'Mecca', landmark_name: 'Kaaba', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/milford-sound.png', answer: 'New Zealand', city: 'Fiordland', landmark_name: 'Milford Sound', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/mount-everest.png', answer: 'Nepal', city: 'Himalayas', landmark_name: 'Mount Everest', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/mount-fuji.png', answer: 'Japan', city: 'Honshu', landmark_name: 'Mount Fuji', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/mount-rushmore.png', answer: 'United States', city: 'South Dakota', landmark_name: 'Mount Rushmore', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/neuschwanstein.png', answer: 'Germany', city: 'Bavaria', landmark_name: 'Neuschwanstein Castle', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/niagara-falls.png', answer: 'Canada', city: 'Ontario', landmark_name: 'Niagara Falls', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/notre-dame.png', answer: 'France', city: 'Paris', landmark_name: 'Notre-Dame Cathedral', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/palace-of-versailles.png', answer: 'France', city: 'Versailles', landmark_name: 'Palace of Versailles', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/parthenon.png', answer: 'Greece', city: 'Athens', landmark_name: 'Parthenon', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/pena-palace.png', answer: 'Portugal', city: 'Sintra', landmark_name: 'Pena Palace', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/petra.png', answer: 'Jordan', city: 'Ma’an', landmark_name: 'Petra', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/petronas-towers.png', answer: 'Malaysia', city: 'Kuala Lumpur', landmark_name: 'Petronas Towers', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/pyramids.png', answer: 'Egypt', city: 'Giza', landmark_name: 'Pyramids of Giza', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/red-fort.png', answer: 'India', city: 'Delhi', landmark_name: 'Red Fort', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/sagrada-familia.png', answer: 'Spain', city: 'Barcelona', landmark_name: 'Sagrada Familia', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/seoul-tower.png', answer: 'South Korea', city: 'Seoul', landmark_name: 'N Seoul Tower', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/sphinx.png', answer: 'Egypt', city: 'Giza', landmark_name: 'Great Sphinx of Giza', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/statue-of-liberty.png', answer: 'United States', city: 'New York City', landmark_name: 'Statue of Liberty', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/stonehenge.png', answer: 'United Kingdom', city: 'Wiltshire', landmark_name: 'Stonehenge', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/sydney-opera-house.png', answer: 'Australia', city: 'Sydney', landmark_name: 'Sydney Opera House', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/table-mountain.png', answer: 'South Africa', city: 'Cape Town', landmark_name: 'Table Mountain', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/taj-mahal.png', answer: 'India', city: 'Agra', landmark_name: 'Taj Mahal', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/tower-bridge.png', answer: 'United Kingdom', city: 'London', landmark_name: 'Tower Bridge', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/uluru.png', answer: 'Australia', city: 'Northern Territory', landmark_name: 'Uluru', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/vatican-city.png', answer: 'Vatican City', city: 'Vatican City', landmark_name: 'St. Peter’s Basilica', prompt: 'What country is this landmark in?' },
  { type: 'landmark', image: 'Images/landmarks/western-wall.png', answer: 'Israel', city: 'Jerusalem', landmark_name: 'Western Wall', prompt: 'What country is this landmark in?' },

  // CAPITALS
  { type: 'capital', answer: 'France', prompt: 'Which country has the capital city Paris?' },
  { type: 'capital', answer: 'United Kingdom', prompt: 'Which country has the capital city London?' },
  { type: 'capital', answer: 'Japan', prompt: 'Which country has the capital city Tokyo?' },
  { type: 'capital', answer: 'Brazil', prompt: 'Which country has the capital city Brasília?' },
  { type: 'capital', answer: 'Australia', prompt: 'Which country has the capital city Canberra?' },
  { type: 'capital', answer: 'Canada', prompt: 'Which country has the capital city Ottawa?' },
  { type: 'capital', answer: 'Russia', prompt: 'Which country has the capital city Moscow?' },
  { type: 'capital', answer: 'India', prompt: 'Which country has the capital city New Delhi?' },
  { type: 'capital', answer: 'Egypt', prompt: 'Which country has the capital city Cairo?' },
  { type: 'capital', answer: 'China', prompt: 'Which country has the capital city Beijing?' },
  { type: 'capital', answer: 'United States', prompt: 'Which country has the capital city Washington, D.C.?' },
  { type: 'capital', answer: 'Germany', prompt: 'Which country has the capital city Berlin?' },
  { type: 'capital', answer: 'Italy', prompt: 'Which country has the capital city Rome?' },
  { type: 'capital', answer: 'Mexico', prompt: 'Which country has the capital city Mexico City?' },
  { type: 'capital', answer: 'Argentina', prompt: 'Which country has the capital city Buenos Aires?' },
  { type: 'capital', answer: 'Turkey', prompt: 'Which country has the capital city Ankara?' },
  { type: 'capital', answer: 'South Korea', prompt: 'Which country has the capital city Seoul?' },
  { type: 'capital', answer: 'Spain', prompt: 'Which country has the capital city Madrid?' },
  { type: 'capital', answer: 'Greece', prompt: 'Which country has the capital city Athens?' },
  { type: 'capital', answer: 'Netherlands', prompt: 'Which country has the capital city Amsterdam?' },
  { type: 'capital', answer: 'Sweden', prompt: 'Which country has the capital city Stockholm?' },
  { type: 'capital', answer: 'Switzerland', prompt: 'Which country has the capital city Bern?' },
  { type: 'capital', answer: 'Portugal', prompt: 'Which country has the capital city Lisbon?' },
  { type: 'capital', answer: 'Thailand', prompt: 'Which country has the capital city Bangkok?' },
  { type: 'capital', answer: 'Vietnam', prompt: 'Which country has the capital city Hanoi?' },
  { type: 'capital', answer: 'New Zealand', prompt: 'Which country has the capital city Wellington?' },
  { type: 'capital', answer: 'South Africa', prompt: 'Which country has the capital city Pretoria?' },
  { type: 'capital', answer: 'Saudi Arabia', prompt: 'Which country has the capital city Riyadh?' },
  { type: 'capital', answer: 'Singapore', prompt: 'Which country has the capital city Singapore?' },
  { type: 'capital', answer: 'Malaysia', prompt: 'Which country has the capital city Kuala Lumpur?' },
  { type: 'capital', answer: 'Israel', prompt: 'Which country has the capital city Jerusalem?' },
  // FLAGS
  {
    type: 'flag',
    image: 'Images/flags/flag-france.png',
    answer: 'France',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-japan.png',
    answer: 'Japan',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-germany.png',
    answer: 'Germany',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-italy.png',
    answer: 'Italy',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-spain.png',
    answer: 'Spain',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-united-kingdom.png',
    answer: 'United Kingdom',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-canada.png',
    answer: 'Canada',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-australia.png',
    answer: 'Australia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-brazil.png',
    answer: 'Brazil',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-argentina.png',
    answer: 'Argentina',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-mexico.png',
    answer: 'Mexico',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-china.png',
    answer: 'China',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-india.png',
    answer: 'India',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-russia.png',
    answer: 'Russia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-south-korea.png',
    answer: 'South Korea',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-netherlands.png',
    answer: 'Netherlands',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-sweden.png',
    answer: 'Sweden',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-norway.png',
    answer: 'Norway',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-denmark.png',
    answer: 'Denmark',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-finland.png',
    answer: 'Finland',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-switzerland.png',
    answer: 'Switzerland',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-austria.png',
    answer: 'Austria',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-belgium.png',
    answer: 'Belgium',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-portugal.png',
    answer: 'Portugal',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-greece.png',
    answer: 'Greece',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-poland.png',
    answer: 'Poland',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-czech-republic.png',
    answer: 'Czech Republic',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-hungary.png',
    answer: 'Hungary',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-ireland.png',
    answer: 'Ireland',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-new-zealand.png',
    answer: 'New Zealand',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-south-africa.png',
    answer: 'South Africa',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-egypt.png',
    answer: 'Egypt',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-morocco.png',
    answer: 'Morocco',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-turkey.png',
    answer: 'Turkey',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-saudi-arabia.png',
    answer: 'Saudi Arabia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-vietnam.png',
    answer: 'Vietnam',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-thailand.png',
    answer: 'Thailand',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-malaysia.png',
    answer: 'Malaysia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-bolivia.png',
    answer: 'Bolivia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-paraguay.png',
    answer: 'Paraguay',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-uruguay.png',
    answer: 'Uruguay',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-ecuador.png',
    answer: 'Ecuador',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-venezuela.png',
    answer: 'Venezuela',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-colombia.png',
    answer: 'Colombia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-peru.png',
    answer: 'Peru',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-chile.png',
    answer: 'Chile',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-philippines.png',
    answer: 'Philippines',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-indonesia.png',
    answer: 'Indonesia',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-singapore.png',
    answer: 'Singapore',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-bangladesh.png',
    answer: 'Bangladesh',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-pakistan.png',
    answer: 'Pakistan',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-iran.png',
    answer: 'Iran',
    prompt: 'Which country does this flag belong to?'
  },
  {
    type: 'flag',
    image: 'Images/flags/flag-israel.png',
    answer: 'Israel',
    prompt: 'Which country does this flag belong to?'
  },
  // CAPITALS (additional)
  { type: 'capital', answer: 'Norway', prompt: 'Which country has the capital city Oslo?' },
  { type: 'capital', answer: 'Finland', prompt: 'Which country has the capital city Helsinki?' },
  { type: 'capital', answer: 'Denmark', prompt: 'Which country has the capital city Copenhagen?' },
  { type: 'capital', answer: 'Belgium', prompt: 'Which country has the capital city Brussels?' },
  { type: 'capital', answer: 'Austria', prompt: 'Which country has the capital city Vienna?' },
  { type: 'capital', answer: 'Poland', prompt: 'Which country has the capital city Warsaw?' },
  { type: 'capital', answer: 'Czech Republic', prompt: 'Which country has the capital city Prague?' },
  { type: 'capital', answer: 'Hungary', prompt: 'Which country has the capital city Budapest?' },
  { type: 'capital', answer: 'Ireland', prompt: 'Which country has the capital city Dublin?' },
  { type: 'capital', answer: 'New Zealand', prompt: 'Which country has the capital city Wellington?' },
  { type: 'capital', answer: 'South Africa', prompt: 'Which country has the capital city Pretoria?' },
  { type: 'capital', answer: 'Nigeria', prompt: 'Which country has the capital city Abuja?' },
  { type: 'capital', answer: 'Kenya', prompt: 'Which country has the capital city Nairobi?' },
  { type: 'capital', answer: 'Morocco', prompt: 'Which country has the capital city Rabat?' },
  { type: 'capital', answer: 'Chile', prompt: 'Which country has the capital city Santiago?' },
  { type: 'capital', answer: 'Colombia', prompt: 'Which country has the capital city Bogotá?' },
  { type: 'capital', answer: 'Peru', prompt: 'Which country has the capital city Lima?' },
  { type: 'capital', answer: 'Venezuela', prompt: 'Which country has the capital city Caracas?' },
  { type: 'capital', answer: 'Philippines', prompt: 'Which country has the capital city Manila?' },
  { type: 'capital', answer: 'Indonesia', prompt: 'Which country has the capital city Jakarta?' },
  { type: 'capital', answer: 'Bangladesh', prompt: 'Which country has the capital city Dhaka?' },
  { type: 'capital', answer: 'Pakistan', prompt: 'Which country has the capital city Islamabad?' },
  { type: 'capital', answer: 'Iran', prompt: 'Which country has the capital city Tehran?' },
  { type: 'capital', answer: 'Malaysia', prompt: 'Which country has the capital city Kuala Lumpur?' },
  { type: 'capital', answer: 'Singapore', prompt: 'Which country has the capital city Singapore?' },
  { type: 'capital', answer: 'Thailand', prompt: 'Which country has the capital city Bangkok?' },
  { type: 'capital', answer: 'Vietnam', prompt: 'Which country has the capital city Hanoi?' },
  { type: 'capital', answer: 'Saudi Arabia', prompt: 'Which country has the capital city Riyadh?' },
  { type: 'capital', answer: 'Turkey', prompt: 'Which country has the capital city Ankara?' },
  { type: 'capital', answer: 'Israel', prompt: 'Which country has the capital city Jerusalem?' },
  { type: 'capital', answer: 'United Arab Emirates', prompt: 'Which country has the capital city Abu Dhabi?' },
  { type: 'capital', answer: 'Switzerland', prompt: 'Which country has the capital city Bern?' },
  { type: 'capital', answer: 'Greece', prompt: 'Which country has the capital city Athens?' },
  { type: 'capital', answer: 'Portugal', prompt: 'Which country has the capital city Lisbon?' },
  { type: 'capital', answer: 'Argentina', prompt: 'Which country has the capital city Buenos Aires?' },
  { type: 'capital', answer: 'Egypt', prompt: 'Which country has the capital city Cairo?' },
  { type: 'capital', answer: 'South Korea', prompt: 'Which country has the capital city Seoul?' },
  { type: 'capital', answer: 'Netherlands', prompt: 'Which country has the capital city Amsterdam?' },
  { type: 'capital', answer: 'Sweden', prompt: 'Which country has the capital city Stockholm?' },
  { type: 'capital', answer: 'Finland', prompt: 'Which country has the capital city Helsinki?' },
  { type: 'capital', answer: 'Norway', prompt: 'Which country has the capital city Oslo?' },
  { type: 'capital', answer: 'Denmark', prompt: 'Which country has the capital city Copenhagen?' },
  { type: 'capital', answer: 'Belgium', prompt: 'Which country has the capital city Brussels?' },
  { type: 'capital', answer: 'Austria', prompt: 'Which country has the capital city Vienna?' },
  { type: 'capital', answer: 'Poland', prompt: 'Which country has the capital city Warsaw?' },
  { type: 'capital', answer: 'Czech Republic', prompt: 'Which country has the capital city Prague?' },
  { type: 'capital', answer: 'Hungary', prompt: 'Which country has the capital city Budapest?' },
  { type: 'capital', answer: 'Ireland', prompt: 'Which country has the capital city Dublin?' },
  { type: 'capital', answer: 'New Zealand', prompt: 'Which country has the capital city Wellington?' },
  { type: 'capital', answer: 'South Africa', prompt: 'Which country has the capital city Pretoria?' },
  { type: 'capital', answer: 'Nigeria', prompt: 'Which country has the capital city Abuja?' },
  { type: 'capital', answer: 'Kenya', prompt: 'Which country has the capital city Nairobi?' },
  { type: 'capital', answer: 'Morocco', prompt: 'Which country has the capital city Rabat?' },
  // FLAGS (additional)
  { type: 'flag', image: 'Images/flags/flag-bolivia.png', answer: 'Bolivia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-paraguay.png', answer: 'Paraguay', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-uruguay.png', answer: 'Uruguay', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-ecuador.png', answer: 'Ecuador', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-venezuela.png', answer: 'Venezuela', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-colombia.png', answer: 'Colombia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-peru.png', answer: 'Peru', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-chile.png', answer: 'Chile', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-philippines.png', answer: 'Philippines', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-indonesia.png', answer: 'Indonesia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-singapore.png', answer: 'Singapore', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-bangladesh.png', answer: 'Bangladesh', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-pakistan.png', answer: 'Pakistan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-iran.png', answer: 'Iran', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-israel.png', answer: 'Israel', prompt: 'Which country does this flag belong to?' },
  // NEW FLAGS (downloaded from flagcdn.com)
  { type: 'flag', image: 'Images/flags/flag-afghanistan.png', answer: 'Afghanistan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-albania.png', answer: 'Albania', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-algeria.png', answer: 'Algeria', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-andorra.png', answer: 'Andorra', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-angola.png', answer: 'Angola', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-armenia.png', answer: 'Armenia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-azerbaijan.png', answer: 'Azerbaijan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-bahamas.png', answer: 'Bahamas', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-bahrain.png', answer: 'Bahrain', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-barbados.png', answer: 'Barbados', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-belarus.png', answer: 'Belarus', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-belize.png', answer: 'Belize', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-benin.png', answer: 'Benin', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-bhutan.png', answer: 'Bhutan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-bosnia-herzegovina.png', answer: 'Bosnia and Herzegovina', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-botswana.png', answer: 'Botswana', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-brunei.png', answer: 'Brunei', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-bulgaria.png', answer: 'Bulgaria', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-burkina-faso.png', answer: 'Burkina Faso', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-burundi.png', answer: 'Burundi', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-cabo-verde.png', answer: 'Cabo Verde', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-cambodia.png', answer: 'Cambodia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-cameroon.png', answer: 'Cameroon', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-central-african-republic.png', answer: 'Central African Republic', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-chad.png', answer: 'Chad', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-comoros.png', answer: 'Comoros', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-congo.png', answer: 'Congo', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-costa-rica.png', answer: 'Costa Rica', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-cote-divoire.png', answer: 'Côte d\'Ivoire', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-croatia.png', answer: 'Croatia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-cuba.png', answer: 'Cuba', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-cyprus.png', answer: 'Cyprus', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-djibouti.png', answer: 'Djibouti', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-dominica.png', answer: 'Dominica', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-dominican-republic.png', answer: 'Dominican Republic', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-east-timor.png', answer: 'East Timor', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-el-salvador.png', answer: 'El Salvador', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-equatorial-guinea.png', answer: 'Equatorial Guinea', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-eritrea.png', answer: 'Eritrea', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-estonia.png', answer: 'Estonia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-eswatini.png', answer: 'Eswatini', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-ethiopia.png', answer: 'Ethiopia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-fiji.png', answer: 'Fiji', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-gabon.png', answer: 'Gabon', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-georgia.png', answer: 'Georgia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-ghana.png', answer: 'Ghana', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-grenada.png', answer: 'Grenada', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-guatemala.png', answer: 'Guatemala', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-guinea.png', answer: 'Guinea', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-guinea-bissau.png', answer: 'Guinea-Bissau', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-guyana.png', answer: 'Guyana', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-haiti.png', answer: 'Haiti', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-honduras.png', answer: 'Honduras', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-iceland.png', answer: 'Iceland', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-iraq.png', answer: 'Iraq', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-jamaica.png', answer: 'Jamaica', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-jordan.png', answer: 'Jordan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-kazakhstan.png', answer: 'Kazakhstan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-kenya.png', answer: 'Kenya', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-kiribati.png', answer: 'Kiribati', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-kuwait.png', answer: 'Kuwait', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-kyrgyzstan.png', answer: 'Kyrgyzstan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-laos.png', answer: 'Laos', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-latvia.png', answer: 'Latvia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-lebanon.png', answer: 'Lebanon', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-lesotho.png', answer: 'Lesotho', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-liberia.png', answer: 'Liberia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-libya.png', answer: 'Libya', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-liechtenstein.png', answer: 'Liechtenstein', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-lithuania.png', answer: 'Lithuania', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-luxembourg.png', answer: 'Luxembourg', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-madagascar.png', answer: 'Madagascar', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-malawi.png', answer: 'Malawi', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-maldives.png', answer: 'Maldives', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-mali.png', answer: 'Mali', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-malta.png', answer: 'Malta', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-marshall-islands.png', answer: 'Marshall Islands', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-mauritania.png', answer: 'Mauritania', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-mauritius.png', answer: 'Mauritius', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-micronesia.png', answer: 'Micronesia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-moldova.png', answer: 'Moldova', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-monaco.png', answer: 'Monaco', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-mongolia.png', answer: 'Mongolia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-montenegro.png', answer: 'Montenegro', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-mozambique.png', answer: 'Mozambique', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-myanmar.png', answer: 'Myanmar', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-namibia.png', answer: 'Namibia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-nauru.png', answer: 'Nauru', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-nepal.png', answer: 'Nepal', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-nicaragua.png', answer: 'Nicaragua', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-niger.png', answer: 'Niger', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-nigeria.png', answer: 'Nigeria', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-north-korea.png', answer: 'North Korea', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-north-macedonia.png', answer: 'North Macedonia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-oman.png', answer: 'Oman', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-palau.png', answer: 'Palau', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-panama.png', answer: 'Panama', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-papua-new-guinea.png', answer: 'Papua New Guinea', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-qatar.png', answer: 'Qatar', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-romania.png', answer: 'Romania', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-rwanda.png', answer: 'Rwanda', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-saint-kitts-nevis.png', answer: 'Saint Kitts and Nevis', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-saint-lucia.png', answer: 'Saint Lucia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-saint-vincent-grenadines.png', answer: 'Saint Vincent and the Grenadines', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-samoa.png', answer: 'Samoa', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-san-marino.png', answer: 'San Marino', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-sao-tome-principe.png', answer: 'Sao Tome and Principe', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-senegal.png', answer: 'Senegal', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-serbia.png', answer: 'Serbia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-seychelles.png', answer: 'Seychelles', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-sierra-leone.png', answer: 'Sierra Leone', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-slovakia.png', answer: 'Slovakia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-slovenia.png', answer: 'Slovenia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-solomon-islands.png', answer: 'Solomon Islands', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-somalia.png', answer: 'Somalia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-south-sudan.png', answer: 'South Sudan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-sri-lanka.png', answer: 'Sri Lanka', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-sudan.png', answer: 'Sudan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-suriname.png', answer: 'Suriname', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-syria.png', answer: 'Syria', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-tajikistan.png', answer: 'Tajikistan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-tanzania.png', answer: 'Tanzania', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-togo.png', answer: 'Togo', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-tonga.png', answer: 'Tonga', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-trinidad-tobago.png', answer: 'Trinidad and Tobago', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-tunisia.png', answer: 'Tunisia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-turkmenistan.png', answer: 'Turkmenistan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-tuvalu.png', answer: 'Tuvalu', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-uganda.png', answer: 'Uganda', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-ukraine.png', answer: 'Ukraine', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-united-arab-emirates.png', answer: 'United Arab Emirates', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-united-states.png', answer: 'United States', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-uzbekistan.png', answer: 'Uzbekistan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-vanuatu.png', answer: 'Vanuatu', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-yemen.png', answer: 'Yemen', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-zambia.png', answer: 'Zambia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-zimbabwe.png', answer: 'Zimbabwe', prompt: 'Which country does this flag belong to?' },
  // MISSING FLAG QUESTIONS
  { type: 'flag', image: 'Images/flags/flag-argentina.png', answer: 'Argentina', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-australia.png', answer: 'Australia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-austria.png', answer: 'Austria', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-belgium.png', answer: 'Belgium', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-brazil.png', answer: 'Brazil', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-canada.png', answer: 'Canada', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-china.png', answer: 'China', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-czech-republic.png', answer: 'Czech Republic', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-denmark.png', answer: 'Denmark', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-egypt.png', answer: 'Egypt', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-finland.png', answer: 'Finland', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-france.png', answer: 'France', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-germany.png', answer: 'Germany', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-greece.png', answer: 'Greece', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-hungary.png', answer: 'Hungary', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-india.png', answer: 'India', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-ireland.png', answer: 'Ireland', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-italy.png', answer: 'Italy', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-japan.png', answer: 'Japan', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-malaysia.png', answer: 'Malaysia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-mexico.png', answer: 'Mexico', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-morocco.png', answer: 'Morocco', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-netherlands.png', answer: 'Netherlands', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-new-zealand.png', answer: 'New Zealand', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-norway.png', answer: 'Norway', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-poland.png', answer: 'Poland', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-portugal.png', answer: 'Portugal', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-russia.png', answer: 'Russia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-saudi-arabia.png', answer: 'Saudi Arabia', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-south-africa.png', answer: 'South Africa', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-south-korea.png', answer: 'South Korea', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-spain.png', answer: 'Spain', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-sweden.png', answer: 'Sweden', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-switzerland.png', answer: 'Switzerland', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-thailand.png', answer: 'Thailand', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-turkey.png', answer: 'Turkey', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-united-kingdom.png', answer: 'United Kingdom', prompt: 'Which country does this flag belong to?' },
  { type: 'flag', image: 'Images/flags/flag-vietnam.png', answer: 'Vietnam', prompt: 'Which country does this flag belong to?' }
];

let geoGameState = {
  score: 0,
  lives: 3,
  timer: 14,
  currentQuestion: null,
  timerInterval: null,
  usedIndexes: [],
};

let geoGameMode = null; // 'errors', 'endless', 'quiz'
let geoGameQuizCount = 0;

function pickRandomQuestion() {
  // Filter questions based on game mode
  let availableQuestions = geoQuestions;
  if (geoGameMode === 'flags-only') {
    availableQuestions = geoQuestions.filter(q => q.type === 'flag');
  }
  
  if (geoGameState.usedIndexes.length === availableQuestions.length) {
    geoGameState.usedIndexes = [];
  }
  
  let idx;
  do {
    idx = Math.floor(Math.random() * availableQuestions.length);
  } while (geoGameState.usedIndexes.includes(idx));
  geoGameState.usedIndexes.push(idx);
  return availableQuestions[idx];
}

function showGeoGameModeSelect() {
  const modal = document.getElementById('geo-game-modal');
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div style="background: #222; color: #fff; padding: 2rem; border-radius: 16px; min-width: 320px; display: flex; flex-direction: column; align-items: center;">
      <h2>Select Game Mode</h2>
      <button id="geo-mode-errors" style="margin: 8px; padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 6px; border: none; background: #4caf50; color: #fff;">3 Errors</button>
      <button id="geo-mode-endless" style="margin: 8px; padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 6px; border: none; background: #2196F3; color: #fff;">Endless</button>
      <button id="geo-mode-quiz" style="margin: 8px; padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 6px; border: none; background: #ff9800; color: #fff;">30 Question Quiz</button>
      <button id="geo-mode-flags-only" style="margin: 8px; padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 6px; border: none; background: #e91e63; color: #fff;">3 Lives Flags Only</button>
      <button id="geo-game-close" style="margin-top: 1rem;">Close</button>
    </div>
  `;
  document.getElementById('geo-mode-errors').onclick = () => startGeoGame('errors');
  document.getElementById('geo-mode-endless').onclick = () => startGeoGame('endless');
  document.getElementById('geo-mode-quiz').onclick = () => startGeoGame('quiz');
  document.getElementById('geo-mode-flags-only').onclick = () => startGeoGame('flags-only');
  document.getElementById('geo-game-close').onclick = closeGeoGameModal;
}

function showGeoGameModal() {
  showGeoGameModeSelect();
}

function closeGeoGameModal() {
  document.getElementById('geo-game-modal').style.display = 'none';
  clearInterval(geoGameState.timerInterval);
}

function updateGeoGameUI() {
  let livesDisplay = '';
  if (geoGameMode === 'errors' || geoGameMode === 'flags-only') {
    livesDisplay = '❤️'.repeat(geoGameState.lives);
  } else if (geoGameMode === 'endless') {
    livesDisplay = '∞';
  } else if (geoGameMode === 'quiz') {
    livesDisplay = '';
  }
  document.getElementById('geo-game-lives').textContent = livesDisplay;
  document.getElementById('geo-game-score').textContent = `Score: ${geoGameState.score}`;
  document.getElementById('geo-game-timer').textContent = geoGameState.timer;
  document.getElementById('geo-game-answer').value = '';
}

function startGeoGame(mode) {
  geoGameMode = mode;
  geoGameQuizCount = 0;
  document.getElementById('geo-game-modal').innerHTML = `
    <div id="geo-game-ui" style="background: #222; color: #fff; padding: 2rem; border-radius: 16px; margin-top: 2rem; min-width: 320px; display: flex; flex-direction: column; align-items: center;">
      <div id="geo-game-question" style="font-size: 1.2rem; margin-bottom: 1rem;"></div>
      <img id="geo-game-image" src="" alt="Geography Clue" style="max-width: 200px; max-height: 120px; margin-bottom: 1rem; display: none; border-radius: 8px; background: #fff;" />
      <input id="geo-game-answer" type="text" placeholder="Type your answer..." style="padding: 0.5rem; font-size: 1rem; margin-bottom: 1rem; border-radius: 6px; border: none; width: 80%;" autocomplete="off" />
      <button id="geo-game-submit" style="padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 6px; border: none; background: #4caf50; color: #fff; margin-bottom: 1rem;">Submit</button>
      <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 1rem;">
        <span id="geo-game-lives"></span>
        <span id="geo-game-timer"></span>s
        <span id="geo-game-score"></span>
      </div>
      <div id="geo-game-feedback" style="font-size: 2rem; min-height: 2.5rem; margin: 1.5rem 0 1rem 0; width: 100%; text-align: center;"></div>
      <button id="geo-game-quit" style="margin-top: 1rem;">Quit</button>
    </div>
  `;
  geoGameState.score = 0;
  geoGameState.lives = (mode === 'errors' || mode === 'flags-only') ? 3 : Infinity;
  geoGameState.timer = 15;
  geoGameState.usedIndexes = [];
  updateGeoGameUI();
  nextGeoGameQuestion();
  document.getElementById('geo-game-quit').onclick = function() {
    clearInterval(geoGameState.timerInterval);
    const feedback = document.getElementById('geo-game-feedback');
    let quitMsg = '';
    if (geoGameMode === 'endless') {
      quitMsg = `<span style='color: #f44336; font-size: 2rem; font-weight: bold;'>You quit! Final Score: ${geoGameState.score}</span>`;
    } else if (geoGameMode === 'quiz') {
      quitMsg = `<span style='color: #f44336; font-size: 2rem; font-weight: bold;'>You quit! Final Score: ${geoGameState.score}/${geoGameQuizCount-1}</span>`;
    } else if (geoGameMode === 'flags-only') {
      quitMsg = `<span style='color: #f44336; font-size: 2rem; font-weight: bold;'>Game Over! Final Score: ${geoGameState.score}</span>`;
    } else {
      quitMsg = `<span style='color: #f44336; font-size: 2rem; font-weight: bold;'>Game Over! Final Score: ${geoGameState.score}</span>`;
    }
    feedback.innerHTML = quitMsg;
    setTimeout(closeGeoGameModal, 2500);
  };
  document.getElementById('geo-game-submit').onclick = () => {
    const userAns = document.getElementById('geo-game-answer').value.trim().toLowerCase();
    const correctAns = geoGameState.currentQuestion.answer.trim().toLowerCase();
    geoGameFeedback(userAns === correctAns);
  };
  const answerInput = document.getElementById('geo-game-answer');
  if (answerInput) answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('geo-game-submit').click();
    }
  });
}

function nextGeoGameQuestion() {
  clearInterval(geoGameState.timerInterval);
  geoGameState.timer = 15;
  updateGeoGameUI();
  if (geoGameMode === 'quiz' && geoGameQuizCount >= 30) {
    document.getElementById('geo-game-feedback').innerHTML = `<span style='color: #2196F3; font-size: 2rem; font-weight: bold;'>Quiz Complete! Final Score: ${geoGameState.score}/30</span>`;
    setTimeout(closeGeoGameModal, 4000);
    return;
  }
  geoGameQuizCount++;
  const q = pickRandomQuestion();
  geoGameState.currentQuestion = q;
  document.getElementById('geo-game-question').textContent = q.prompt;
  if (q.image) {
    const img = document.getElementById('geo-game-image');
    img.src = q.image;
    img.style.display = 'block';
  } else {
    document.getElementById('geo-game-image').style.display = 'none';
  }
  geoGameState.timerInterval = setInterval(() => {
    geoGameState.timer--;
    document.getElementById('geo-game-timer').textContent = geoGameState.timer;
    if (geoGameState.timer <= 0) {
      clearInterval(geoGameState.timerInterval);
      geoGameFeedback(false);
    }
  }, 1000);
}

function geoGameFeedback(correct) {
  clearInterval(geoGameState.timerInterval);
  const feedback = document.getElementById('geo-game-feedback');
  if (correct) {
    feedback.innerHTML = '<span style="color: #4caf50;">✔️ 😊</span>';
    geoGameState.score++;
    updateGeoGameUI();
    setTimeout(() => {
      feedback.innerHTML = '';
      nextGeoGameQuestion();
    }, 900);
  } else {
    if (geoGameMode === 'errors') geoGameState.lives--;
    updateGeoGameUI();
    const q = geoGameState.currentQuestion;
    let feedbackMsg = '';
    if (q.type === 'landmark' && q.city && q.landmark_name) {
      feedbackMsg = `<div style=\"color: #ff2222; font-size: 1.1rem; font-weight: bold; margin-bottom: 0.3rem;\">INCORRECT</div><div style=\"color: #fff; background: #ff2222; padding: 4px 10px; border-radius: 6px; font-size: 1rem; font-weight: bold; display: inline-block; margin-bottom: 0.5rem;\">That is the ${q.landmark_name} located in ${q.city}, ${q.answer}.</div>`;
    } else if (q.type === 'capital') {
      feedbackMsg = `<div style=\"color: #ff2222; font-size: 1.1rem; font-weight: bold; margin-bottom: 0.3rem;\">INCORRECT</div><div style=\"color: #fff; background: #ff2222; padding: 4px 10px; border-radius: 6px; font-size: 1rem; font-weight: bold; display: inline-block; margin-bottom: 0.5rem;\">Correct Answer: ${q.answer}</div>`;
    } else {
      feedbackMsg = `<div style=\"color: #ff2222; font-size: 1.1rem; font-weight: bold; margin-bottom: 0.3rem;\">INCORRECT</div><div style=\"color: #fff; background: #ff2222; padding: 4px 10px; border-radius: 6px; font-size: 1rem; font-weight: bold; display: inline-block; margin-bottom: 0.5rem;\">Correct Answer: ${q.answer}</div>`;
    }
    feedback.innerHTML = `<div style=\"text-align: center; padding: 10px 0 6px 0;\">${feedbackMsg}</div>`;
    setTimeout(() => {
      feedback.innerHTML = '';
      if ((geoGameMode === 'errors' || geoGameMode === 'flags-only') && geoGameState.lives <= 0) {
        feedback.innerHTML = `<span style='color: #f44336; font-size: 2rem; font-weight: bold;'>Game Over! Final Score: ${geoGameState.score}</span>`;
        setTimeout(closeGeoGameModal, 2000);
      } else if (geoGameMode === 'quiz' && geoGameQuizCount >= 30) {
        feedback.innerHTML = `<span style='color: #2196F3; font-size: 2rem; font-weight: bold;'>Quiz Complete! Final Score: ${geoGameState.score}/30</span>`;
        setTimeout(closeGeoGameModal, 4000);
      } else {
        nextGeoGameQuestion();
      }
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Geography Game: DOMContentLoaded fired');
  const openBtn = document.getElementById('open-geo-game-btn');
  console.log('Geography Game: Found button:', openBtn);
  if (openBtn) {
    openBtn.onclick = showGeoGameModal;
    console.log('Geography Game: Click handler attached');
  } else {
    console.log('Geography Game: Button not found!');
  }
}); 