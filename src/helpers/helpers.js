const checkKeyExists = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    return true;
  } else {
    return false;
  }
};

export const stringLastElement = (string, seperator) => {
  const array = string.split(seperator);
  const lastElement = array[array.length - 1];
  return lastElement;
};

export const stringFirstElement = (string, seperator) => {
  const array = string.split(seperator);
  const lastElement = array[0];
  return lastElement;
};

export const stringAtPositionElement = (string, seperator, position) => {
  const array = string.split(seperator);
  const lastElement = array[position];
  return lastElement;
};

export const pluralize = (word) => {
  var vowels = "aeiou";
  var irregulars = {
    addendum: "addenda",
    aircraft: "aircraft",
    alumna: "alumnae",
    alumnus: "alumni",
    analysis: "analyses",
    antenna: "antennae",
    antithesis: "antitheses",
    apex: "apices",
    appendix: "appendices",
    axis: "axes",
    bacillus: "bacilli",
    bacterium: "bacteria",
    basis: "bases",
    beau: "beaux",
    bison: "bison",
    bureau: "bureaux",
    cactus: "cacti",
    château: "châteaux",
    child: "children",
    codex: "codices",
    concerto: "concerti",
    corpus: "corpora",
    crisis: "crises",
    criterion: "criteria",
    curriculum: "curricula",
    datum: "data",
    deer: "deer",
    diagnosis: "diagnoses",
    die: "dice",
    dwarf: "dwarves",
    ellipsis: "ellipses",
    erratum: "errata",
    "faux pas": "faux pas",
    fez: "fezzes",
    fish: "fish",
    focus: "foci",
    foot: "feet",
    formula: "formulae",
    fungus: "fungi",
    genus: "genera",
    goose: "geese",
    graffito: "graffiti",
    grouse: "grouse",
    half: "halves",
    hoof: "hooves",
    hypothesis: "hypotheses",
    index: "indices",
    larva: "larvae",
    libretto: "libretti",
    loaf: "loaves",
    locus: "loci",
    louse: "lice",
    man: "men",
    matrix: "matrices",
    medium: "media",
    memorandum: "memoranda",
    minutia: "minutiae",
    moose: "moose",
    mouse: "mice",
    nebula: "nebulae",
    nucleus: "nuclei",
    oasis: "oases",
    offspring: "offspring",
    opus: "opera",
    ovum: "ova",
    ox: "oxen",
    parenthesis: "parentheses",
    phenomenon: "phenomena",
    phylum: "phyla",
    quiz: "quizzes",
    radius: "radii",
    referendum: "referenda",
    salmon: "salmon",
    scarf: "scarves",
    self: "selves",
    series: "series",
    sheep: "sheep",
    shrimp: "shrimp",
    species: "species",
    stimulus: "stimuli",
    stratum: "strata",
    swine: "swine",
    syllabus: "syllabi",
    symposium: "symposia",
    synopsis: "synopses",
    tableau: "tableaux",
    thesis: "theses",
    thief: "thieves",
    tooth: "teeth",
    trout: "trout",
    tuna: "tuna",
    vertebra: "vertebrae",
    vertex: "vertices",
    vita: "vitae",
    vortex: "vortices",
    wharf: "wharves",
    wife: "wives",
    wolf: "wolves",
    woman: "women",
    guy: "guys",
    buy: "buys",
    person: "people",
  };

  // function pluralize(word) {
  if (irregulars[word]) {
    return irregulars[word];
  } else if (
    word[word.length - 1] === "s" ||
    word.endsWith("sh") ||
    word.endsWith("ch") ||
    word[word.length - 1] === "x" ||
    word[word.length - 1] === "z"
  ) {
    return word + "es";
  } else if (word[word.length - 1] === "y") {
    return word.substring(0, word.length - 1) + "ies";
  } else {
    return word + "s";
  }
  // }

  // return pluralize;
};

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi, sayBye, checkKeyExists, arrayRemove };
