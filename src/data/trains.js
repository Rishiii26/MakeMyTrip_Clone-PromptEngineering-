export const sampleTrains = [
  {
    id: 'tr-201',
    trainNumber: '12952',
    trainName: 'NEW DELHI - MUMBAI CENTRAL TEJAS RAJDHANI',
    type: 'Rajdhani / Tejas Superfast',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Mumbai Central (MMCT)',
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distanceKm: 1386,
    pantryCar: true,
    classes: [
      { code: '3A', name: 'AC 3 Tier', price: 2240, status: 'AVAILABLE 48', statusType: 'avail' },
      { code: '2A', name: 'AC 2 Tier', price: 3180, status: 'AVAILABLE 22', statusType: 'avail' },
      { code: '1A', name: 'AC 1st Class', price: 4865, status: 'AVAILABLE 06', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-202',
    trainNumber: '22436',
    trainName: 'VANDE BHARAT EXPRESS (VARANASI)',
    type: 'Vande Bharat Semi-High Speed',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Varanasi Junction (BSB)',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '08h 00m',
    runsOn: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    distanceKm: 759,
    pantryCar: true,
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 1750, status: 'AVAILABLE 84', statusType: 'avail' },
      { code: 'EC', name: 'Exec Chair Car', price: 3300, status: 'AVAILABLE 14', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-203',
    trainNumber: '12004',
    trainName: 'LUCKNOW SWARNA SHATABDI EXP',
    type: 'Shatabdi Express',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Lucknow Charbagh (LKO)',
    departureTime: '06:10',
    arrivalTime: '12:40',
    duration: '06h 30m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distanceKm: 512,
    pantryCar: true,
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 1165, status: 'AVAILABLE 36', statusType: 'avail' },
      { code: 'EC', name: 'Exec Chair Car', price: 1940, status: 'AVAILABLE 08', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-204',
    trainNumber: '12260',
    trainName: 'SEALDAH DURONTO EXPRESS',
    type: 'Duronto Superfast',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Sealdah (SDAH)',
    departureTime: '19:45',
    arrivalTime: '12:25',
    duration: '16h 40m',
    runsOn: ['Mon', 'Tue', 'Thu', 'Fri'],
    distanceKm: 1458,
    pantryCar: true,
    classes: [
      { code: '3A', name: 'AC 3 Tier', price: 2310, status: 'WL 14', statusType: 'wl' },
      { code: '2A', name: 'AC 2 Tier', price: 3260, status: 'AVAILABLE 12', statusType: 'avail' },
      { code: '1A', name: 'AC 1st Class', price: 5020, status: 'AVAILABLE 04', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-205',
    trainNumber: '12954',
    trainName: 'AUGUST KRANTI RAJDHANI EXPRESS',
    type: 'Rajdhani Superfast',
    fromStation: 'Hazrat Nizamuddin (NZM)',
    toStation: 'Mumbai Central (MMCT)',
    departureTime: '17:15',
    arrivalTime: '10:05',
    duration: '16h 50m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distanceKm: 1377,
    pantryCar: true,
    classes: [
      { code: '3A', name: 'AC 3 Tier', price: 2190, status: 'RAC 18', statusType: 'rac' },
      { code: '2A', name: 'AC 2 Tier', price: 3080, status: 'AVAILABLE 19', statusType: 'avail' },
      { code: '1A', name: 'AC 1st Class', price: 4790, status: 'AVAILABLE 03', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-206',
    trainNumber: '20608',
    trainName: 'VANDE BHARAT EXPRESS (MYSURU - CHENNAI)',
    type: 'Vande Bharat Semi-High Speed',
    fromStation: 'KSR Bengaluru (SBC)',
    toStation: 'MGR Chennai Central (MAS)',
    departureTime: '14:50',
    arrivalTime: '19:20',
    duration: '04h 30m',
    runsOn: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun'],
    distanceKm: 359,
    pantryCar: true,
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 995, status: 'AVAILABLE 120', statusType: 'avail' },
      { code: 'EC', name: 'Exec Chair Car', price: 1885, status: 'AVAILABLE 18', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-207',
    trainNumber: '12138',
    trainName: 'PUNJAB MAIL',
    type: 'Superfast Express',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    departureTime: '05:15',
    arrivalTime: '07:35',
    duration: '26h 20m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distanceKm: 1541,
    pantryCar: true,
    classes: [
      { code: 'SL', name: 'Sleeper', price: 620, status: 'AVAILABLE 55', statusType: 'avail' },
      { code: '3A', name: 'AC 3 Tier', price: 1640, status: 'AVAILABLE 31', statusType: 'avail' },
      { code: '2A', name: 'AC 2 Tier', price: 2390, status: 'AVAILABLE 10', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-208',
    trainNumber: '12431',
    trainName: 'TRIVANDRUM RAJDHANI EXPRESS',
    type: 'Rajdhani Superfast',
    fromStation: 'Hazrat Nizamuddin (NZM)',
    toStation: 'Madgaon Junction Goa (MAO)',
    departureTime: '06:15',
    arrivalTime: '07:00',
    duration: '24h 45m',
    runsOn: ['Tue', 'Thu', 'Fri'],
    distanceKm: 2094,
    pantryCar: true,
    classes: [
      { code: '3A', name: 'AC 3 Tier', price: 3120, status: 'AVAILABLE 15', statusType: 'avail' },
      { code: '2A', name: 'AC 2 Tier', price: 4450, status: 'AVAILABLE 08', statusType: 'avail' },
      { code: '1A', name: 'AC 1st Class', price: 6850, status: 'AVAILABLE 02', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-209',
    trainNumber: '12002',
    trainName: 'BHOPAL SHATABDI EXPRESS',
    type: 'Shatabdi Express',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Agra Cantt (AGC)',
    departureTime: '06:00',
    arrivalTime: '07:50',
    duration: '01h 50m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat', 'Sun'],
    distanceKm: 195,
    pantryCar: true,
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 585, status: 'AVAILABLE 160', statusType: 'avail' },
      { code: 'EC', name: 'Exec Chair Car', price: 1090, status: 'AVAILABLE 24', statusType: 'avail' }
    ]
  },
  {
    id: 'tr-210',
    trainNumber: '22692',
    trainName: 'BENGALURU RAJDHANI EXPRESS',
    type: 'Rajdhani Superfast',
    fromStation: 'Hazrat Nizamuddin (NZM)',
    toStation: 'KSR Bengaluru (SBC)',
    departureTime: '20:00',
    arrivalTime: '05:20',
    duration: '33h 20m',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distanceKm: 2365,
    pantryCar: true,
    classes: [
      { code: '3A', name: 'AC 3 Tier', price: 3450, status: 'AVAILABLE 40', statusType: 'avail' },
      { code: '2A', name: 'AC 2 Tier', price: 4950, status: 'AVAILABLE 16', statusType: 'avail' }
    ]
  }
];
