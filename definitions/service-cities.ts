export const serviceCities = [
  "Paris",
  "Rome",
  "Florence",
  "Milan",
  "London",
  "Interlaken",
  "Jungfrau",
  "Zermatt",
  "Annecy",
  "Lisbon",
  "Barcelona",
  "Hawaii",
  "Bali",
  "Bangkok",
  "Beverly Hills",
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Shanghai",
  "Beijing",
  "Chengdu",
  "Amsterdam",
  "Berlin",
  "Vienna",
];

export const serviceCountryAndCities = {
  en: [
    { country: "USA", cities: ["Las Vegas", "New York", "Hawaii - Waikiki"] },
    { country: "Monaco", cities: ["Monte Carlo"] },
    { country: "Malaysia", cities: ["Kuala Lumpur"] },
    { country: "Switzerland", cities: ["Interlaken", "Lucerne"] },
    { country: "Spain", cities: ["Bilbao", "Madrid", "Barcelona", "Granada", "Seville"] },
    { country: "Singapore", cities: ["Fullerton Square"] },
    { country: "UAE", cities: ["Dubai - Palm Jumeirah"] },
    { country: "UK", cities: ["London"] },
    {
      country: "Italy",
      cities: ["Rome", "Florence", "Milan", "Venice", "Pisa"],
    },
    {
      country: "Indonesia",
      cities: ["Jakarta", "Labuan Bajo"],
    },
    { country: "Japan", cities: ["Tokyo", "Sapporo", "Kyoto", "Hokaido"] },
    { country: "China", cities: ["Shanghai", "Beijing",] },
    {
      country: "France",
      cities: ["Paris", "Versailles", "Cannes", "Nice", "Saint-Tropez"],
    },
    {
      country: "Philippines",
      cities: ["Manila"],
    },
    {
      country: "Hong Kong",
      cities: ["Central"],
    },
    {
      country: "South Korea",
      cities: ["Seoul"],
    },
    {
      country: "Thailand",
      cities: ["Bangkok", "Chiang Mai"],
    },
    {
      country: "Canada",
      cities: ["Toronto", "Vancouver"],
    },
    {
      country: "Australia",
      cities: ["Sydney", "Melbourne"],
    },
    {
      country: "Czech Republic",
      cities: ["Prague"],
    },
    {
      country: "Turkey",
      cities: ["Istanbul", "Cappadocia"],
    },
    {
      country: "Netherlands",
      cities: ["Amsterdam"],
    },
    {
      country: "Portugal",
      cities: ["Lisbon", "Porto"],
    },
    {
      country: "Greece",
      cities: ["Athens", "Santorini"],
    },
    { country: "New Zealand", cities: ["Auckland", "Queenstown"] },
    { country: "Mexico", cities: ["Mexico City", "Cancun"] },
    { country: "South Africa", cities: ["Cape Town", "Johannesburg"] },
    { country: "Denmark", cities: ["Copenhagen"] },
    { country: "Germany", cities: ["Berlin", "Munich"] },
    { country: "Russia", cities: ["Moscow", "St. Petersburg"] },
    { country: "ETC", cities: ["Other"] },
  ],
  ko: [
    { country: "미국", cities: ["라스 베가스", "뉴욕", "하와이 - 와이키키"] },
    { country: "모나코", cities: ["몬테 카를로"] },
    { country: "말레이시아", cities: ["쿠알라룸푸르"] },
    { country: "스위스", cities: ["인터라켄", "루체른"] },
    { country: "스페인", cities: ["빌바오", "마드리드", "바르셀로나", "그라나다", "세비야"] },
    { country: "싱가포르", cities: ["풀러턴 스퀘어"] },
  { country: "아랍에미리트", cities: ["두바이 - 팜주메이라"] },
  { country: "영국", cities: ["런던"] },
  {
    country: "이탈리아",
    cities: ["로마", "피렌체", "밀라노", "베니스", "피사"]
  },
  {
    country: "인도네시아",
    cities: ["자카르타", "라부안 바조"]
  },
  { country: "일본", cities: ["도쿄", "삿포로", "교토", "홋카이도"] },
  { country: "중국", cities: ["상하이", "베이징"] },
  {
    country: "프랑스",
    cities: ["파리", "베르사유", "칸", "니스", "생트로페"]
  },
  {
    country: "필리핀",
    cities: ["마닐라"]
  },
  {
    country: "홍콩",
    cities: ["센트럴"]
  },
  {
    country: "대한민국",
    cities: ["서울"]
  },
  {
    country: "태국",
    cities: ["방콕", "치앙마이"]
  },
  {
    country: "캐나다",
    cities: ["토론토", "밴쿠버"]
  },
  {
    country: "호주",
    cities: ["시드니", "멜버른"]
  },
  {
    country: "체코",
    cities: ["프라하"]
  },
  {
    country: "터키",
    cities: ["이스탄불", "카파도키아"]
  },
  {
    country: "네덜란드",
    cities: ["암스테르담"]
  },
  {
    country: "포르투갈",
    cities: ["리스본", "포르투"]
  },
  {
    country: "그리스",
    cities: ["아테네", "산토리니"]
  },
  { country: "뉴질랜드", cities: ["오클랜드", "퀸스타운"] },
  { country: "멕시코", cities: ["멕시코시티", "칸쿤"] },
  { country: "남아프리카 공화국", cities: ["케이프타운", "요하네스버그"] },
  { country: "덴마크", cities: ["코펜하겐"] },
  { country: "독일", cities: ["베를린", "뮌헨"] },
  { country: "러시아", cities: ["모스크바", "상트페테르부르크"] },
  { country: "기타", cities: ["기타"] }],
};

export const serviceCitiesTimezones: Record<string, string> = {
  Paris: "Europe/Paris",
  Rome: "Europe/Rome",
  Florence: "Europe/Rome",
  Milan: "Europe/Rome",
  London: "Europe/London",
  Interlaken: "Europe/Zurich",
  Jungfrau: "Europe/Zurich",
  Zermatt: "Europe/Zurich",
  Annecy: "Europe/Paris",
  Lisbon: "Europe/Lisbon",
  Barcelona: "Europe/Madrid",
  Hawaii: "Pacific/Honolulu",
  Bali: "Asia/Makassar",
  Bangkok: "Asia/Bangkok",
  "Beverly Hills": "America/Los_Angeles",
  Tokyo: "Asia/Tokyo",
  Osaka: "Asia/Tokyo",
  Kyoto: "Asia/Tokyo",
  Shanghai: "Asia/Shanghai",
  Beijing: "Asia/Shanghai",
  Chengdu: "Asia/Shanghai",
  Amsterdam: "Europe/Amsterdam",
  Berlin: "Europe/Berlin",
  Vienna: "Europe/Vienna",
};
