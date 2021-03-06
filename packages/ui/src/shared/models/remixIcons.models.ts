export enum IconType {
  fill = "fill",
  line = "line",
}

/** Localizable icon name, which can include different options for LTR and RTL languages */
export type i18nIconName =
  | IconName
  | {
      ltr?: IconName
      rtl?: IconName
    }

/** Icon names based on Remix Icons */
export enum IconName {
  "24Hours" = "24Hours",
  "4K" = "4K",
  accountBox = "accountBox",
  accountCircle = "accountCircle",
  accountPinBox = "accountPinBox",
  accountPinCircle = "accountPinCircle",
  add = "add",
  addBox = "addBox",
  addCircle = "addCircle",
  admin = "admin",
  advertisement = "advertisement",
  airplay = "airplay",
  alarm = "alarm",
  alarmWarning = "alarmWarning",
  album = "album",
  alert = "alert",
  aliens = "aliens",
  alipay = "alipay",
  amazon = "amazon",
  anchor = "anchor",
  ancientGate = "ancientGate",
  ancientPavilion = "ancientPavilion",
  android = "android",
  angularjs = "angularjs",
  anticlockwise = "anticlockwise",
  anticlockwise2 = "anticlockwise2",
  appStore = "appStore",
  apple = "apple",
  apps = "apps",
  apps2 = "apps2",
  archive = "archive",
  archiveDrawer = "archiveDrawer",
  arrowDown = "arrowDown",
  arrowDownCircle = "arrowDownCircle",
  arrowDownS = "arrowDownS",
  arrowDropDown = "arrowDropDown",
  arrowDropLeft = "arrowDropLeft",
  arrowDropRight = "arrowDropRight",
  arrowDropUp = "arrowDropUp",
  arrowGoBack = "arrowGoBack",
  arrowGoForward = "arrowGoForward",
  arrowLeft = "arrowLeft",
  arrowLeftCircle = "arrowLeftCircle",
  arrowLeftDown = "arrowLeftDown",
  arrowLeftRight = "arrowLeftRight",
  arrowLeftS = "arrowLeftS",
  arrowLeftUp = "arrowLeftUp",
  arrowRight = "arrowRight",
  arrowRightCircle = "arrowRightCircle",
  arrowRightDown = "arrowRightDown",
  arrowRightS = "arrowRightS",
  arrowRightUp = "arrowRightUp",
  arrowUp = "arrowUp",
  arrowUpCircle = "arrowUpCircle",
  arrowUpDown = "arrowUpDown",
  arrowUpS = "arrowUpS",
  artboard = "artboard",
  artboard2 = "artboard2",
  article = "article",
  aspectRatio = "aspectRatio",
  at = "at",
  attachment = "attachment",
  auction = "auction",
  award = "award",
  baidu = "baidu",
  ballPen = "ballPen",
  bank = "bank",
  bankCard = "bankCard",
  bankCard2 = "bankCard2",
  barChart = "barChart",
  barChart2 = "barChart2",
  barChartBox = "barChartBox",
  barChartGrouped = "barChartGrouped",
  barChartHorizontal = "barChartHorizontal",
  barcode = "barcode",
  barcodeBox = "barcodeBox",
  barricade = "barricade",
  baseStation = "baseStation",
  basketball = "basketball",
  battery = "battery",
  battery2 = "battery2",
  battery2Charge = "battery2Charge",
  batteryCharge = "batteryCharge",
  batteryLow = "batteryLow",
  batterySaver = "batterySaver",
  batteryShare = "batteryShare",
  bearSmile = "bearSmile",
  behance = "behance",
  bell = "bell",
  bike = "bike",
  bilibili = "bilibili",
  bill = "bill",
  billiards = "billiards",
  bitCoin = "bitCoin",
  blaze = "blaze",
  bluetooth = "bluetooth",
  bluetoothConnect = "bluetoothConnect",
  blurOff = "blurOff",
  bodyScan = "bodyScan",
  book = "book",
  book2 = "book2",
  book3 = "book3",
  bookMark = "bookMark",
  bookOpen = "bookOpen",
  bookRead = "bookRead",
  booklet = "booklet",
  bookmark = "bookmark",
  bookmark2 = "bookmark2",
  bookmark3 = "bookmark3",
  boxing = "boxing",
  braces = "braces",
  brackets = "brackets",
  briefcase = "briefcase",
  briefcase2 = "briefcase2",
  briefcase3 = "briefcase3",
  briefcase4 = "briefcase4",
  briefcase5 = "briefcase5",
  broadcast = "broadcast",
  brush = "brush",
  brush2 = "brush2",
  brush3 = "brush3",
  brush4 = "brush4",
  bubbleChart = "bubbleChart",
  bug = "bug",
  bug2 = "bug2",
  building = "building",
  building2 = "building2",
  building3 = "building3",
  building4 = "building4",
  bus = "bus",
  bus2 = "bus2",
  busWifi = "busWifi",
  cactus = "cactus",
  cake = "cake",
  cake2 = "cake2",
  cake3 = "cake3",
  calculator = "calculator",
  calendar = "calendar",
  calendar2 = "calendar2",
  calendarCheck = "calendarCheck",
  calendarEvent = "calendarEvent",
  calendarTodo = "calendarTodo",
  camera = "camera",
  camera2 = "camera2",
  camera3 = "camera3",
  cameraLens = "cameraLens",
  cameraOff = "cameraOff",
  cameraSwitch = "cameraSwitch",
  capsule = "capsule",
  car = "car",
  carWashing = "carWashing",
  caravan = "caravan",
  cast = "cast",
  cellphone = "cellphone",
  celsius = "celsius",
  centos = "centos",
  characterRecognition = "characterRecognition",
  chargingPile = "chargingPile",
  chargingPile2 = "chargingPile2",
  chat1 = "chat1",
  chat2 = "chat2",
  chat3 = "chat3",
  chat4 = "chat4",
  chatCheck = "chatCheck",
  chatDelete = "chatDelete",
  chatDownload = "chatDownload",
  chatFollowUp = "chatFollowUp",
  chatForward = "chatForward",
  chatHeart = "chatHeart",
  chatHistory = "chatHistory",
  chatNew = "chatNew",
  chatOff = "chatOff",
  chatPoll = "chatPoll",
  chatPrivate = "chatPrivate",
  chatQuote = "chatQuote",
  chatSettings = "chatSettings",
  chatSmile = "chatSmile",
  chatSmile2 = "chatSmile2",
  chatSmile3 = "chatSmile3",
  chatUpload = "chatUpload",
  chatVoice = "chatVoice",
  check = "check",
  checkDouble = "checkDouble",
  checkbox = "checkbox",
  checkboxBlank = "checkboxBlank",
  checkboxBlankCircle = "checkboxBlankCircle",
  checkboxCircle = "checkboxCircle",
  checkboxIndeterminate = "checkboxIndeterminate",
  checkboxMultiple = "checkboxMultiple",
  checkboxMultipleBlank = "checkboxMultipleBlank",
  chinaRailway = "chinaRailway",
  chrome = "chrome",
  clapperboard = "clapperboard",
  clipboard = "clipboard",
  clockwise = "clockwise",
  clockwise2 = "clockwise2",
  close = "close",
  closeCircle = "closeCircle",
  closedCaptioning = "closedCaptioning",
  cloud = "cloud",
  cloudOff = "cloudOff",
  cloudWindy = "cloudWindy",
  cloudy = "cloudy",
  cloudy2 = "cloudy2",
  code = "code",
  codeBox = "codeBox",
  codeS = "codeS",
  codeSSlash = "codeSSlash",
  codepen = "codepen",
  coin = "coin",
  coins = "coins",
  collage = "collage",
  command = "command",
  community = "community",
  compass = "compass",
  compass2 = "compass2",
  compass3 = "compass3",
  compass4 = "compass4",
  compassDiscover = "compassDiscover",
  compasses = "compasses",
  compasses2 = "compasses2",
  computer = "computer",
  contacts = "contacts",
  contactsBook = "contactsBook",
  contactsBook2 = "contactsBook2",
  contactsBookUpload = "contactsBookUpload",
  contrast = "contrast",
  contrast2 = "contrast2",
  contrastDrop = "contrastDrop",
  contrastDrop2 = "contrastDrop2",
  copperCoin = "copperCoin",
  copperDiamond = "copperDiamond",
  copyleft = "copyleft",
  copyright = "copyright",
  coreos = "coreos",
  coupon = "coupon",
  coupon2 = "coupon2",
  coupon3 = "coupon3",
  coupon4 = "coupon4",
  coupon5 = "coupon5",
  cpu = "cpu",
  creativeCommons = "creativeCommons",
  creativeCommonsBy = "creativeCommonsBy",
  creativeCommonsNc = "creativeCommonsNc",
  creativeCommonsNd = "creativeCommonsNd",
  creativeCommonsSa = "creativeCommonsSa",
  creativeCommonsZero = "creativeCommonsZero",
  criminal = "criminal",
  crop = "crop",
  crop2 = "crop2",
  css3 = "css3",
  cup = "cup",
  currency = "currency",
  cursor = "cursor",
  customerService = "customerService",
  customerService2 = "customerService2",
  dashboard = "dashboard",
  dashboard2 = "dashboard2",
  dashboard3 = "dashboard3",
  database = "database",
  database2 = "database2",
  deleteBack = "deleteBack",
  deleteBack2 = "deleteBack2",
  deleteBin = "deleteBin",
  deleteBin2 = "deleteBin2",
  deleteBin3 = "deleteBin3",
  deleteBin4 = "deleteBin4",
  deleteBin5 = "deleteBin5",
  deleteBin6 = "deleteBin6",
  deleteBin7 = "deleteBin7",
  device = "device",
  deviceRecover = "deviceRecover",
  dingding = "dingding",
  direction = "direction",
  disc = "disc",
  discord = "discord",
  discuss = "discuss",
  dislike = "dislike",
  disqus = "disqus",
  divide = "divide",
  donutChart = "donutChart",
  door = "door",
  doorClosed = "doorClosed",
  doorLock = "doorLock",
  doorLockBox = "doorLockBox",
  doorOpen = "doorOpen",
  dossier = "dossier",
  douban = "douban",
  download = "download",
  download2 = "download2",
  downloadCloud = "downloadCloud",
  downloadCloud2 = "downloadCloud2",
  draft = "draft",
  dragDrop = "dragDrop",
  dragMove = "dragMove",
  dragMove2 = "dragMove2",
  dribbble = "dribbble",
  drive = "drive",
  drizzle = "drizzle",
  drop = "drop",
  dropbox = "dropbox",
  dualSim1 = "dualSim1",
  dualSim2 = "dualSim2",
  dv = "dv",
  dvd = "dvd",
  eBike = "eBike",
  eBike2 = "eBike2",
  earth = "earth",
  earthquake = "earthquake",
  edge = "edge",
  edit = "edit",
  edit2 = "edit2",
  editBox = "editBox",
  editCircle = "editCircle",
  eject = "eject",
  emotion = "emotion",
  emotion2 = "emotion2",
  emotionHappy = "emotionHappy",
  emotionLaugh = "emotionLaugh",
  emotionNormal = "emotionNormal",
  emotionSad = "emotionSad",
  emotionUnhappy = "emotionUnhappy",
  empathize = "empathize",
  equalizer = "equalizer",
  eraser = "eraser",
  errorWarning = "errorWarning",
  evernote = "evernote",
  exchange = "exchange",
  exchangeBox = "exchangeBox",
  exchangeCny = "exchangeCny",
  exchangeDollar = "exchangeDollar",
  exchangeFunds = "exchangeFunds",
  externalLink = "externalLink",
  eye = "eye",
  eye2 = "eye2",
  eyeClose = "eyeClose",
  eyeOff = "eyeOff",
  facebook = "facebook",
  facebookBox = "facebookBox",
  facebookCircle = "facebookCircle",
  fahrenheit = "fahrenheit",
  feedback = "feedback",
  file = "file",
  file2 = "file2",
  file3 = "file3",
  file4 = "file4",
  fileAdd = "fileAdd",
  fileChart = "fileChart",
  fileChart2 = "fileChart2",
  fileCloud = "fileCloud",
  fileCode = "fileCode",
  fileCopy = "fileCopy",
  fileCopy2 = "fileCopy2",
  fileDamage = "fileDamage",
  fileDownload = "fileDownload",
  fileEdit = "fileEdit",
  fileExcel = "fileExcel",
  fileExcel2 = "fileExcel2",
  fileForbid = "fileForbid",
  fileGif = "fileGif",
  fileHistory = "fileHistory",
  fileHwp = "fileHwp",
  fileInfo = "fileInfo",
  fileList = "fileList",
  fileList2 = "fileList2",
  fileList3 = "fileList3",
  fileLock = "fileLock",
  fileMark = "fileMark",
  fileMusic = "fileMusic",
  filePaper = "filePaper",
  filePaper2 = "filePaper2",
  filePdf = "filePdf",
  filePpt = "filePpt",
  filePpt2 = "filePpt2",
  fileReduce = "fileReduce",
  fileSearch = "fileSearch",
  fileSettings = "fileSettings",
  fileShield = "fileShield",
  fileShield2 = "fileShield2",
  fileShred = "fileShred",
  fileText = "fileText",
  fileTransfer = "fileTransfer",
  fileUnknow = "fileUnknow",
  fileUpload = "fileUpload",
  fileUser = "fileUser",
  fileWarning = "fileWarning",
  fileWord = "fileWord",
  fileWord2 = "fileWord2",
  fileZip = "fileZip",
  film = "film",
  filter = "filter",
  filter2 = "filter2",
  filter3 = "filter3",
  filterOff = "filterOff",
  findReplace = "findReplace",
  finder = "finder",
  fingerprint = "fingerprint",
  fingerprint2 = "fingerprint2",
  fire = "fire",
  firefox = "firefox",
  firstAidKit = "firstAidKit",
  flag = "flag",
  flag2 = "flag2",
  flashlight = "flashlight",
  flask = "flask",
  flightLand = "flightLand",
  flightTakeoff = "flightTakeoff",
  flood = "flood",
  flutter = "flutter",
  focus = "focus",
  focus2 = "focus2",
  focus3 = "focus3",
  foggy = "foggy",
  folder = "folder",
  folder2 = "folder2",
  folder3 = "folder3",
  folder4 = "folder4",
  folder5 = "folder5",
  folderAdd = "folderAdd",
  folderChart = "folderChart",
  folderChart2 = "folderChart2",
  folderDownload = "folderDownload",
  folderForbid = "folderForbid",
  folderHistory = "folderHistory",
  folderInfo = "folderInfo",
  folderKeyhole = "folderKeyhole",
  folderLock = "folderLock",
  folderMusic = "folderMusic",
  folderOpen = "folderOpen",
  folderReceived = "folderReceived",
  folderReduce = "folderReduce",
  folderSettings = "folderSettings",
  folderShared = "folderShared",
  folderShield = "folderShield",
  folderShield2 = "folderShield2",
  folderTransfer = "folderTransfer",
  folderUnknow = "folderUnknow",
  folderUpload = "folderUpload",
  folderUser = "folderUser",
  folderWarning = "folderWarning",
  folderZip = "folderZip",
  folders = "folders",
  football = "football",
  footprint = "footprint",
  forbid = "forbid",
  forbid2 = "forbid2",
  fridge = "fridge",
  fullscreen = "fullscreen",
  fullscreenExit = "fullscreenExit",
  function = "function",
  funds = "funds",
  fundsBox = "fundsBox",
  gallery = "gallery",
  galleryUpload = "galleryUpload",
  game = "game",
  gamepad = "gamepad",
  gasStation = "gasStation",
  gatsby = "gatsby",
  genderless = "genderless",
  ghost = "ghost",
  ghost2 = "ghost2",
  ghostSmile = "ghostSmile",
  gift = "gift",
  gift2 = "gift2",
  gitBranch = "gitBranch",
  gitCommit = "gitCommit",
  gitMerge = "gitMerge",
  gitPullRequest = "gitPullRequest",
  gitRepository = "gitRepository",
  gitRepositoryCommits = "gitRepositoryCommits",
  gitRepositoryPrivate = "gitRepositoryPrivate",
  github = "github",
  gitlab = "gitlab",
  global = "global",
  globe = "globe",
  goblet = "goblet",
  google = "google",
  googlePlay = "googlePlay",
  government = "government",
  gps = "gps",
  gradienter = "gradienter",
  grid = "grid",
  group = "group",
  group2 = "group2",
  guide = "guide",
  hail = "hail",
  hammer = "hammer",
  handCoin = "handCoin",
  handHeart = "handHeart",
  handSanitizer = "handSanitizer",
  handbag = "handbag",
  hardDrive = "hardDrive",
  hardDrive2 = "hardDrive2",
  haze = "haze",
  haze2 = "haze2",
  hd = "hd",
  headphone = "headphone",
  healthBook = "healthBook",
  heart = "heart",
  heart2 = "heart2",
  heart3 = "heart3",
  heartAdd = "heartAdd",
  heartPulse = "heartPulse",
  hearts = "hearts",
  heavyShowers = "heavyShowers",
  history = "history",
  home = "home",
  home2 = "home2",
  home3 = "home3",
  home4 = "home4",
  home5 = "home5",
  home6 = "home6",
  home7 = "home7",
  home8 = "home8",
  homeGear = "homeGear",
  homeHeart = "homeHeart",
  homeSmile = "homeSmile",
  homeSmile2 = "homeSmile2",
  homeWifi = "homeWifi",
  honorOfKings = "honorOfKings",
  honour = "honour",
  hospital = "hospital",
  hotel = "hotel",
  hotelBed = "hotelBed",
  hotspot = "hotspot",
  hq = "hq",
  html5 = "html5",
  ie = "ie",
  image = "image",
  image2 = "image2",
  imageAdd = "imageAdd",
  imageEdit = "imageEdit",
  inbox = "inbox",
  inboxArchive = "inboxArchive",
  inboxUnarchive = "inboxUnarchive",
  increaseDecrease = "increaseDecrease",
  indeterminateCircle = "indeterminateCircle",
  information = "information",
  infraredThermometer = "infraredThermometer",
  inkBottle = "inkBottle",
  inputMethod = "inputMethod",
  instagram = "instagram",
  install = "install",
  invision = "invision",
  kakaoTalk = "kakaoTalk",
  key = "key",
  key2 = "key2",
  keyboard = "keyboard",
  keyboardBox = "keyboardBox",
  keynote = "keynote",
  knife = "knife",
  knifeBlood = "knifeBlood",
  landscape = "landscape",
  layout = "layout",
  layout2 = "layout2",
  layout3 = "layout3",
  layout4 = "layout4",
  layout5 = "layout5",
  layout6 = "layout6",
  layoutBottom = "layoutBottom",
  layoutBottom2 = "layoutBottom2",
  layoutColumn = "layoutColumn",
  layoutGrid = "layoutGrid",
  layoutLeft = "layoutLeft",
  layoutLeft2 = "layoutLeft2",
  layoutMasonry = "layoutMasonry",
  layoutRight = "layoutRight",
  layoutRight2 = "layoutRight2",
  layoutRow = "layoutRow",
  layoutTop = "layoutTop",
  layoutTop2 = "layoutTop2",
  leaf = "leaf",
  lifebuoy = "lifebuoy",
  lightbulb = "lightbulb",
  lightbulbFlash = "lightbulbFlash",
  line = "line",
  lineChart = "lineChart",
  linkedin = "linkedin",
  linkedinBox = "linkedinBox",
  links = "links",
  listSettings = "listSettings",
  live = "live",
  loader = "loader",
  loader2 = "loader2",
  loader3 = "loader3",
  loader4 = "loader4",
  loader5 = "loader5",
  lock = "lock",
  lock2 = "lock2",
  lockPassword = "lockPassword",
  lockUnlock = "lockUnlock",
  loginBox = "loginBox",
  loginCircle = "loginCircle",
  logoutBox = "logoutBox",
  logoutBoxR = "logoutBoxR",
  logoutCircle = "logoutCircle",
  logoutCircleR = "logoutCircleR",
  luggageCart = "luggageCart",
  luggageDeposit = "luggageDeposit",
  lungs = "lungs",
  mac = "mac",
  macbook = "macbook",
  magic = "magic",
  mail = "mail",
  mailAdd = "mailAdd",
  mailCheck = "mailCheck",
  mailClose = "mailClose",
  mailDownload = "mailDownload",
  mailForbid = "mailForbid",
  mailLock = "mailLock",
  mailOpen = "mailOpen",
  mailSend = "mailSend",
  mailSettings = "mailSettings",
  mailStar = "mailStar",
  mailUnread = "mailUnread",
  mailVolume = "mailVolume",
  map = "map",
  map2 = "map2",
  mapPin = "mapPin",
  mapPin2 = "mapPin2",
  mapPin3 = "mapPin3",
  mapPin4 = "mapPin4",
  mapPin5 = "mapPin5",
  mapPinAdd = "mapPinAdd",
  mapPinRange = "mapPinRange",
  mapPinTime = "mapPinTime",
  mapPinUser = "mapPinUser",
  markPen = "markPen",
  markdown = "markdown",
  markup = "markup",
  mastercard = "mastercard",
  mastodon = "mastodon",
  medal = "medal",
  medal2 = "medal2",
  medicineBottle = "medicineBottle",
  medium = "medium",
  men = "men",
  mentalHealth = "mentalHealth",
  menu = "menu",
  menu2 = "menu2",
  menu3 = "menu3",
  menu4 = "menu4",
  menu5 = "menu5",
  menuAdd = "menuAdd",
  menuFold = "menuFold",
  menuUnfold = "menuUnfold",
  message = "message",
  message2 = "message2",
  message3 = "message3",
  messenger = "messenger",
  meteor = "meteor",
  mic = "mic",
  mic2 = "mic2",
  micOff = "micOff",
  mickey = "mickey",
  microscope = "microscope",
  microsoft = "microsoft",
  miniProgram = "miniProgram",
  mist = "mist",
  moneyCnyBox = "moneyCnyBox",
  moneyCnyCircle = "moneyCnyCircle",
  moneyDollarBox = "moneyDollarBox",
  moneyDollarCircle = "moneyDollarCircle",
  moneyEuroBox = "moneyEuroBox",
  moneyEuroCircle = "moneyEuroCircle",
  moneyPoundBox = "moneyPoundBox",
  moneyPoundCircle = "moneyPoundCircle",
  moon = "moon",
  moonClear = "moonClear",
  moonCloudy = "moonCloudy",
  moonFoggy = "moonFoggy",
  more = "more",
  more2 = "more2",
  motorbike = "motorbike",
  mouse = "mouse",
  movie = "movie",
  movie2 = "movie2",
  music = "music",
  music2 = "music2",
  mv = "mv",
  navigation = "navigation",
  neteaseCloudMusic = "neteaseCloudMusic",
  netflix = "netflix",
  newspaper = "newspaper",
  notification = "notification",
  notification2 = "notification2",
  notification3 = "notification3",
  notification4 = "notification4",
  notificationBadge = "notificationBadge",
  notificationOff = "notificationOff",
  npmjs = "npmjs",
  numbers = "numbers",
  nurse = "nurse",
  oil = "oil",
  openArm = "openArm",
  openSource = "openSource",
  opera = "opera",
  orderPlay = "orderPlay",
  outlet = "outlet",
  outlet2 = "outlet2",
  pages = "pages",
  paint = "paint",
  paintBrush = "paintBrush",
  palette = "palette",
  pantone = "pantone",
  parent = "parent",
  parentheses = "parentheses",
  parking = "parking",
  parkingBox = "parkingBox",
  passport = "passport",
  patreon = "patreon",
  pause = "pause",
  pauseCircle = "pauseCircle",
  pauseMini = "pauseMini",
  paypal = "paypal",
  penNib = "penNib",
  pencil = "pencil",
  pencilRuler = "pencilRuler",
  pencilRuler2 = "pencilRuler2",
  percent = "percent",
  phone = "phone",
  phoneCamera = "phoneCamera",
  phoneFind = "phoneFind",
  phoneLock = "phoneLock",
  pictureInPicture = "pictureInPicture",
  pictureInPicture2 = "pictureInPicture2",
  pictureInPictureExit = "pictureInPictureExit",
  pieChart = "pieChart",
  pieChart2 = "pieChart2",
  pieChartBox = "pieChartBox",
  pinDistance = "pinDistance",
  pingPong = "pingPong",
  pinterest = "pinterest",
  pixelfed = "pixelfed",
  plane = "plane",
  plant = "plant",
  play = "play",
  playCircle = "playCircle",
  playList = "playList",
  playList2 = "playList2",
  playListAdd = "playListAdd",
  playMini = "playMini",
  playstation = "playstation",
  plug = "plug",
  plug2 = "plug2",
  polaroid = "polaroid",
  polaroid2 = "polaroid2",
  policeCar = "policeCar",
  priceTag = "priceTag",
  priceTag2 = "priceTag2",
  priceTag3 = "priceTag3",
  printer = "printer",
  printerCloud = "printerCloud",
  productHunt = "productHunt",
  profile = "profile",
  projector = "projector",
  projector2 = "projector2",
  psychotherapy = "psychotherapy",
  pulse = "pulse",
  pushpin = "pushpin",
  pushpin2 = "pushpin2",
  qq = "qq",
  qrCode = "qrCode",
  qrScan = "qrScan",
  qrScan2 = "qrScan2",
  question = "question",
  questionAnswer = "questionAnswer",
  questionnaire = "questionnaire",
  quillPen = "quillPen",
  radar = "radar",
  radio = "radio",
  radio2 = "radio2",
  radioButton = "radioButton",
  rainbow = "rainbow",
  rainy = "rainy",
  reactjs = "reactjs",
  recordCircle = "recordCircle",
  recordMail = "recordMail",
  recycle = "recycle",
  redPacket = "redPacket",
  reddit = "reddit",
  refresh = "refresh",
  refund = "refund",
  refund2 = "refund2",
  registered = "registered",
  remixicon = "remixicon",
  remoteControl = "remoteControl",
  remoteControl2 = "remoteControl2",
  repeat = "repeat",
  repeat2 = "repeat2",
  repeatOne = "repeatOne",
  reply = "reply",
  replyAll = "replyAll",
  reserved = "reserved",
  restTime = "restTime",
  restart = "restart",
  restaurant = "restaurant",
  restaurant2 = "restaurant2",
  rewind = "rewind",
  rewindMini = "rewindMini",
  rhythm = "rhythm",
  riding = "riding",
  roadMap = "roadMap",
  roadster = "roadster",
  robot = "robot",
  rocket = "rocket",
  rocket2 = "rocket2",
  rotateLock = "rotateLock",
  route = "route",
  router = "router",
  rss = "rss",
  ruler = "ruler",
  ruler2 = "ruler2",
  run = "run",
  safari = "safari",
  safe = "safe",
  safe2 = "safe2",
  sailboat = "sailboat",
  save = "save",
  save2 = "save2",
  save3 = "save3",
  scales = "scales",
  scales2 = "scales2",
  scales3 = "scales3",
  scan = "scan",
  scan2 = "scan2",
  scissors = "scissors",
  scissors2 = "scissors2",
  scissorsCut = "scissorsCut",
  screenshot = "screenshot",
  screenshot2 = "screenshot2",
  sdCard = "sdCard",
  sdCardMini = "sdCardMini",
  search = "search",
  search2 = "search2",
  searchEye = "searchEye",
  securePayment = "securePayment",
  seedling = "seedling",
  sendPlane = "sendPlane",
  sendPlane2 = "sendPlane2",
  sensor = "sensor",
  server = "server",
  service = "service",
  settings = "settings",
  settings2 = "settings2",
  settings3 = "settings3",
  settings4 = "settings4",
  settings5 = "settings5",
  settings6 = "settings6",
  shape = "shape",
  shape2 = "shape2",
  share = "share",
  shareBox = "shareBox",
  shareCircle = "shareCircle",
  shareForward = "shareForward",
  shareForward2 = "shareForward2",
  shareForwardBox = "shareForwardBox",
  shield = "shield",
  shieldCheck = "shieldCheck",
  shieldCross = "shieldCross",
  shieldFlash = "shieldFlash",
  shieldKeyhole = "shieldKeyhole",
  shieldStar = "shieldStar",
  shieldUser = "shieldUser",
  ship = "ship",
  ship2 = "ship2",
  shirt = "shirt",
  shoppingBag = "shoppingBag",
  shoppingBag2 = "shoppingBag2",
  shoppingBag3 = "shoppingBag3",
  shoppingBasket = "shoppingBasket",
  shoppingBasket2 = "shoppingBasket2",
  shoppingCart = "shoppingCart",
  shoppingCart2 = "shoppingCart2",
  showers = "showers",
  shuffle = "shuffle",
  shutDown = "shutDown",
  sideBar = "sideBar",
  signalTower = "signalTower",
  signalWifi = "signalWifi",
  signalWifi1 = "signalWifi1",
  signalWifi2 = "signalWifi2",
  signalWifi3 = "signalWifi3",
  signalWifiError = "signalWifiError",
  signalWifiOff = "signalWifiOff",
  simCard = "simCard",
  simCard2 = "simCard2",
  sip = "sip",
  skipBack = "skipBack",
  skipBackMini = "skipBackMini",
  skipForward = "skipForward",
  skipForwardMini = "skipForwardMini",
  skull = "skull",
  skull2 = "skull2",
  skype = "skype",
  slack = "slack",
  slice = "slice",
  slideshow = "slideshow",
  slideshow2 = "slideshow2",
  slideshow3 = "slideshow3",
  slideshow4 = "slideshow4",
  smartphone = "smartphone",
  snapchat = "snapchat",
  snowy = "snowy",
  soundModule = "soundModule",
  soundcloud = "soundcloud",
  spaceShip = "spaceShip",
  spam = "spam",
  spam2 = "spam2",
  spam3 = "spam3",
  speaker = "speaker",
  speaker2 = "speaker2",
  speaker3 = "speaker3",
  spectrum = "spectrum",
  speed = "speed",
  speedMini = "speedMini",
  spotify = "spotify",
  spy = "spy",
  stack = "stack",
  stackOverflow = "stackOverflow",
  stackshare = "stackshare",
  star = "star",
  starHalf = "starHalf",
  starHalfS = "starHalfS",
  starS = "starS",
  starSmile = "starSmile",
  steam = "steam",
  steering = "steering",
  steering2 = "steering2",
  stethoscope = "stethoscope",
  stickyNote = "stickyNote",
  stickyNote2 = "stickyNote2",
  stock = "stock",
  stop = "stop",
  stopCircle = "stopCircle",
  stopMini = "stopMini",
  store = "store",
  store2 = "store2",
  store3 = "store3",
  subtract = "subtract",
  subway = "subway",
  subwayWifi = "subwayWifi",
  suitcase = "suitcase",
  suitcase2 = "suitcase2",
  suitcase3 = "suitcase3",
  sun = "sun",
  sunCloudy = "sunCloudy",
  sunFoggy = "sunFoggy",
  surgicalMask = "surgicalMask",
  surroundSound = "surroundSound",
  survey = "survey",
  swap = "swap",
  swapBox = "swapBox",
  switch = "switch",
  sword = "sword",
  syringe = "syringe",
  tBox = "tBox",
  tShirt = "tShirt",
  tShirt2 = "tShirt2",
  tShirtAir = "tShirtAir",
  table = "table",
  tableAlt = "tableAlt",
  tablet = "tablet",
  takeaway = "takeaway",
  taobao = "taobao",
  tape = "tape",
  task = "task",
  taxi = "taxi",
  taxiWifi = "taxiWifi",
  team = "team",
  telegram = "telegram",
  tempCold = "tempCold",
  tempHot = "tempHot",
  terminal = "terminal",
  terminalBox = "terminalBox",
  terminalWindow = "terminalWindow",
  testTube = "testTube",
  thermometer = "thermometer",
  thumbDown = "thumbDown",
  thumbUp = "thumbUp",
  thunderstorms = "thunderstorms",
  ticket = "ticket",
  ticket2 = "ticket2",
  time = "time",
  timer = "timer",
  timer2 = "timer2",
  timerFlash = "timerFlash",
  todo = "todo",
  toggle = "toggle",
  tools = "tools",
  tornado = "tornado",
  trademark = "trademark",
  trafficLight = "trafficLight",
  train = "train",
  trainWifi = "trainWifi",
  travesti = "travesti",
  treasureMap = "treasureMap",
  trello = "trello",
  trophy = "trophy",
  truck = "truck",
  tumblr = "tumblr",
  tv = "tv",
  tv2 = "tv2",
  twitch = "twitch",
  twitter = "twitter",
  typhoon = "typhoon",
  uDisk = "uDisk",
  ubuntu = "ubuntu",
  umbrella = "umbrella",
  uninstall = "uninstall",
  unsplash = "unsplash",
  upload = "upload",
  upload2 = "upload2",
  uploadCloud = "uploadCloud",
  uploadCloud2 = "uploadCloud2",
  usb = "usb",
  user = "user",
  user2 = "user2",
  user3 = "user3",
  user4 = "user4",
  user5 = "user5",
  user6 = "user6",
  userAdd = "userAdd",
  userFollow = "userFollow",
  userHeart = "userHeart",
  userLocation = "userLocation",
  userReceived = "userReceived",
  userReceived2 = "userReceived2",
  userSearch = "userSearch",
  userSettings = "userSettings",
  userShared = "userShared",
  userShared2 = "userShared2",
  userSmile = "userSmile",
  userStar = "userStar",
  userUnfollow = "userUnfollow",
  userVoice = "userVoice",
  video = "video",
  videoAdd = "videoAdd",
  videoChat = "videoChat",
  videoDownload = "videoDownload",
  videoUpload = "videoUpload",
  vidicon = "vidicon",
  vidicon2 = "vidicon2",
  vimeo = "vimeo",
  vip = "vip",
  vipCrown = "vipCrown",
  vipCrown2 = "vipCrown2",
  vipDiamond = "vipDiamond",
  virus = "virus",
  visa = "visa",
  voiceRecognition = "voiceRecognition",
  voiceprint = "voiceprint",
  volumeDown = "volumeDown",
  volumeMute = "volumeMute",
  volumeOffVibrate = "volumeOffVibrate",
  volumeUp = "volumeUp",
  volumeVibrate = "volumeVibrate",
  vuejs = "vuejs",
  walk = "walk",
  wallet = "wallet",
  wallet2 = "wallet2",
  wallet3 = "wallet3",
  waterFlash = "waterFlash",
  webcam = "webcam",
  wechat = "wechat",
  wechat2 = "wechat2",
  wechatPay = "wechatPay",
  weibo = "weibo",
  whatsapp = "whatsapp",
  wheelchair = "wheelchair",
  wifi = "wifi",
  wifiOff = "wifiOff",
  window = "window",
  window2 = "window2",
  windows = "windows",
  windy = "windy",
  wirelessCharging = "wirelessCharging",
  women = "women",
  xbox = "xbox",
  xing = "xing",
  youtube = "youtube",
  zcool = "zcool",
  zhihu = "zhihu",
  zoomIn = "zoomIn",
  zoomOut = "zoomOut",
  zzz = "zzz",
}

export const DISABLED_ICON_NAME = IconName.forbid
export const LOADER_ICON_NAME = IconName.loader4
