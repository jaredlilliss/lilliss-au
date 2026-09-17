/* VANTARANK DEMO v1 — SIMULATED DATA FOR PROTOTYPE GAMEPLAY.
 * No respondents existed. Distributions were authored to be internally coherent (Zipf-like decay,
 * counts sum to 68–90% of sample_size with the remainder an unlisted long tail) and validated by script.
 * Validation and popularity are separate: `answers` carry counts (VALID); `valid_unmeasured` are valid with
 * NO count (VALID_UNMEASURED); `rejects` are explicit non-answers (INVALID); anything else is UNMEASURED.
 * Generated 2026-09-17 by the vantarank-dataset-fleet workflow (probe + 5 authors + validation), then
 * re-validated in Python before emission. Any edit is a NEW dataset_version — never edit in place.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});
  VR.DATASETS = VR.DATASETS || {};
  var DS = {
 "dataset_id": "demo-v1",
 "dataset_version": "VANTARANK DEMO v1",
 "simulated": true,
 "dataset_source": "SIMULATED DATA FOR PROTOTYPE GAMEPLAY",
 "population_description": "NO POPULATION. Every count in this file was authored for prototype play; no respondent ever existed. Never present these numbers as measured.",
 "cohort": "none (simulated)",
 "collection_date": "2026-09 (authored, not collected)",
 "licence": "Proprietary \u2014 VANTARANK prototype data, all rights reserved. Not for redistribution.",
 "engine_min_version": "1.0.0",
 "frequency_note": "raw_frequency = count / sample_size is derived at runtime and never stored; the scoring rate is derived separately by the confidence-aware engine (docs/DATA_ENGINE.md).",
 "question_count": 58,
 "questions": [
  {
   "question_id": "an-01",
   "prompt": "NAME AN ANIMAL YOU MIGHT SEE AT THE ZOO.",
   "category": "Animals",
   "sample_size": 2400,
   "answers": [
    {
     "canonical": "lion",
     "aliases": [
      "lions",
      "lioness"
     ],
     "count": 816,
     "validation_status": "VALID"
    },
    {
     "canonical": "elephant",
     "aliases": [
      "elephants",
      "african elephant"
     ],
     "count": 412,
     "validation_status": "VALID"
    },
    {
     "canonical": "giraffe",
     "aliases": [
      "giraffes"
     ],
     "count": 268,
     "validation_status": "VALID"
    },
    {
     "canonical": "tiger",
     "aliases": [
      "tigers",
      "bengal tiger"
     ],
     "count": 199,
     "validation_status": "VALID"
    },
    {
     "canonical": "monkey",
     "aliases": [
      "monkeys",
      "chimp",
      "chimpanzee"
     ],
     "count": 141,
     "validation_status": "VALID"
    },
    {
     "canonical": "zebra",
     "aliases": [
      "zebras"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "penguin",
     "aliases": [
      "penguins"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "kangaroo",
     "aliases": [
      "kangaroos",
      "roo"
     ],
     "count": 47,
     "validation_status": "VALID"
    },
    {
     "canonical": "panda",
     "aliases": [
      "pandas",
      "giant panda"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "hippopotamus",
     "aliases": [
      "hippo",
      "hippos",
      "hippopotamuses"
     ],
     "count": 26,
     "validation_status": "VALID"
    },
    {
     "canonical": "meerkat",
     "aliases": [
      "meerkats"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "flamingo",
     "aliases": [
      "flamingos",
      "flamingoes"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "tapir",
     "aliases": [
      "tapirs"
     ],
     "count": 8,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "rhinoceros",
    "orangutan",
    "lemur",
    "sloth",
    "koala"
   ],
   "rejects": [
    "unicorn",
    "idk",
    "tractor"
   ]
  },
  {
   "question_id": "an-02",
   "prompt": "NAME A PET PEOPLE KEEP AT HOME.",
   "category": "Animals",
   "sample_size": 1800,
   "answers": [
    {
     "canonical": "dog",
     "aliases": [
      "dogs",
      "puppy",
      "pup"
     ],
     "count": 684,
     "validation_status": "VALID"
    },
    {
     "canonical": "cat",
     "aliases": [
      "cats",
      "kitten",
      "kitty"
     ],
     "count": 396,
     "validation_status": "VALID"
    },
    {
     "canonical": "fish",
     "aliases": [
      "goldfish",
      "fishes",
      "tropical fish"
     ],
     "count": 141,
     "validation_status": "VALID"
    },
    {
     "canonical": "bird",
     "aliases": [
      "birds",
      "budgie",
      "parrot",
      "cockatiel"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "rabbit",
     "aliases": [
      "rabbits",
      "bunny"
     ],
     "count": 74,
     "validation_status": "VALID"
    },
    {
     "canonical": "hamster",
     "aliases": [
      "hamsters"
     ],
     "count": 58,
     "validation_status": "VALID"
    },
    {
     "canonical": "guinea pig",
     "aliases": [
      "guinea pigs",
      "guineapig",
      "cavy"
     ],
     "count": 41,
     "validation_status": "VALID"
    },
    {
     "canonical": "snake",
     "aliases": [
      "snakes",
      "pet snake"
     ],
     "count": 29,
     "validation_status": "VALID"
    },
    {
     "canonical": "lizard",
     "aliases": [
      "lizards",
      "gecko",
      "bearded dragon"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "turtle",
     "aliases": [
      "turtles",
      "tortoise"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "ferret",
     "aliases": [
      "ferrets"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "rat",
     "aliases": [
      "rats",
      "pet rat"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "axolotl",
     "aliases": [
      "axolotls"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "chicken",
    "mouse",
    "frog",
    "stick insect",
    "alpaca"
   ],
   "rejects": [
    "nothing",
    "idk",
    "wheelie bin"
   ]
  },
  {
   "question_id": "an-03",
   "prompt": "NAME AN ANIMAL YOU MIGHT SEE IN THE AUSTRALIAN BUSH.",
   "category": "Animals",
   "sample_size": 2100,
   "answers": [
    {
     "canonical": "kangaroo",
     "aliases": [
      "kangaroos",
      "roo",
      "grey kangaroo"
     ],
     "count": 399,
     "validation_status": "VALID"
    },
    {
     "canonical": "koala",
     "aliases": [
      "koalas",
      "koala bear"
     ],
     "count": 336,
     "validation_status": "VALID"
    },
    {
     "canonical": "snake",
     "aliases": [
      "snakes",
      "brown snake",
      "tiger snake"
     ],
     "count": 231,
     "validation_status": "VALID"
    },
    {
     "canonical": "emu",
     "aliases": [
      "emus"
     ],
     "count": 189,
     "validation_status": "VALID"
    },
    {
     "canonical": "wombat",
     "aliases": [
      "wombats"
     ],
     "count": 147,
     "validation_status": "VALID"
    },
    {
     "canonical": "echidna",
     "aliases": [
      "echidnas",
      "spiny anteater"
     ],
     "count": 113,
     "validation_status": "VALID"
    },
    {
     "canonical": "possum",
     "aliases": [
      "possums",
      "brushtail possum",
      "opossum"
     ],
     "count": 88,
     "validation_status": "VALID"
    },
    {
     "canonical": "goanna",
     "aliases": [
      "goannas",
      "monitor lizard"
     ],
     "count": 71,
     "validation_status": "VALID"
    },
    {
     "canonical": "dingo",
     "aliases": [
      "dingoes",
      "dingos"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "kookaburra",
     "aliases": [
      "kookaburras"
     ],
     "count": 34,
     "validation_status": "VALID"
    },
    {
     "canonical": "wallaby",
     "aliases": [
      "wallabies"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "bandicoot",
     "aliases": [
      "bandicoots"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "quoll",
     "aliases": [
      "quolls"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "sugar glider",
     "aliases": [
      "sugar gliders",
      "glider"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "magpie",
    "lyrebird",
    "platypus",
    "feral pig",
    "galah"
   ],
   "rejects": [
    "giraffe",
    "nothing",
    "drop bear"
   ]
  },
  {
   "question_id": "an-04",
   "prompt": "NAME A BIRD.",
   "category": "Animals",
   "sample_size": 3000,
   "answers": [
    {
     "canonical": "magpie",
     "aliases": [
      "magpies",
      "maggie"
     ],
     "count": 651,
     "validation_status": "VALID"
    },
    {
     "canonical": "parrot",
     "aliases": [
      "parrots",
      "budgie",
      "lorikeet"
     ],
     "count": 402,
     "validation_status": "VALID"
    },
    {
     "canonical": "eagle",
     "aliases": [
      "eagles",
      "wedge tailed eagle",
      "bald eagle"
     ],
     "count": 318,
     "validation_status": "VALID"
    },
    {
     "canonical": "sparrow",
     "aliases": [
      "sparrows"
     ],
     "count": 246,
     "validation_status": "VALID"
    },
    {
     "canonical": "crow",
     "aliases": [
      "crows",
      "raven"
     ],
     "count": 198,
     "validation_status": "VALID"
    },
    {
     "canonical": "seagull",
     "aliases": [
      "seagulls",
      "gull",
      "silver gull"
     ],
     "count": 156,
     "validation_status": "VALID"
    },
    {
     "canonical": "owl",
     "aliases": [
      "owls",
      "barn owl"
     ],
     "count": 124,
     "validation_status": "VALID"
    },
    {
     "canonical": "kookaburra",
     "aliases": [
      "kookaburras"
     ],
     "count": 99,
     "validation_status": "VALID"
    },
    {
     "canonical": "pigeon",
     "aliases": [
      "pigeons",
      "dove"
     ],
     "count": 78,
     "validation_status": "VALID"
    },
    {
     "canonical": "duck",
     "aliases": [
      "ducks",
      "mallard"
     ],
     "count": 61,
     "validation_status": "VALID"
    },
    {
     "canonical": "cockatoo",
     "aliases": [
      "cockatoos",
      "cocky",
      "sulphur crested cockatoo"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "ibis",
     "aliases": [
      "ibises",
      "bin chicken"
     ],
     "count": 26,
     "validation_status": "VALID"
    },
    {
     "canonical": "wren",
     "aliases": [
      "wrens",
      "fairy wren"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "kingfisher",
     "aliases": [
      "kingfishers"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "pelican",
    "swan",
    "emu",
    "galah",
    "robin"
   ],
   "rejects": [
    "bat",
    "nothing",
    "aeroplane"
   ]
  },
  {
   "question_id": "an-05",
   "prompt": "NAME AN ANIMAL THAT LIVES IN THE OCEAN.",
   "category": "Animals",
   "sample_size": 1500,
   "answers": [
    {
     "canonical": "shark",
     "aliases": [
      "sharks",
      "great white",
      "great white shark"
     ],
     "count": 510,
     "validation_status": "VALID"
    },
    {
     "canonical": "dolphin",
     "aliases": [
      "dolphins"
     ],
     "count": 240,
     "validation_status": "VALID"
    },
    {
     "canonical": "whale",
     "aliases": [
      "whales",
      "humpback",
      "blue whale"
     ],
     "count": 174,
     "validation_status": "VALID"
    },
    {
     "canonical": "fish",
     "aliases": [
      "fishes",
      "clownfish",
      "tuna"
     ],
     "count": 105,
     "validation_status": "VALID"
    },
    {
     "canonical": "octopus",
     "aliases": [
      "octopuses",
      "octopi"
     ],
     "count": 78,
     "validation_status": "VALID"
    },
    {
     "canonical": "jellyfish",
     "aliases": [
      "jellyfishes",
      "jelly fish",
      "box jellyfish"
     ],
     "count": 57,
     "validation_status": "VALID"
    },
    {
     "canonical": "turtle",
     "aliases": [
      "turtles",
      "sea turtle"
     ],
     "count": 43,
     "validation_status": "VALID"
    },
    {
     "canonical": "crab",
     "aliases": [
      "crabs",
      "mud crab"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "seal",
     "aliases": [
      "seals",
      "sea lion"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "starfish",
     "aliases": [
      "starfishes",
      "star fish",
      "sea star"
     ],
     "count": 20,
     "validation_status": "VALID"
    },
    {
     "canonical": "squid",
     "aliases": [
      "squids",
      "calamari"
     ],
     "count": 13,
     "validation_status": "VALID"
    },
    {
     "canonical": "seahorse",
     "aliases": [
      "seahorses",
      "sea horse"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "eel",
     "aliases": [
      "eels",
      "moray eel"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "stingray",
    "lobster",
    "manta ray",
    "orca",
    "prawn"
   ],
   "rejects": [
    "cow",
    "idk",
    "submarine"
   ]
  },
  {
   "question_id": "an-06",
   "prompt": "NAME AN ANIMAL YOU MIGHT FIND ON A FARM.",
   "category": "Animals",
   "sample_size": 2700,
   "answers": [
    {
     "canonical": "cow",
     "aliases": [
      "cows",
      "cattle",
      "calf",
      "bull"
     ],
     "count": 513,
     "validation_status": "VALID"
    },
    {
     "canonical": "sheep",
     "aliases": [
      "sheeps",
      "lamb",
      "ewe",
      "ram"
     ],
     "count": 432,
     "validation_status": "VALID"
    },
    {
     "canonical": "chicken",
     "aliases": [
      "chickens",
      "chook",
      "chooks",
      "hen"
     ],
     "count": 351,
     "validation_status": "VALID"
    },
    {
     "canonical": "pig",
     "aliases": [
      "pigs",
      "piglet",
      "hog"
     ],
     "count": 297,
     "validation_status": "VALID"
    },
    {
     "canonical": "horse",
     "aliases": [
      "horses",
      "pony"
     ],
     "count": 225,
     "validation_status": "VALID"
    },
    {
     "canonical": "goat",
     "aliases": [
      "goats",
      "billy goat"
     ],
     "count": 162,
     "validation_status": "VALID"
    },
    {
     "canonical": "dog",
     "aliases": [
      "dogs",
      "kelpie",
      "sheepdog",
      "farm dog"
     ],
     "count": 108,
     "validation_status": "VALID"
    },
    {
     "canonical": "duck",
     "aliases": [
      "ducks"
     ],
     "count": 81,
     "validation_status": "VALID"
    },
    {
     "canonical": "cat",
     "aliases": [
      "cats",
      "barn cat"
     ],
     "count": 60,
     "validation_status": "VALID"
    },
    {
     "canonical": "rooster",
     "aliases": [
      "roosters",
      "cockerel"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "donkey",
     "aliases": [
      "donkeys"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "alpaca",
     "aliases": [
      "alpacas",
      "llama"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "turkey",
     "aliases": [
      "turkeys"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "guinea fowl",
     "aliases": [
      "guinea fowls",
      "guineafowl"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "goose",
    "bee",
    "mouse",
    "peacock",
    "ostrich"
   ],
   "rejects": [
    "tractor",
    "nothing",
    "shark"
   ]
  },
  {
   "question_id": "bm-01",
   "prompt": "NAME A PART OF THE BODY.",
   "category": "Body & Mind",
   "sample_size": 2800,
   "answers": [
    {
     "canonical": "head",
     "aliases": [
      "heads",
      "noggin"
     ],
     "count": 460,
     "validation_status": "VALID"
    },
    {
     "canonical": "arm",
     "aliases": [
      "arms",
      "forearm"
     ],
     "count": 420,
     "validation_status": "VALID"
    },
    {
     "canonical": "leg",
     "aliases": [
      "legs",
      "thigh"
     ],
     "count": 392,
     "validation_status": "VALID"
    },
    {
     "canonical": "hand",
     "aliases": [
      "hands",
      "palm"
     ],
     "count": 308,
     "validation_status": "VALID"
    },
    {
     "canonical": "foot",
     "aliases": [
      "feet",
      "sole"
     ],
     "count": 252,
     "validation_status": "VALID"
    },
    {
     "canonical": "nose",
     "aliases": [
      "noses",
      "nostril"
     ],
     "count": 196,
     "validation_status": "VALID"
    },
    {
     "canonical": "eye",
     "aliases": [
      "eyes",
      "eyeball"
     ],
     "count": 140,
     "validation_status": "VALID"
    },
    {
     "canonical": "ear",
     "aliases": [
      "ears",
      "earlobe"
     ],
     "count": 112,
     "validation_status": "VALID"
    },
    {
     "canonical": "knee",
     "aliases": [
      "knees",
      "kneecap"
     ],
     "count": 84,
     "validation_status": "VALID"
    },
    {
     "canonical": "finger",
     "aliases": [
      "fingers",
      "thumb",
      "index finger"
     ],
     "count": 56,
     "validation_status": "VALID"
    },
    {
     "canonical": "shoulder",
     "aliases": [
      "shoulders"
     ],
     "count": 39,
     "validation_status": "VALID"
    },
    {
     "canonical": "elbow",
     "aliases": [
      "elbows"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "ankle",
     "aliases": [
      "ankles"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "spleen",
     "aliases": [
      "spleens"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "wrist",
    "neck",
    "hip",
    "liver",
    "chin"
   ],
   "rejects": [
    "steering wheel",
    "table",
    "nothing"
   ]
  },
  {
   "question_id": "bm-02",
   "prompt": "NAME SOMETHING PEOPLE DO TO CALM THEMSELVES DOWN.",
   "category": "Body & Mind",
   "sample_size": 1900,
   "answers": [
    {
     "canonical": "deep breathing",
     "aliases": [
      "breathe deeply",
      "take a deep breath",
      "breathing exercises",
      "deep breaths"
     ],
     "count": 532,
     "validation_status": "VALID"
    },
    {
     "canonical": "go for a walk",
     "aliases": [
      "walk",
      "going for a walk",
      "take a walk"
     ],
     "count": 342,
     "validation_status": "VALID"
    },
    {
     "canonical": "listen to music",
     "aliases": [
      "music",
      "put on music",
      "listening to music"
     ],
     "count": 228,
     "validation_status": "VALID"
    },
    {
     "canonical": "cup of tea",
     "aliases": [
      "have a cuppa",
      "cuppa",
      "make a cup of tea",
      "tea"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "meditate",
     "aliases": [
      "meditation",
      "mindfulness"
     ],
     "count": 114,
     "validation_status": "VALID"
    },
    {
     "canonical": "count to ten",
     "aliases": [
      "counting to ten",
      "count to 10"
     ],
     "count": 95,
     "validation_status": "VALID"
    },
    {
     "canonical": "have a shower",
     "aliases": [
      "shower",
      "take a shower",
      "hot shower"
     ],
     "count": 76,
     "validation_status": "VALID"
    },
    {
     "canonical": "exercise",
     "aliases": [
      "work out",
      "workout",
      "go to the gym",
      "gym"
     ],
     "count": 57,
     "validation_status": "VALID"
    },
    {
     "canonical": "talk to someone",
     "aliases": [
      "talk to a friend",
      "vent",
      "call a mate"
     ],
     "count": 38,
     "validation_status": "VALID"
    },
    {
     "canonical": "read a book",
     "aliases": [
      "reading",
      "read"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "write it down",
     "aliases": [
      "journal",
      "journalling",
      "write in a diary"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "stretch",
     "aliases": [
      "stretching",
      "stretches"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "pat the dog",
     "aliases": [
      "pat the cat",
      "pet the dog",
      "cuddle the dog"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "go for a drive",
    "do the dishes",
    "play video games",
    "gardening",
    "sit in the sun"
   ],
   "rejects": [
    "panic",
    "nothing",
    "idk"
   ]
  },
  {
   "question_id": "bm-03",
   "prompt": "NAME SOMETHING PEOPLE DO FIRST THING IN THE MORNING.",
   "category": "Body & Mind",
   "sample_size": 3600,
   "answers": [
    {
     "canonical": "check phone",
     "aliases": [
      "look at my phone",
      "check the phone",
      "scroll my phone",
      "check messages"
     ],
     "count": 1224,
     "validation_status": "VALID"
    },
    {
     "canonical": "have a coffee",
     "aliases": [
      "coffee",
      "make coffee",
      "cup of coffee"
     ],
     "count": 540,
     "validation_status": "VALID"
    },
    {
     "canonical": "brush teeth",
     "aliases": [
      "brush my teeth",
      "clean teeth",
      "brush your teeth"
     ],
     "count": 396,
     "validation_status": "VALID"
    },
    {
     "canonical": "have a shower",
     "aliases": [
      "shower",
      "take a shower"
     ],
     "count": 288,
     "validation_status": "VALID"
    },
    {
     "canonical": "eat breakfast",
     "aliases": [
      "breakfast",
      "have breakfast",
      "make breakfast"
     ],
     "count": 216,
     "validation_status": "VALID"
    },
    {
     "canonical": "go to the toilet",
     "aliases": [
      "toilet",
      "use the toilet",
      "go to the loo",
      "bathroom"
     ],
     "count": 144,
     "validation_status": "VALID"
    },
    {
     "canonical": "stretch",
     "aliases": [
      "stretching",
      "have a stretch"
     ],
     "count": 108,
     "validation_status": "VALID"
    },
    {
     "canonical": "make the bed",
     "aliases": [
      "making the bed",
      "bed making"
     ],
     "count": 72,
     "validation_status": "VALID"
    },
    {
     "canonical": "feed the pets",
     "aliases": [
      "feed the dog",
      "feed the cat",
      "feed the animals"
     ],
     "count": 50,
     "validation_status": "VALID"
    },
    {
     "canonical": "open the curtains",
     "aliases": [
      "open the blinds",
      "open curtains"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "put the kettle on",
     "aliases": [
      "boil the kettle",
      "kettle"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "go for a run",
     "aliases": [
      "run",
      "morning run",
      "jog"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "check the weather",
     "aliases": [
      "look at the weather",
      "weather forecast"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "walk the dog",
    "get dressed",
    "wash your face",
    "check emails",
    "listen to the radio"
   ],
   "rejects": [
    "eat dinner",
    "nothing",
    "idk"
   ]
  },
  {
   "question_id": "bm-04",
   "prompt": "NAME A WAY PEOPLE KEEP FIT.",
   "category": "Body & Mind",
   "sample_size": 1650,
   "answers": [
    {
     "canonical": "go to the gym",
     "aliases": [
      "gym",
      "gym sessions",
      "join a gym",
      "gym workout"
     ],
     "count": 330,
     "validation_status": "VALID"
    },
    {
     "canonical": "walking",
     "aliases": [
      "walk",
      "go for a walk",
      "walks",
      "power walking"
     ],
     "count": 264,
     "validation_status": "VALID"
    },
    {
     "canonical": "running",
     "aliases": [
      "run",
      "jogging",
      "go for a run",
      "jog"
     ],
     "count": 198,
     "validation_status": "VALID"
    },
    {
     "canonical": "swimming",
     "aliases": [
      "swim",
      "laps",
      "go for a swim"
     ],
     "count": 149,
     "validation_status": "VALID"
    },
    {
     "canonical": "cycling",
     "aliases": [
      "bike riding",
      "ride a bike",
      "biking",
      "cycle"
     ],
     "count": 116,
     "validation_status": "VALID"
    },
    {
     "canonical": "yoga",
     "aliases": [
      "hot yoga",
      "yoga class"
     ],
     "count": 83,
     "validation_status": "VALID"
    },
    {
     "canonical": "lift weights",
     "aliases": [
      "weight training",
      "weights",
      "lifting",
      "strength training"
     ],
     "count": 66,
     "validation_status": "VALID"
    },
    {
     "canonical": "team sport",
     "aliases": [
      "play sport",
      "football",
      "netball",
      "soccer"
     ],
     "count": 50,
     "validation_status": "VALID"
    },
    {
     "canonical": "pilates",
     "aliases": [
      "reformer pilates",
      "pilates class"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "dancing",
     "aliases": [
      "dance",
      "dance class",
      "zumba"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "hiking",
     "aliases": [
      "bushwalking",
      "hike",
      "bushwalk"
     ],
     "count": 16,
     "validation_status": "VALID"
    },
    {
     "canonical": "boxing",
     "aliases": [
      "boxercise",
      "kickboxing"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "rock climbing",
     "aliases": [
      "climbing",
      "bouldering"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "rowing",
    "surfing",
    "martial arts",
    "skipping",
    "tennis"
   ],
   "rejects": [
    "watch tv",
    "eat chips",
    "nothing"
   ]
  },
  {
   "question_id": "bm-05",
   "prompt": "NAME SOMETHING PEOPLE DO TO RELAX.",
   "category": "Body & Mind",
   "sample_size": 2600,
   "answers": [
    {
     "canonical": "watch tv",
     "aliases": [
      "tv",
      "television",
      "watch telly",
      "netflix"
     ],
     "count": 468,
     "validation_status": "VALID"
    },
    {
     "canonical": "read",
     "aliases": [
      "reading",
      "read a book"
     ],
     "count": 381,
     "validation_status": "VALID"
    },
    {
     "canonical": "have a bath",
     "aliases": [
      "bath",
      "bubble bath",
      "soak in the bath"
     ],
     "count": 264,
     "validation_status": "VALID"
    },
    {
     "canonical": "listen to music",
     "aliases": [
      "music",
      "put on music",
      "listening to music"
     ],
     "count": 208,
     "validation_status": "VALID"
    },
    {
     "canonical": "go for a walk",
     "aliases": [
      "walk",
      "walking",
      "go for a stroll"
     ],
     "count": 162,
     "validation_status": "VALID"
    },
    {
     "canonical": "play video games",
     "aliases": [
      "video games",
      "gaming",
      "play games",
      "xbox"
     ],
     "count": 121,
     "validation_status": "VALID"
    },
    {
     "canonical": "meditate",
     "aliases": [
      "meditation",
      "meditating",
      "mindfulness"
     ],
     "count": 94,
     "validation_status": "VALID"
    },
    {
     "canonical": "nap",
     "aliases": [
      "have a nap",
      "sleep",
      "lie down"
     ],
     "count": 71,
     "validation_status": "VALID"
    },
    {
     "canonical": "yoga",
     "aliases": [
      "do yoga",
      "stretching"
     ],
     "count": 52,
     "validation_status": "VALID"
    },
    {
     "canonical": "drink tea",
     "aliases": [
      "cup of tea",
      "cuppa",
      "have a tea"
     ],
     "count": 36,
     "validation_status": "VALID"
    },
    {
     "canonical": "garden",
     "aliases": [
      "gardening",
      "potter in the garden"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "do a puzzle",
     "aliases": [
      "puzzle",
      "jigsaw",
      "crossword"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "knit",
     "aliases": [
      "knitting",
      "crochet"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "colour in",
     "aliases": [
      "colouring",
      "coloring",
      "colouring book"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "go surfing",
    "have a massage",
    "journal",
    "sit in the sun",
    "pat the dog"
   ],
   "rejects": [
    "idk",
    "do my taxes",
    "night shift"
   ]
  },
  {
   "question_id": "bm-06",
   "prompt": "NAME AN EMOTION.",
   "category": "Body & Mind",
   "sample_size": 1900,
   "answers": [
    {
     "canonical": "happy",
     "aliases": [
      "happiness",
      "joy",
      "joyful"
     ],
     "count": 640,
     "validation_status": "VALID"
    },
    {
     "canonical": "sad",
     "aliases": [
      "sadness",
      "unhappy",
      "upset"
     ],
     "count": 402,
     "validation_status": "VALID"
    },
    {
     "canonical": "angry",
     "aliases": [
      "anger",
      "mad",
      "rage",
      "furious"
     ],
     "count": 231,
     "validation_status": "VALID"
    },
    {
     "canonical": "scared",
     "aliases": [
      "fear",
      "afraid",
      "frightened"
     ],
     "count": 128,
     "validation_status": "VALID"
    },
    {
     "canonical": "excited",
     "aliases": [
      "excitement",
      "hyped"
     ],
     "count": 84,
     "validation_status": "VALID"
    },
    {
     "canonical": "love",
     "aliases": [
      "in love",
      "loving"
     ],
     "count": 61,
     "validation_status": "VALID"
    },
    {
     "canonical": "jealous",
     "aliases": [
      "jealousy",
      "envy",
      "envious"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "surprised",
     "aliases": [
      "surprise",
      "shocked"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "nervous",
     "aliases": [
      "nerves",
      "nervousness",
      "anxious"
     ],
     "count": 23,
     "validation_status": "VALID"
    },
    {
     "canonical": "bored",
     "aliases": [
      "boredom",
      "boring"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "proud",
     "aliases": [
      "pride",
      "prideful"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "lonely",
     "aliases": [
      "loneliness",
      "lonesome"
     ],
     "count": 8,
     "validation_status": "VALID"
    },
    {
     "canonical": "guilty",
     "aliases": [
      "guilt",
      "remorse"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "disgusted",
    "grateful",
    "hopeful",
    "embarrassed",
    "relieved"
   ],
   "rejects": [
    "idk",
    "hungry",
    "tired"
   ]
  },
  {
   "question_id": "bm-07",
   "prompt": "NAME SOMETHING PEOPLE DO IN THE MORNING TO WAKE UP.",
   "category": "Body & Mind",
   "sample_size": 1600,
   "answers": [
    {
     "canonical": "drink coffee",
     "aliases": [
      "coffee",
      "have a coffee",
      "make coffee",
      "espresso"
     ],
     "count": 560,
     "validation_status": "VALID"
    },
    {
     "canonical": "have a shower",
     "aliases": [
      "shower",
      "take a shower",
      "cold shower"
     ],
     "count": 281,
     "validation_status": "VALID"
    },
    {
     "canonical": "eat breakfast",
     "aliases": [
      "breakfast",
      "have breakfast",
      "brekkie"
     ],
     "count": 148,
     "validation_status": "VALID"
    },
    {
     "canonical": "check your phone",
     "aliases": [
      "phone",
      "check phone",
      "scroll my phone"
     ],
     "count": 106,
     "validation_status": "VALID"
    },
    {
     "canonical": "stretch",
     "aliases": [
      "stretching",
      "have a stretch"
     ],
     "count": 71,
     "validation_status": "VALID"
    },
    {
     "canonical": "brush your teeth",
     "aliases": [
      "brush teeth",
      "brush my teeth",
      "teeth"
     ],
     "count": 52,
     "validation_status": "VALID"
    },
    {
     "canonical": "open the curtains",
     "aliases": [
      "open curtains",
      "open the blinds",
      "let the light in"
     ],
     "count": 36,
     "validation_status": "VALID"
    },
    {
     "canonical": "drink water",
     "aliases": [
      "water",
      "glass of water",
      "have a drink of water"
     ],
     "count": 26,
     "validation_status": "VALID"
    },
    {
     "canonical": "wash your face",
     "aliases": [
      "wash face",
      "splash water on my face",
      "cold water on face"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "go for a run",
     "aliases": [
      "run",
      "jog",
      "go for a jog",
      "exercise"
     ],
     "count": 13,
     "validation_status": "VALID"
    },
    {
     "canonical": "hit snooze",
     "aliases": [
      "snooze",
      "snooze button",
      "press snooze"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "put the kettle on",
     "aliases": [
      "kettle",
      "boil the kettle"
     ],
     "count": 7,
     "validation_status": "VALID"
    },
    {
     "canonical": "turn on the radio",
     "aliases": [
      "radio",
      "put the radio on",
      "listen to the news"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "make the bed",
    "walk the dog",
    "have a smoothie",
    "listen to a podcast",
    "do pushups"
   ],
   "rejects": [
    "idk",
    "go back to sleep",
    "mow the lawn"
   ]
  },
  {
   "question_id": "bm-08",
   "prompt": "NAME A PART OF THE FACE.",
   "category": "Body & Mind",
   "sample_size": 3250,
   "answers": [
    {
     "canonical": "nose",
     "aliases": [
      "noses",
      "nostrils",
      "hooter"
     ],
     "count": 1150,
     "validation_status": "VALID"
    },
    {
     "canonical": "eyes",
     "aliases": [
      "eye",
      "eyeball",
      "eyeballs"
     ],
     "count": 742,
     "validation_status": "VALID"
    },
    {
     "canonical": "mouth",
     "aliases": [
      "mouths",
      "gob"
     ],
     "count": 361,
     "validation_status": "VALID"
    },
    {
     "canonical": "ears",
     "aliases": [
      "ear",
      "earlobe"
     ],
     "count": 214,
     "validation_status": "VALID"
    },
    {
     "canonical": "lips",
     "aliases": [
      "lip",
      "top lip"
     ],
     "count": 128,
     "validation_status": "VALID"
    },
    {
     "canonical": "chin",
     "aliases": [
      "chins",
      "double chin"
     ],
     "count": 86,
     "validation_status": "VALID"
    },
    {
     "canonical": "cheeks",
     "aliases": [
      "cheek",
      "cheekbones"
     ],
     "count": 61,
     "validation_status": "VALID"
    },
    {
     "canonical": "forehead",
     "aliases": [
      "fore head",
      "brow"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "eyebrows",
     "aliases": [
      "eyebrow",
      "brows"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "teeth",
     "aliases": [
      "tooth",
      "front teeth"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "eyelashes",
     "aliases": [
      "eyelash",
      "lashes"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "jaw",
     "aliases": [
      "jawline",
      "jaws"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "dimples",
     "aliases": [
      "dimple"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "eyelids",
    "temples",
    "gums",
    "philtrum"
   ],
   "rejects": [
    "elbow",
    "shoulder",
    "idk"
   ]
  },
  {
   "question_id": "bm-09",
   "prompt": "NAME SOMETHING PEOPLE DO TO STAY FIT.",
   "category": "Body & Mind",
   "sample_size": 2050,
   "answers": [
    {
     "canonical": "walk",
     "aliases": [
      "walking",
      "go for a walk",
      "power walk"
     ],
     "count": 389,
     "validation_status": "VALID"
    },
    {
     "canonical": "run",
     "aliases": [
      "running",
      "jog",
      "jogging",
      "go for a run"
     ],
     "count": 341,
     "validation_status": "VALID"
    },
    {
     "canonical": "go to the gym",
     "aliases": [
      "gym",
      "hit the gym",
      "gym session"
     ],
     "count": 268,
     "validation_status": "VALID"
    },
    {
     "canonical": "swim",
     "aliases": [
      "swimming",
      "laps",
      "go for a swim"
     ],
     "count": 181,
     "validation_status": "VALID"
    },
    {
     "canonical": "ride a bike",
     "aliases": [
      "cycling",
      "bike ride",
      "bike riding",
      "ride my bike"
     ],
     "count": 137,
     "validation_status": "VALID"
    },
    {
     "canonical": "lift weights",
     "aliases": [
      "weights",
      "weight training",
      "strength training"
     ],
     "count": 98,
     "validation_status": "VALID"
    },
    {
     "canonical": "yoga",
     "aliases": [
      "do yoga",
      "yoga class"
     ],
     "count": 72,
     "validation_status": "VALID"
    },
    {
     "canonical": "play sport",
     "aliases": [
      "sport",
      "team sport",
      "play footy"
     ],
     "count": 53,
     "validation_status": "VALID"
    },
    {
     "canonical": "hike",
     "aliases": [
      "hiking",
      "bushwalking",
      "bush walk"
     ],
     "count": 38,
     "validation_status": "VALID"
    },
    {
     "canonical": "pilates",
     "aliases": [
      "reformer pilates",
      "palates"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "skipping",
     "aliases": [
      "skip rope",
      "jump rope",
      "skipping rope"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "dance class",
     "aliases": [
      "dance",
      "dancing",
      "zumba"
     ],
     "count": 13,
     "validation_status": "VALID"
    },
    {
     "canonical": "rock climbing",
     "aliases": [
      "climbing",
      "bouldering"
     ],
     "count": 8,
     "validation_status": "VALID"
    },
    {
     "canonical": "rowing",
     "aliases": [
      "row",
      "rowing machine",
      "erg"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "boxing",
    "surf",
    "play netball",
    "walk the dog",
    "crossfit"
   ],
   "rejects": [
    "idk",
    "eat chips",
    "watch the footy"
   ]
  },
  {
   "question_id": "cu-01",
   "prompt": "NAME A BOARD GAME.",
   "category": "Culture & Play",
   "sample_size": 2400,
   "answers": [
    {
     "canonical": "monopoly",
     "aliases": [
      "monoply",
      "monopolly"
     ],
     "count": 812,
     "validation_status": "VALID"
    },
    {
     "canonical": "scrabble",
     "aliases": [
      "scrable",
      "scrabbles"
     ],
     "count": 388,
     "validation_status": "VALID"
    },
    {
     "canonical": "chess",
     "aliases": [
      "chess set",
      "chess board"
     ],
     "count": 262,
     "validation_status": "VALID"
    },
    {
     "canonical": "cluedo",
     "aliases": [
      "clue",
      "cluedo game"
     ],
     "count": 171,
     "validation_status": "VALID"
    },
    {
     "canonical": "checkers",
     "aliases": [
      "draughts",
      "chequers"
     ],
     "count": 118,
     "validation_status": "VALID"
    },
    {
     "canonical": "risk",
     "aliases": [
      "risk board game"
     ],
     "count": 84,
     "validation_status": "VALID"
    },
    {
     "canonical": "snakes and ladders",
     "aliases": [
      "chutes and ladders",
      "snakes n ladders"
     ],
     "count": 61,
     "validation_status": "VALID"
    },
    {
     "canonical": "trivial pursuit",
     "aliases": [
      "trivial persuit",
      "trivia pursuit"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "connect four",
     "aliases": [
      "connect 4",
      "connect-four"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "battleship",
     "aliases": [
      "battleships",
      "battle ship"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "catan",
     "aliases": [
      "settlers of catan",
      "settlers"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "backgammon",
     "aliases": [
      "back gammon"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "ludo",
     "aliases": [
      "ludo game"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "pictionary",
    "guess who",
    "othello",
    "carcassonne"
   ],
   "rejects": [
    "idk",
    "xbox",
    "netball"
   ]
  },
  {
   "question_id": "cu-02",
   "prompt": "NAME A MUSICAL INSTRUMENT.",
   "category": "Culture & Play",
   "sample_size": 3100,
   "answers": [
    {
     "canonical": "guitar",
     "aliases": [
      "guitars",
      "electric guitar",
      "acoustic guitar"
     ],
     "count": 930,
     "validation_status": "VALID"
    },
    {
     "canonical": "piano",
     "aliases": [
      "pianos",
      "keyboard",
      "grand piano"
     ],
     "count": 611,
     "validation_status": "VALID"
    },
    {
     "canonical": "drums",
     "aliases": [
      "drum",
      "drum kit",
      "drumkit"
     ],
     "count": 341,
     "validation_status": "VALID"
    },
    {
     "canonical": "violin",
     "aliases": [
      "violins",
      "fiddle"
     ],
     "count": 243,
     "validation_status": "VALID"
    },
    {
     "canonical": "flute",
     "aliases": [
      "flutes"
     ],
     "count": 148,
     "validation_status": "VALID"
    },
    {
     "canonical": "saxophone",
     "aliases": [
      "sax",
      "saxaphone"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "trumpet",
     "aliases": [
      "trumpets"
     ],
     "count": 79,
     "validation_status": "VALID"
    },
    {
     "canonical": "clarinet",
     "aliases": [
      "clarinets"
     ],
     "count": 52,
     "validation_status": "VALID"
    },
    {
     "canonical": "cello",
     "aliases": [
      "cellos",
      "chello"
     ],
     "count": 38,
     "validation_status": "VALID"
    },
    {
     "canonical": "ukulele",
     "aliases": [
      "uke",
      "ukelele"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "harp",
     "aliases": [
      "harps"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "didgeridoo",
     "aliases": [
      "didge",
      "didjeridu",
      "didgeridu"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "accordion",
     "aliases": [
      "accordian",
      "squeezebox"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "banjo",
    "trombone",
    "double bass",
    "bagpipes",
    "tambourine"
   ],
   "rejects": [
    "microphone",
    "spotify",
    "idk"
   ]
  },
  {
   "question_id": "cu-03",
   "prompt": "NAME SOMETHING PEOPLE DO AT A PARTY.",
   "category": "Culture & Play",
   "sample_size": 1800,
   "answers": [
    {
     "canonical": "dance",
     "aliases": [
      "dancing",
      "have a dance"
     ],
     "count": 342,
     "validation_status": "VALID"
    },
    {
     "canonical": "drink",
     "aliases": [
      "drinks",
      "drinking",
      "have a drink"
     ],
     "count": 288,
     "validation_status": "VALID"
    },
    {
     "canonical": "eat",
     "aliases": [
      "eating",
      "eat food",
      "snacks"
     ],
     "count": 231,
     "validation_status": "VALID"
    },
    {
     "canonical": "talk",
     "aliases": [
      "chat",
      "chatting",
      "talking",
      "catch up"
     ],
     "count": 176,
     "validation_status": "VALID"
    },
    {
     "canonical": "sing karaoke",
     "aliases": [
      "karaoke",
      "sing",
      "singing"
     ],
     "count": 121,
     "validation_status": "VALID"
    },
    {
     "canonical": "play games",
     "aliases": [
      "party games",
      "board games"
     ],
     "count": 88,
     "validation_status": "VALID"
    },
    {
     "canonical": "take photos",
     "aliases": [
      "photos",
      "selfies",
      "take pictures"
     ],
     "count": 63,
     "validation_status": "VALID"
    },
    {
     "canonical": "play music",
     "aliases": [
      "music",
      "put on music",
      "dj"
     ],
     "count": 47,
     "validation_status": "VALID"
    },
    {
     "canonical": "cut cake",
     "aliases": [
      "cut the cake",
      "cake cutting"
     ],
     "count": 34,
     "validation_status": "VALID"
    },
    {
     "canonical": "flirt",
     "aliases": [
      "flirting",
      "chat someone up"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "mingle",
     "aliases": [
      "mingling",
      "meet new people"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "do shots",
     "aliases": [
      "shots",
      "shot"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "arrive late",
     "aliases": [
      "turn up late",
      "show up late"
     ],
     "count": 7,
     "validation_status": "VALID"
    },
    {
     "canonical": "do the limbo",
     "aliases": [
      "limbo"
     ],
     "count": 4,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "play pass the parcel",
    "make a speech",
    "swim in the pool",
    "hand out party bags"
   ],
   "rejects": [
    "idk",
    "mow the lawn",
    "file taxes"
   ]
  },
  {
   "question_id": "cu-04",
   "prompt": "NAME A SPORT PLAYED WITH A BALL.",
   "category": "Culture & Play",
   "sample_size": 2750,
   "answers": [
    {
     "canonical": "soccer",
     "aliases": [
      "football",
      "association football"
     ],
     "count": 950,
     "validation_status": "VALID"
    },
    {
     "canonical": "basketball",
     "aliases": [
      "basket ball",
      "bball",
      "hoops"
     ],
     "count": 402,
     "validation_status": "VALID"
    },
    {
     "canonical": "cricket",
     "aliases": [
      "backyard cricket",
      "test cricket"
     ],
     "count": 331,
     "validation_status": "VALID"
    },
    {
     "canonical": "tennis",
     "aliases": [
      "lawn tennis"
     ],
     "count": 244,
     "validation_status": "VALID"
    },
    {
     "canonical": "rugby",
     "aliases": [
      "rugby league",
      "rugby union",
      "nrl"
     ],
     "count": 158,
     "validation_status": "VALID"
    },
    {
     "canonical": "afl",
     "aliases": [
      "aussie rules",
      "australian rules football",
      "aussie rules football"
     ],
     "count": 104,
     "validation_status": "VALID"
    },
    {
     "canonical": "netball",
     "aliases": [
      "net ball"
     ],
     "count": 78,
     "validation_status": "VALID"
    },
    {
     "canonical": "golf",
     "aliases": [
      "golfing"
     ],
     "count": 53,
     "validation_status": "VALID"
    },
    {
     "canonical": "volleyball",
     "aliases": [
      "volley ball",
      "beach volleyball"
     ],
     "count": 41,
     "validation_status": "VALID"
    },
    {
     "canonical": "baseball",
     "aliases": [
      "base ball",
      "softball"
     ],
     "count": 30,
     "validation_status": "VALID"
    },
    {
     "canonical": "bowling",
     "aliases": [
      "ten pin bowling",
      "tenpin bowling"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "handball",
     "aliases": [
      "hand ball"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "water polo",
     "aliases": [
      "waterpolo"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "lawn bowls",
     "aliases": [
      "bowls",
      "barefoot bowls"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "squash",
    "hockey",
    "table tennis",
    "polo",
    "dodgeball"
   ],
   "rejects": [
    "swimming",
    "chess",
    "idk"
   ]
  },
  {
   "question_id": "cu-05",
   "prompt": "NAME A THING PEOPLE COLLECT.",
   "category": "Culture & Play",
   "sample_size": 1450,
   "answers": [
    {
     "canonical": "stamps",
     "aliases": [
      "stamp",
      "postage stamps"
     ],
     "count": 272,
     "validation_status": "VALID"
    },
    {
     "canonical": "coins",
     "aliases": [
      "coin",
      "old coins",
      "loose change"
     ],
     "count": 241,
     "validation_status": "VALID"
    },
    {
     "canonical": "trading cards",
     "aliases": [
      "cards",
      "pokemon cards",
      "footy cards",
      "trading card"
     ],
     "count": 154,
     "validation_status": "VALID"
    },
    {
     "canonical": "books",
     "aliases": [
      "book",
      "first editions"
     ],
     "count": 97,
     "validation_status": "VALID"
    },
    {
     "canonical": "records",
     "aliases": [
      "vinyl",
      "vinyl records",
      "lps"
     ],
     "count": 71,
     "validation_status": "VALID"
    },
    {
     "canonical": "shells",
     "aliases": [
      "shell",
      "seashells",
      "sea shells"
     ],
     "count": 54,
     "validation_status": "VALID"
    },
    {
     "canonical": "rocks",
     "aliases": [
      "rock",
      "crystals",
      "gemstones"
     ],
     "count": 38,
     "validation_status": "VALID"
    },
    {
     "canonical": "fridge magnets",
     "aliases": [
      "magnets",
      "fridge magnet"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "postcards",
     "aliases": [
      "post cards",
      "postcard"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "action figures",
     "aliases": [
      "action figure",
      "figurines",
      "toys"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "bottle caps",
     "aliases": [
      "bottle tops",
      "beer caps"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "keyrings",
     "aliases": [
      "key rings",
      "keychains"
     ],
     "count": 7,
     "validation_status": "VALID"
    },
    {
     "canonical": "teaspoons",
     "aliases": [
      "spoons",
      "souvenir spoons"
     ],
     "count": 4,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "shot glasses",
    "badges",
    "comic books",
    "snow globes",
    "sneakers"
   ],
   "rejects": [
    "idk",
    "nothing",
    "dust"
   ]
  },
  {
   "question_id": "cu-06",
   "prompt": "NAME SOMETHING YOU SEE AT THE FOOTY.",
   "category": "Culture & Play",
   "sample_size": 2200,
   "answers": [
    {
     "canonical": "meat pie",
     "aliases": [
      "pie",
      "meat pies",
      "footy pie"
     ],
     "count": 616,
     "validation_status": "VALID"
    },
    {
     "canonical": "scarf",
     "aliases": [
      "scarves",
      "team scarf"
     ],
     "count": 332,
     "validation_status": "VALID"
    },
    {
     "canonical": "beer",
     "aliases": [
      "beers",
      "schooner",
      "tinnie"
     ],
     "count": 248,
     "validation_status": "VALID"
    },
    {
     "canonical": "umpire",
     "aliases": [
      "ump",
      "umpires",
      "referee",
      "ref"
     ],
     "count": 167,
     "validation_status": "VALID"
    },
    {
     "canonical": "goal posts",
     "aliases": [
      "goalposts",
      "goal post",
      "posts"
     ],
     "count": 121,
     "validation_status": "VALID"
    },
    {
     "canonical": "crowd",
     "aliases": [
      "crowds",
      "fans",
      "spectators"
     ],
     "count": 92,
     "validation_status": "VALID"
    },
    {
     "canonical": "siren",
     "aliases": [
      "sirens",
      "final siren"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "team jersey",
     "aliases": [
      "jersey",
      "guernsey",
      "jumper",
      "team jumper"
     ],
     "count": 47,
     "validation_status": "VALID"
    },
    {
     "canonical": "hot chips",
     "aliases": [
      "chips",
      "hot chip",
      "fries"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "banner",
     "aliases": [
      "banners",
      "run through banner"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "cheer squad",
     "aliases": [
      "cheer squads",
      "cheerleaders"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "mascot",
     "aliases": [
      "mascots",
      "team mascot"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "boundary line",
     "aliases": [
      "boundary",
      "white line"
     ],
     "count": 8,
     "validation_status": "VALID"
    },
    {
     "canonical": "brass band",
     "aliases": [
      "band",
      "marching band"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "scoreboard",
    "esky",
    "hot dog",
    "team song",
    "floodlights"
   ],
   "rejects": [
    "idk",
    "ice rink",
    "shopping trolley"
   ]
  },
  {
   "question_id": "cu-07",
   "prompt": "NAME A TYPE OF MOVIE.",
   "category": "Culture & Play",
   "sample_size": 3400,
   "answers": [
    {
     "canonical": "comedy",
     "aliases": [
      "comedies",
      "funny movie"
     ],
     "count": 1150,
     "validation_status": "VALID"
    },
    {
     "canonical": "horror",
     "aliases": [
      "scary movie",
      "horrors",
      "slasher"
     ],
     "count": 612,
     "validation_status": "VALID"
    },
    {
     "canonical": "action",
     "aliases": [
      "action movie",
      "action flick"
     ],
     "count": 421,
     "validation_status": "VALID"
    },
    {
     "canonical": "romance",
     "aliases": [
      "romantic",
      "romcom",
      "love story",
      "chick flick"
     ],
     "count": 268,
     "validation_status": "VALID"
    },
    {
     "canonical": "drama",
     "aliases": [
      "dramas",
      "drama movie"
     ],
     "count": 181,
     "validation_status": "VALID"
    },
    {
     "canonical": "sci fi",
     "aliases": [
      "science fiction",
      "scifi",
      "sci-fi"
     ],
     "count": 126,
     "validation_status": "VALID"
    },
    {
     "canonical": "thriller",
     "aliases": [
      "thrillers",
      "suspense"
     ],
     "count": 88,
     "validation_status": "VALID"
    },
    {
     "canonical": "documentary",
     "aliases": [
      "doco",
      "docos",
      "documentaries"
     ],
     "count": 61,
     "validation_status": "VALID"
    },
    {
     "canonical": "animation",
     "aliases": [
      "animated",
      "cartoon",
      "anime"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "western",
     "aliases": [
      "westerns",
      "cowboy movie"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "musical",
     "aliases": [
      "musicals",
      "movie musical"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "fantasy",
     "aliases": [
      "fantasy movie",
      "fantasies"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "film noir",
     "aliases": [
      "noir"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "crime",
    "war movie",
    "biopic",
    "superhero movie",
    "mystery"
   ],
   "rejects": [
    "popcorn",
    "netflix",
    "idk"
   ]
  },
  {
   "question_id": "ev-01",
   "prompt": "NAME SOMETHING PEOPLE TAKE TO THE BEACH.",
   "category": "Everyday",
   "sample_size": 2400,
   "answers": [
    {
     "canonical": "towel",
     "aliases": [
      "beach towel",
      "towels"
     ],
     "count": 744,
     "validation_status": "VALID"
    },
    {
     "canonical": "sunscreen",
     "aliases": [
      "sun screen",
      "sunblock",
      "sun cream",
      "spf"
     ],
     "count": 512,
     "validation_status": "VALID"
    },
    {
     "canonical": "esky",
     "aliases": [
      "cooler",
      "ice box",
      "chilly bin",
      "cool box"
     ],
     "count": 168,
     "validation_status": "VALID"
    },
    {
     "canonical": "umbrella",
     "aliases": [
      "beach umbrella",
      "parasol",
      "umbrellas"
     ],
     "count": 121,
     "validation_status": "VALID"
    },
    {
     "canonical": "surfboard",
     "aliases": [
      "surf board",
      "surfboards",
      "boogie board"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "hat",
     "aliases": [
      "cap",
      "sun hat",
      "hats"
     ],
     "count": 84,
     "validation_status": "VALID"
    },
    {
     "canonical": "book",
     "aliases": [
      "novel",
      "books",
      "paperback"
     ],
     "count": 71,
     "validation_status": "VALID"
    },
    {
     "canonical": "swimsuit",
     "aliases": [
      "bathers",
      "togs",
      "swimmers",
      "bikini",
      "boardshorts"
     ],
     "count": 58,
     "validation_status": "VALID"
    },
    {
     "canonical": "beach ball",
     "aliases": [
      "beach balls",
      "inflatable ball"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "thongs",
     "aliases": [
      "thong",
      "flip flops",
      "flip-flops",
      "jandals",
      "sandals"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "frisbee",
     "aliases": [
      "flying disc",
      "frisbees",
      "disc"
     ],
     "count": 26,
     "validation_status": "VALID"
    },
    {
     "canonical": "chair",
     "aliases": [
      "beach chair",
      "folding chair",
      "deck chair"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "cricket set",
     "aliases": [
      "beach cricket",
      "cricket bat",
      "bat and ball"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "watermelon",
     "aliases": [
      "water melon",
      "melon",
      "watermelons"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "goggles",
    "picnic blanket",
    "snorkel",
    "portable speaker"
   ],
   "rejects": [
    "nothing",
    "snow shovel",
    "vacuum cleaner"
   ]
  },
  {
   "question_id": "ev-02",
   "prompt": "NAME SOMETHING YOU KEEP IN YOUR WALLET.",
   "category": "Everyday",
   "sample_size": 1800,
   "answers": [
    {
     "canonical": "cash",
     "aliases": [
      "money",
      "notes",
      "banknote",
      "bills",
      "dollars"
     ],
     "count": 356,
     "validation_status": "VALID"
    },
    {
     "canonical": "driver licence",
     "aliases": [
      "drivers licence",
      "drivers license",
      "license",
      "licence",
      "id card"
     ],
     "count": 318,
     "validation_status": "VALID"
    },
    {
     "canonical": "credit card",
     "aliases": [
      "debit card",
      "bank card",
      "eftpos card",
      "visa",
      "mastercard"
     ],
     "count": 246,
     "validation_status": "VALID"
    },
    {
     "canonical": "medicare card",
     "aliases": [
      "medicare",
      "health care card",
      "health insurance card"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "receipt",
     "aliases": [
      "receipts",
      "docket",
      "dockets"
     ],
     "count": 108,
     "validation_status": "VALID"
    },
    {
     "canonical": "photo",
     "aliases": [
      "photograph",
      "family photo",
      "picture",
      "photos"
     ],
     "count": 76,
     "validation_status": "VALID"
    },
    {
     "canonical": "loyalty card",
     "aliases": [
      "rewards card",
      "points card",
      "coffee card",
      "membership card"
     ],
     "count": 58,
     "validation_status": "VALID"
    },
    {
     "canonical": "coin",
     "aliases": [
      "coins",
      "change",
      "loose change",
      "shrapnel"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "business card",
     "aliases": [
      "business cards",
      "contact card"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "stamp",
     "aliases": [
      "stamps",
      "postage stamp"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "transport card",
     "aliases": [
      "opal card",
      "myki",
      "travel card",
      "bus pass",
      "train ticket"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "concert ticket",
     "aliases": [
      "gig ticket",
      "movie ticket",
      "ticket stub"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "lottery ticket",
     "aliases": [
      "lotto ticket",
      "scratchie",
      "raffle ticket"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "library card",
    "gift card",
    "voucher",
    "spare key"
   ],
   "rejects": [
    "nothing",
    "garden hose",
    "pineapple"
   ]
  },
  {
   "question_id": "ev-03",
   "prompt": "NAME SOMETHING YOU DO FIRST THING IN THE MORNING.",
   "category": "Everyday",
   "sample_size": 3000,
   "answers": [
    {
     "canonical": "check phone",
     "aliases": [
      "look at my phone",
      "check messages",
      "scroll my phone",
      "check notifications"
     ],
     "count": 1000,
     "validation_status": "VALID"
    },
    {
     "canonical": "brush teeth",
     "aliases": [
      "brush my teeth",
      "clean teeth",
      "teeth"
     ],
     "count": 560,
     "validation_status": "VALID"
    },
    {
     "canonical": "shower",
     "aliases": [
      "have a shower",
      "take a shower",
      "wash"
     ],
     "count": 300,
     "validation_status": "VALID"
    },
    {
     "canonical": "make coffee",
     "aliases": [
      "coffee",
      "brew coffee",
      "get a coffee",
      "espresso"
     ],
     "count": 210,
     "validation_status": "VALID"
    },
    {
     "canonical": "use the toilet",
     "aliases": [
      "toilet",
      "go to the loo",
      "use the bathroom"
     ],
     "count": 150,
     "validation_status": "VALID"
    },
    {
     "canonical": "eat breakfast",
     "aliases": [
      "breakfast",
      "have breakfast",
      "brekkie",
      "eat something"
     ],
     "count": 110,
     "validation_status": "VALID"
    },
    {
     "canonical": "stretch",
     "aliases": [
      "stretching",
      "do a stretch",
      "yoga"
     ],
     "count": 76,
     "validation_status": "VALID"
    },
    {
     "canonical": "feed the dog",
     "aliases": [
      "feed the cat",
      "feed the pets",
      "feed the animals",
      "let the dog out"
     ],
     "count": 55,
     "validation_status": "VALID"
    },
    {
     "canonical": "get dressed",
     "aliases": [
      "put clothes on",
      "dress",
      "change clothes"
     ],
     "count": 40,
     "validation_status": "VALID"
    },
    {
     "canonical": "make the bed",
     "aliases": [
      "making the bed",
      "tidy the bed"
     ],
     "count": 29,
     "validation_status": "VALID"
    },
    {
     "canonical": "boil the kettle",
     "aliases": [
      "put the kettle on",
      "kettle",
      "make tea",
      "cup of tea"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "open the curtains",
     "aliases": [
      "open the blinds",
      "open the window",
      "curtains"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "check the weather",
     "aliases": [
      "look at the forecast",
      "check the forecast",
      "weather"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "walk the dog",
    "go for a run",
    "read the news",
    "put on the radio"
   ],
   "rejects": [
    "nothing",
    "go to sleep",
    "idk"
   ]
  },
  {
   "question_id": "ev-04",
   "prompt": "NAME SOMETHING PEOPLE DO WHILE STUCK IN TRAFFIC.",
   "category": "Everyday",
   "sample_size": 2100,
   "answers": [
    {
     "canonical": "listen to the radio",
     "aliases": [
      "radio",
      "turn on the radio",
      "listen to music",
      "music"
     ],
     "count": 420,
     "validation_status": "VALID"
    },
    {
     "canonical": "honk the horn",
     "aliases": [
      "beep the horn",
      "honk",
      "beep",
      "toot the horn",
      "use the horn"
     ],
     "count": 300,
     "validation_status": "VALID"
    },
    {
     "canonical": "sing along",
     "aliases": [
      "sing",
      "sing in the car",
      "karaoke"
     ],
     "count": 205,
     "validation_status": "VALID"
    },
    {
     "canonical": "check phone",
     "aliases": [
      "look at my phone",
      "check messages",
      "scroll social media"
     ],
     "count": 150,
     "validation_status": "VALID"
    },
    {
     "canonical": "swear",
     "aliases": [
      "curse",
      "yell",
      "shout at other drivers",
      "road rage"
     ],
     "count": 112,
     "validation_status": "VALID"
    },
    {
     "canonical": "eat",
     "aliases": [
      "snack",
      "eat food",
      "have a snack",
      "eat lunch"
     ],
     "count": 78,
     "validation_status": "VALID"
    },
    {
     "canonical": "call someone",
     "aliases": [
      "phone a friend",
      "make a call",
      "ring someone",
      "hands free call"
     ],
     "count": 60,
     "validation_status": "VALID"
    },
    {
     "canonical": "listen to a podcast",
     "aliases": [
      "podcast",
      "listen to an audiobook",
      "audiobook"
     ],
     "count": 46,
     "validation_status": "VALID"
    },
    {
     "canonical": "drum on the steering wheel",
     "aliases": [
      "tap the steering wheel",
      "drum the wheel",
      "air drum"
     ],
     "count": 34,
     "validation_status": "VALID"
    },
    {
     "canonical": "change lanes",
     "aliases": [
      "switch lanes",
      "weave between lanes",
      "lane change"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "put the air con on",
     "aliases": [
      "turn on the aircon",
      "aircon",
      "air conditioning"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "read a book",
     "aliases": [
      "read",
      "read the paper",
      "reading"
     ],
     "count": 13,
     "validation_status": "VALID"
    },
    {
     "canonical": "put on makeup",
     "aliases": [
      "do my makeup",
      "makeup",
      "fix my hair"
     ],
     "count": 8,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "daydream",
    "check the gps",
    "look at the scenery",
    "plan my day"
   ],
   "rejects": [
    "nothing",
    "mow the lawn",
    "teleport"
   ]
  },
  {
   "question_id": "ev-06",
   "prompt": "NAME SOMETHING YOU BUY AT A SERVO.",
   "category": "Everyday",
   "sample_size": 2700,
   "answers": [
    {
     "canonical": "petrol",
     "aliases": [
      "fuel",
      "gas",
      "unleaded",
      "diesel",
      "gasoline"
     ],
     "count": 756,
     "validation_status": "VALID"
    },
    {
     "canonical": "meat pie",
     "aliases": [
      "pie",
      "sausage roll",
      "hot pie"
     ],
     "count": 420,
     "validation_status": "VALID"
    },
    {
     "canonical": "soft drink",
     "aliases": [
      "coke",
      "soda",
      "fizzy drink",
      "soft drinks",
      "cool drink"
     ],
     "count": 285,
     "validation_status": "VALID"
    },
    {
     "canonical": "chocolate bar",
     "aliases": [
      "chocolate",
      "choccy bar",
      "mars bar",
      "snack bar"
     ],
     "count": 196,
     "validation_status": "VALID"
    },
    {
     "canonical": "chips",
     "aliases": [
      "crisps",
      "packet of chips",
      "hot chips"
     ],
     "count": 140,
     "validation_status": "VALID"
    },
    {
     "canonical": "coffee",
     "aliases": [
      "cup of coffee",
      "flat white",
      "iced coffee"
     ],
     "count": 102,
     "validation_status": "VALID"
    },
    {
     "canonical": "milk",
     "aliases": [
      "carton of milk",
      "bottle of milk",
      "milk bottle"
     ],
     "count": 74,
     "validation_status": "VALID"
    },
    {
     "canonical": "ice",
     "aliases": [
      "bag of ice",
      "ice bag"
     ],
     "count": 54,
     "validation_status": "VALID"
    },
    {
     "canonical": "cigarettes",
     "aliases": [
      "smokes",
      "ciggies",
      "durries",
      "tobacco"
     ],
     "count": 40,
     "validation_status": "VALID"
    },
    {
     "canonical": "lottery ticket",
     "aliases": [
      "lotto ticket",
      "scratchie",
      "scratch card"
     ],
     "count": 29,
     "validation_status": "VALID"
    },
    {
     "canonical": "windscreen washer fluid",
     "aliases": [
      "windscreen wash",
      "washer fluid",
      "screen wash"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "car wash",
     "aliases": [
      "carwash",
      "wash the car"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "engine oil",
     "aliases": [
      "motor oil",
      "oil",
      "5w30"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "ice cream",
     "aliases": [
      "icecream",
      "ice block",
      "icy pole",
      "magnum"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "energy drink",
    "newspaper",
    "air for the tyres",
    "phone charger"
   ],
   "rejects": [
    "mortgage",
    "nothing",
    "couch"
   ]
  },
  {
   "question_id": "fd-01",
   "prompt": "NAME A FRUIT.",
   "category": "Food & Drink",
   "sample_size": 2400,
   "answers": [
    {
     "canonical": "apple",
     "aliases": [
      "apples",
      "granny smith",
      "pink lady"
     ],
     "count": 720,
     "validation_status": "VALID"
    },
    {
     "canonical": "banana",
     "aliases": [
      "bananas",
      "nana"
     ],
     "count": 480,
     "validation_status": "VALID"
    },
    {
     "canonical": "orange",
     "aliases": [
      "oranges",
      "navel orange",
      "valencia orange"
     ],
     "count": 336,
     "validation_status": "VALID"
    },
    {
     "canonical": "strawberry",
     "aliases": [
      "strawberries",
      "strawberrys"
     ],
     "count": 144,
     "validation_status": "VALID"
    },
    {
     "canonical": "grape",
     "aliases": [
      "grapes",
      "green grapes",
      "red grapes"
     ],
     "count": 108,
     "validation_status": "VALID"
    },
    {
     "canonical": "mango",
     "aliases": [
      "mangoes",
      "mangos"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "watermelon",
     "aliases": [
      "watermelons",
      "water melon",
      "melon"
     ],
     "count": 60,
     "validation_status": "VALID"
    },
    {
     "canonical": "pineapple",
     "aliases": [
      "pineapples",
      "pine apple"
     ],
     "count": 42,
     "validation_status": "VALID"
    },
    {
     "canonical": "pear",
     "aliases": [
      "pears",
      "nashi pear"
     ],
     "count": 36,
     "validation_status": "VALID"
    },
    {
     "canonical": "peach",
     "aliases": [
      "peaches",
      "peachs"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "lemon",
     "aliases": [
      "lemons"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "kiwifruit",
     "aliases": [
      "kiwi fruit",
      "kiwi",
      "kiwis"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "durian",
     "aliases": [
      "durians",
      "durian fruit"
     ],
     "count": 8,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "blueberry",
    "avocado",
    "passionfruit",
    "nectarine",
    "papaya"
   ],
   "rejects": [
    "carrot",
    "potato",
    "idk"
   ]
  },
  {
   "question_id": "fd-02",
   "prompt": "NAME SOMETHING PEOPLE THROW ON A BARBECUE.",
   "category": "Food & Drink",
   "sample_size": 1800,
   "answers": [
    {
     "canonical": "sausage",
     "aliases": [
      "sausages",
      "snag",
      "snags",
      "bangers"
     ],
     "count": 594,
     "validation_status": "VALID"
    },
    {
     "canonical": "steak",
     "aliases": [
      "steaks",
      "rump steak",
      "scotch fillet"
     ],
     "count": 306,
     "validation_status": "VALID"
    },
    {
     "canonical": "burger patty",
     "aliases": [
      "burger patties",
      "beef patty",
      "hamburger patty",
      "burgers"
     ],
     "count": 198,
     "validation_status": "VALID"
    },
    {
     "canonical": "chicken",
     "aliases": [
      "chicken breast",
      "chook",
      "chicken wings"
     ],
     "count": 144,
     "validation_status": "VALID"
    },
    {
     "canonical": "onion",
     "aliases": [
      "onions",
      "fried onion"
     ],
     "count": 90,
     "validation_status": "VALID"
    },
    {
     "canonical": "prawn",
     "aliases": [
      "prawns",
      "shrimp"
     ],
     "count": 54,
     "validation_status": "VALID"
    },
    {
     "canonical": "lamb chop",
     "aliases": [
      "lamb chops",
      "chops"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "corn",
     "aliases": [
      "corn cob",
      "corn on the cob",
      "sweetcorn"
     ],
     "count": 30,
     "validation_status": "VALID"
    },
    {
     "canonical": "fish",
     "aliases": [
      "fish fillet",
      "whole fish"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "kebab",
     "aliases": [
      "kebabs",
      "skewer",
      "skewers"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "capsicum",
     "aliases": [
      "capsicums",
      "bell pepper",
      "peppers"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "halloumi",
     "aliases": [
      "haloumi",
      "halloumi cheese"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "pineapple ring",
     "aliases": [
      "pineapple rings",
      "pineapple"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "tofu",
    "mushroom",
    "eggplant",
    "bacon",
    "zucchini"
   ],
   "rejects": [
    "petrol",
    "shampoo",
    "nothing"
   ]
  },
  {
   "question_id": "fd-03",
   "prompt": "NAME A DRINK PEOPLE ORDER AT A CAFE.",
   "category": "Food & Drink",
   "sample_size": 3200,
   "answers": [
    {
     "canonical": "flat white",
     "aliases": [
      "flat whites",
      "flatwhite"
     ],
     "count": 608,
     "validation_status": "VALID"
    },
    {
     "canonical": "cappuccino",
     "aliases": [
      "cappuccinos",
      "cap",
      "capp"
     ],
     "count": 480,
     "validation_status": "VALID"
    },
    {
     "canonical": "latte",
     "aliases": [
      "lattes",
      "cafe latte",
      "caffe latte"
     ],
     "count": 416,
     "validation_status": "VALID"
    },
    {
     "canonical": "long black",
     "aliases": [
      "long blacks",
      "americano"
     ],
     "count": 320,
     "validation_status": "VALID"
    },
    {
     "canonical": "hot chocolate",
     "aliases": [
      "hot choc",
      "hot chocolates",
      "drinking chocolate"
     ],
     "count": 224,
     "validation_status": "VALID"
    },
    {
     "canonical": "espresso",
     "aliases": [
      "short black",
      "expresso",
      "espressos"
     ],
     "count": 160,
     "validation_status": "VALID"
    },
    {
     "canonical": "iced coffee",
     "aliases": [
      "ice coffee",
      "iced coffees",
      "iced latte"
     ],
     "count": 144,
     "validation_status": "VALID"
    },
    {
     "canonical": "tea",
     "aliases": [
      "english breakfast tea",
      "cup of tea",
      "black tea"
     ],
     "count": 128,
     "validation_status": "VALID"
    },
    {
     "canonical": "chai latte",
     "aliases": [
      "chai",
      "chai lattes",
      "dirty chai"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "mocha",
     "aliases": [
      "mochas",
      "mochaccino"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "milkshake",
     "aliases": [
      "milk shake",
      "milkshakes",
      "thickshake"
     ],
     "count": 42,
     "validation_status": "VALID"
    },
    {
     "canonical": "juice",
     "aliases": [
      "orange juice",
      "fruit juice",
      "juices"
     ],
     "count": 29,
     "validation_status": "VALID"
    },
    {
     "canonical": "babyccino",
     "aliases": [
      "babycino",
      "babyccinos"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "matcha latte",
     "aliases": [
      "matcha",
      "green tea latte"
     ],
     "count": 11,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "piccolo",
    "affogato",
    "smoothie",
    "lemonade",
    "macchiato"
   ],
   "rejects": [
    "beer",
    "vodka",
    "nothing"
   ]
  },
  {
   "question_id": "fd-04",
   "prompt": "NAME SOMETHING YOU FIND IN A SCHOOL LUNCHBOX.",
   "category": "Food & Drink",
   "sample_size": 1500,
   "answers": [
    {
     "canonical": "sandwich",
     "aliases": [
      "sandwiches",
      "sanga",
      "vegemite sandwich",
      "sandwhich"
     ],
     "count": 390,
     "validation_status": "VALID"
    },
    {
     "canonical": "apple",
     "aliases": [
      "apples"
     ],
     "count": 225,
     "validation_status": "VALID"
    },
    {
     "canonical": "muesli bar",
     "aliases": [
      "muesli bars",
      "granola bar",
      "museli bar"
     ],
     "count": 165,
     "validation_status": "VALID"
    },
    {
     "canonical": "banana",
     "aliases": [
      "bananas"
     ],
     "count": 120,
     "validation_status": "VALID"
    },
    {
     "canonical": "chips",
     "aliases": [
      "crisps",
      "packet of chips",
      "potato chips"
     ],
     "count": 105,
     "validation_status": "VALID"
    },
    {
     "canonical": "yoghurt",
     "aliases": [
      "yogurt",
      "yoghurt tub",
      "yoghurt pouch"
     ],
     "count": 75,
     "validation_status": "VALID"
    },
    {
     "canonical": "juice box",
     "aliases": [
      "juice popper",
      "popper",
      "fruit box"
     ],
     "count": 60,
     "validation_status": "VALID"
    },
    {
     "canonical": "carrot stick",
     "aliases": [
      "carrot sticks",
      "carrots",
      "baby carrots"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "cheese",
     "aliases": [
      "cheese stick",
      "cheese slice",
      "cheese cubes"
     ],
     "count": 30,
     "validation_status": "VALID"
    },
    {
     "canonical": "grape",
     "aliases": [
      "grapes"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "biscuit",
     "aliases": [
      "biscuits",
      "cookie",
      "cookies",
      "tim tam"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "sultana",
     "aliases": [
      "sultanas",
      "raisins",
      "box of sultanas"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "boiled egg",
     "aliases": [
      "hard boiled egg",
      "boiled eggs"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "wrap",
    "mandarin",
    "popcorn",
    "cherry tomato",
    "leftover pasta"
   ],
   "rejects": [
    "homework",
    "laptop",
    "nothing"
   ]
  },
  {
   "question_id": "fd-05",
   "prompt": "NAME A TAKEAWAY PEOPLE ORDER ON A FRIDAY NIGHT.",
   "category": "Food & Drink",
   "sample_size": 2100,
   "answers": [
    {
     "canonical": "pizza",
     "aliases": [
      "pizzas",
      "dominos",
      "pizza hut"
     ],
     "count": 735,
     "validation_status": "VALID"
    },
    {
     "canonical": "chinese",
     "aliases": [
      "chinese food",
      "chinese takeaway",
      "chinese takeout"
     ],
     "count": 315,
     "validation_status": "VALID"
    },
    {
     "canonical": "fish and chips",
     "aliases": [
      "fish n chips",
      "battered fish",
      "fish and chip shop"
     ],
     "count": 252,
     "validation_status": "VALID"
    },
    {
     "canonical": "indian",
     "aliases": [
      "indian food",
      "curry",
      "butter chicken"
     ],
     "count": 147,
     "validation_status": "VALID"
    },
    {
     "canonical": "thai",
     "aliases": [
      "thai food",
      "pad thai",
      "thai takeaway"
     ],
     "count": 126,
     "validation_status": "VALID"
    },
    {
     "canonical": "burger",
     "aliases": [
      "burgers",
      "hamburger",
      "cheeseburger",
      "maccas"
     ],
     "count": 105,
     "validation_status": "VALID"
    },
    {
     "canonical": "kebab",
     "aliases": [
      "kebabs",
      "doner kebab",
      "hsp"
     ],
     "count": 63,
     "validation_status": "VALID"
    },
    {
     "canonical": "sushi",
     "aliases": [
      "sushi rolls",
      "sushi train",
      "japanese"
     ],
     "count": 42,
     "validation_status": "VALID"
    },
    {
     "canonical": "fried chicken",
     "aliases": [
      "kfc",
      "chicken and chips",
      "southern fried chicken"
     ],
     "count": 32,
     "validation_status": "VALID"
    },
    {
     "canonical": "pasta",
     "aliases": [
      "pasta takeaway",
      "italian",
      "spaghetti"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "mexican",
     "aliases": [
      "mexican food",
      "burrito",
      "tacos"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "vietnamese",
     "aliases": [
      "pho",
      "banh mi",
      "vietnamese food"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "souvlaki",
     "aliases": [
      "souvlakia",
      "greek",
      "yiros"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "poke bowl",
    "nachos",
    "roast chicken",
    "malaysian",
    "ramen"
   ],
   "rejects": [
    "cereal",
    "toothpaste",
    "nothing"
   ]
  },
  {
   "question_id": "fd-06",
   "prompt": "NAME SOMETHING PEOPLE PUT ON TOAST.",
   "category": "Food & Drink",
   "sample_size": 2600,
   "answers": [
    {
     "canonical": "butter",
     "aliases": [
      "margarine",
      "marg",
      "butter spread"
     ],
     "count": 494,
     "validation_status": "VALID"
    },
    {
     "canonical": "vegemite",
     "aliases": [
      "marmite",
      "yeast spread",
      "promite"
     ],
     "count": 442,
     "validation_status": "VALID"
    },
    {
     "canonical": "jam",
     "aliases": [
      "strawberry jam",
      "jelly",
      "raspberry jam",
      "conserve"
     ],
     "count": 364,
     "validation_status": "VALID"
    },
    {
     "canonical": "peanut butter",
     "aliases": [
      "peanutbutter",
      "pb",
      "crunchy peanut butter"
     ],
     "count": 286,
     "validation_status": "VALID"
    },
    {
     "canonical": "avocado",
     "aliases": [
      "avo",
      "smashed avo",
      "avocado smash"
     ],
     "count": 208,
     "validation_status": "VALID"
    },
    {
     "canonical": "honey",
     "aliases": [
      "runny honey",
      "honey spread"
     ],
     "count": 156,
     "validation_status": "VALID"
    },
    {
     "canonical": "egg",
     "aliases": [
      "eggs",
      "poached egg",
      "scrambled egg",
      "fried egg"
     ],
     "count": 130,
     "validation_status": "VALID"
    },
    {
     "canonical": "baked beans",
     "aliases": [
      "beans",
      "tin of beans"
     ],
     "count": 78,
     "validation_status": "VALID"
    },
    {
     "canonical": "nutella",
     "aliases": [
      "chocolate spread",
      "hazelnut spread"
     ],
     "count": 52,
     "validation_status": "VALID"
    },
    {
     "canonical": "cheese",
     "aliases": [
      "melted cheese",
      "cheese slice",
      "grated cheese"
     ],
     "count": 39,
     "validation_status": "VALID"
    },
    {
     "canonical": "marmalade",
     "aliases": [
      "orange marmalade",
      "marmelade"
     ],
     "count": 23,
     "validation_status": "VALID"
    },
    {
     "canonical": "tomato",
     "aliases": [
      "tomatoes",
      "sliced tomato",
      "grilled tomato"
     ],
     "count": 16,
     "validation_status": "VALID"
    },
    {
     "canonical": "cinnamon sugar",
     "aliases": [
      "cinnamon and sugar",
      "cinnamon toast"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "hummus",
    "bacon",
    "mushroom",
    "ricotta",
    "lemon curd"
   ],
   "rejects": [
    "toaster",
    "sunscreen",
    "nothing"
   ]
  },
  {
   "question_id": "fd-07",
   "prompt": "NAME A VEGETABLE PEOPLE SERVE WITH A ROAST.",
   "category": "Food & Drink",
   "sample_size": 1450,
   "answers": [
    {
     "canonical": "potato",
     "aliases": [
      "potatoes",
      "roast potato",
      "spud",
      "spuds"
     ],
     "count": 486,
     "validation_status": "VALID"
    },
    {
     "canonical": "carrot",
     "aliases": [
      "carrots",
      "baby carrot"
     ],
     "count": 243,
     "validation_status": "VALID"
    },
    {
     "canonical": "pumpkin",
     "aliases": [
      "roast pumpkin",
      "butternut pumpkin",
      "butternut squash"
     ],
     "count": 162,
     "validation_status": "VALID"
    },
    {
     "canonical": "peas",
     "aliases": [
      "pea",
      "green peas",
      "garden peas"
     ],
     "count": 108,
     "validation_status": "VALID"
    },
    {
     "canonical": "broccoli",
     "aliases": [
      "brocolli",
      "broccolini"
     ],
     "count": 81,
     "validation_status": "VALID"
    },
    {
     "canonical": "parsnip",
     "aliases": [
      "parsnips"
     ],
     "count": 54,
     "validation_status": "VALID"
    },
    {
     "canonical": "onion",
     "aliases": [
      "onions",
      "roast onion"
     ],
     "count": 40,
     "validation_status": "VALID"
    },
    {
     "canonical": "cauliflower",
     "aliases": [
      "cauli",
      "cauliflower cheese"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "sweet potato",
     "aliases": [
      "kumara",
      "sweet potatoes"
     ],
     "count": 20,
     "validation_status": "VALID"
    },
    {
     "canonical": "green bean",
     "aliases": [
      "green beans",
      "beans",
      "french beans"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "corn",
     "aliases": [
      "sweetcorn",
      "corn cob"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "brussels sprout",
     "aliases": [
      "brussel sprouts",
      "sprouts",
      "brussels sprouts"
     ],
     "count": 7,
     "validation_status": "VALID"
    },
    {
     "canonical": "zucchini",
     "aliases": [
      "courgette",
      "zucchinis"
     ],
     "count": 4,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "beetroot",
    "turnip",
    "swede",
    "asparagus",
    "leek"
   ],
   "rejects": [
    "gravy",
    "lamb",
    "nothing"
   ]
  },
  {
   "question_id": "fd-08",
   "prompt": "NAME SOMETHING PEOPLE KEEP IN THE FRIDGE DOOR.",
   "category": "Food & Drink",
   "sample_size": 2250,
   "answers": [
    {
     "canonical": "milk",
     "aliases": [
      "milk bottle",
      "full cream milk",
      "carton of milk"
     ],
     "count": 585,
     "validation_status": "VALID"
    },
    {
     "canonical": "butter",
     "aliases": [
      "margarine",
      "marg"
     ],
     "count": 315,
     "validation_status": "VALID"
    },
    {
     "canonical": "tomato sauce",
     "aliases": [
      "ketchup",
      "sauce",
      "dead horse"
     ],
     "count": 270,
     "validation_status": "VALID"
    },
    {
     "canonical": "egg",
     "aliases": [
      "eggs",
      "carton of eggs"
     ],
     "count": 180,
     "validation_status": "VALID"
    },
    {
     "canonical": "juice",
     "aliases": [
      "orange juice",
      "fruit juice"
     ],
     "count": 135,
     "validation_status": "VALID"
    },
    {
     "canonical": "mayonnaise",
     "aliases": [
      "mayo",
      "whole egg mayo"
     ],
     "count": 112,
     "validation_status": "VALID"
    },
    {
     "canonical": "jam",
     "aliases": [
      "strawberry jam",
      "jelly"
     ],
     "count": 90,
     "validation_status": "VALID"
    },
    {
     "canonical": "soft drink",
     "aliases": [
      "fizzy drink",
      "soda",
      "cola",
      "coke"
     ],
     "count": 68,
     "validation_status": "VALID"
    },
    {
     "canonical": "beer",
     "aliases": [
      "beers",
      "stubby",
      "tinnie"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "mustard",
     "aliases": [
      "dijon mustard",
      "hot mustard"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "soy sauce",
     "aliases": [
      "soya sauce",
      "soy"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "pickle",
     "aliases": [
      "pickles",
      "gherkin",
      "gherkins"
     ],
     "count": 13,
     "validation_status": "VALID"
    },
    {
     "canonical": "maple syrup",
     "aliases": [
      "pancake syrup",
      "syrup"
     ],
     "count": 8,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "water bottle",
    "chilli sauce",
    "salad dressing",
    "cordial"
   ],
   "rejects": [
    "toaster",
    "frozen peas",
    "nothing"
   ]
  },
  {
   "question_id": "hm-01",
   "prompt": "NAME SOMETHING YOU FIND IN A GARAGE.",
   "category": "Home",
   "sample_size": 2200,
   "answers": [
    {
     "canonical": "car",
     "aliases": [
      "vehicle",
      "ute",
      "cars",
      "family car"
     ],
     "count": 572,
     "validation_status": "VALID"
    },
    {
     "canonical": "toolbox",
     "aliases": [
      "tools",
      "tool box",
      "tool kit",
      "spanners",
      "hammer"
     ],
     "count": 352,
     "validation_status": "VALID"
    },
    {
     "canonical": "lawn mower",
     "aliases": [
      "lawnmower",
      "mower",
      "lawn mowers",
      "whipper snipper"
     ],
     "count": 228,
     "validation_status": "VALID"
    },
    {
     "canonical": "bicycle",
     "aliases": [
      "bike",
      "bikes",
      "push bike",
      "pushbike"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "workbench",
     "aliases": [
      "work bench",
      "bench",
      "work table"
     ],
     "count": 104,
     "validation_status": "VALID"
    },
    {
     "canonical": "paint",
     "aliases": [
      "tin of paint",
      "paint tin",
      "paint cans",
      "tins of paint"
     ],
     "count": 72,
     "validation_status": "VALID"
    },
    {
     "canonical": "spider",
     "aliases": [
      "spiders",
      "huntsman",
      "cobwebs",
      "redback"
     ],
     "count": 54,
     "validation_status": "VALID"
    },
    {
     "canonical": "ladder",
     "aliases": [
      "ladders",
      "step ladder"
     ],
     "count": 40,
     "validation_status": "VALID"
    },
    {
     "canonical": "spare fridge",
     "aliases": [
      "beer fridge",
      "old fridge",
      "second fridge",
      "freezer"
     ],
     "count": 30,
     "validation_status": "VALID"
    },
    {
     "canonical": "bin",
     "aliases": [
      "rubbish bin",
      "wheelie bin",
      "bins",
      "garbage bin"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "surfboard",
     "aliases": [
      "surf board",
      "surfboards",
      "boogie board"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "christmas decorations",
     "aliases": [
      "christmas tree",
      "xmas decorations",
      "fairy lights"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "cricket bat",
     "aliases": [
      "cricket set",
      "cricket gear",
      "bat"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "extension cord",
    "jerry can",
    "wheelbarrow",
    "fishing rod"
   ],
   "rejects": [
    "nothing",
    "escalator",
    "swimming pool"
   ]
  },
  {
   "question_id": "hm-02",
   "prompt": "NAME A ROOM IN A HOUSE.",
   "category": "Home",
   "sample_size": 1900,
   "answers": [
    {
     "canonical": "kitchen",
     "aliases": [
      "kitchens",
      "cooking area"
     ],
     "count": 530,
     "validation_status": "VALID"
    },
    {
     "canonical": "bedroom",
     "aliases": [
      "bed room",
      "master bedroom",
      "bedrooms",
      "spare room"
     ],
     "count": 360,
     "validation_status": "VALID"
    },
    {
     "canonical": "bathroom",
     "aliases": [
      "bath room",
      "ensuite",
      "shower room",
      "washroom"
     ],
     "count": 240,
     "validation_status": "VALID"
    },
    {
     "canonical": "living room",
     "aliases": [
      "lounge",
      "lounge room",
      "loungeroom",
      "family room",
      "sitting room"
     ],
     "count": 170,
     "validation_status": "VALID"
    },
    {
     "canonical": "laundry",
     "aliases": [
      "laundry room",
      "washing room",
      "utility room"
     ],
     "count": 92,
     "validation_status": "VALID"
    },
    {
     "canonical": "dining room",
     "aliases": [
      "dining area",
      "meals area",
      "dining"
     ],
     "count": 62,
     "validation_status": "VALID"
    },
    {
     "canonical": "garage",
     "aliases": [
      "carport",
      "garages"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "toilet",
     "aliases": [
      "loo",
      "powder room",
      "water closet",
      "dunny"
     ],
     "count": 32,
     "validation_status": "VALID"
    },
    {
     "canonical": "study",
     "aliases": [
      "office",
      "home office",
      "den"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "hallway",
     "aliases": [
      "hall",
      "corridor",
      "entryway",
      "foyer"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "nursery",
     "aliases": [
      "baby room",
      "babys room",
      "kids room"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "attic",
     "aliases": [
      "loft",
      "roof space"
     ],
     "count": 8,
     "validation_status": "VALID"
    },
    {
     "canonical": "pantry",
     "aliases": [
      "butlers pantry",
      "larder",
      "walk in pantry"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "rumpus room",
    "sunroom",
    "games room",
    "cellar"
   ],
   "rejects": [
    "driveway",
    "nothing",
    "tractor"
   ]
  },
  {
   "question_id": "hm-03",
   "prompt": "NAME SOMETHING YOU KEEP IN THE FRIDGE.",
   "category": "Home",
   "sample_size": 3300,
   "answers": [
    {
     "canonical": "milk",
     "aliases": [
      "carton of milk",
      "full cream milk",
      "soy milk",
      "milk bottle"
     ],
     "count": 640,
     "validation_status": "VALID"
    },
    {
     "canonical": "eggs",
     "aliases": [
      "egg",
      "carton of eggs",
      "dozen eggs"
     ],
     "count": 470,
     "validation_status": "VALID"
    },
    {
     "canonical": "butter",
     "aliases": [
      "margarine",
      "spread",
      "butter tub"
     ],
     "count": 352,
     "validation_status": "VALID"
    },
    {
     "canonical": "cheese",
     "aliases": [
      "block of cheese",
      "cheddar",
      "sliced cheese",
      "cheese slices"
     ],
     "count": 268,
     "validation_status": "VALID"
    },
    {
     "canonical": "leftovers",
     "aliases": [
      "last nights dinner",
      "leftover food",
      "takeaway containers"
     ],
     "count": 200,
     "validation_status": "VALID"
    },
    {
     "canonical": "beer",
     "aliases": [
      "beers",
      "stubbies",
      "cans of beer",
      "six pack"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "vegetables",
     "aliases": [
      "veggies",
      "veg",
      "salad",
      "lettuce"
     ],
     "count": 115,
     "validation_status": "VALID"
    },
    {
     "canonical": "tomato sauce",
     "aliases": [
      "ketchup",
      "sauce",
      "dead horse",
      "tomato ketchup"
     ],
     "count": 86,
     "validation_status": "VALID"
    },
    {
     "canonical": "yoghurt",
     "aliases": [
      "yogurt",
      "greek yoghurt",
      "yoghurt tub"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "juice",
     "aliases": [
      "orange juice",
      "fruit juice",
      "apple juice"
     ],
     "count": 48,
     "validation_status": "VALID"
    },
    {
     "canonical": "chocolate",
     "aliases": [
      "chocolate bar",
      "block of chocolate",
      "choccy"
     ],
     "count": 34,
     "validation_status": "VALID"
    },
    {
     "canonical": "vegemite",
     "aliases": [
      "marmite",
      "yeast spread"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "wine",
     "aliases": [
      "white wine",
      "bottle of wine",
      "champagne"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "nail polish",
     "aliases": [
      "nail varnish",
      "nail polish bottle"
     ],
     "count": 11,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "mustard",
    "bacon",
    "water jug",
    "birthday cake"
   ],
   "rejects": [
    "nothing",
    "bicycle",
    "idk"
   ]
  },
  {
   "question_id": "hm-04",
   "prompt": "NAME A CHORE PEOPLE PUT OFF DOING.",
   "category": "Home",
   "sample_size": 2500,
   "answers": [
    {
     "canonical": "dishes",
     "aliases": [
      "washing up",
      "wash the dishes",
      "do the dishes",
      "dishwashing",
      "washing dishes"
     ],
     "count": 600,
     "validation_status": "VALID"
    },
    {
     "canonical": "folding laundry",
     "aliases": [
      "folding the washing",
      "fold clothes",
      "putting washing away",
      "folding the clothes"
     ],
     "count": 420,
     "validation_status": "VALID"
    },
    {
     "canonical": "vacuuming",
     "aliases": [
      "vacuum",
      "hoovering",
      "vacuum the floor"
     ],
     "count": 290,
     "validation_status": "VALID"
    },
    {
     "canonical": "cleaning the bathroom",
     "aliases": [
      "clean the shower",
      "scrub the toilet",
      "bathroom cleaning"
     ],
     "count": 205,
     "validation_status": "VALID"
    },
    {
     "canonical": "mowing the lawn",
     "aliases": [
      "mow the lawn",
      "cut the grass",
      "lawn mowing",
      "mowing"
     ],
     "count": 148,
     "validation_status": "VALID"
    },
    {
     "canonical": "ironing",
     "aliases": [
      "iron the clothes",
      "do the ironing"
     ],
     "count": 100,
     "validation_status": "VALID"
    },
    {
     "canonical": "cleaning the oven",
     "aliases": [
      "oven cleaning",
      "scrub the oven"
     ],
     "count": 72,
     "validation_status": "VALID"
    },
    {
     "canonical": "taking out the bins",
     "aliases": [
      "take out the rubbish",
      "bin night",
      "taking out the trash",
      "empty the bin"
     ],
     "count": 52,
     "validation_status": "VALID"
    },
    {
     "canonical": "dusting",
     "aliases": [
      "dust the shelves",
      "dusting the house"
     ],
     "count": 38,
     "validation_status": "VALID"
    },
    {
     "canonical": "cleaning the windows",
     "aliases": [
      "window cleaning",
      "wash the windows"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "mopping",
     "aliases": [
      "mop the floor",
      "mopping the floors"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "cleaning the gutters",
     "aliases": [
      "clear the gutters",
      "gutter cleaning"
     ],
     "count": 13,
     "validation_status": "VALID"
    },
    {
     "canonical": "defrosting the freezer",
     "aliases": [
      "defrost the freezer",
      "clean the freezer"
     ],
     "count": 8,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "weeding the garden",
    "cleaning the car",
    "sorting the pantry",
    "changing the sheets"
   ],
   "rejects": [
    "nothing",
    "watching tv",
    "eating cake"
   ]
  },
  {
   "question_id": "hm-05",
   "prompt": "NAME SOMETHING YOU FIND ON A KITCHEN BENCH.",
   "category": "Home",
   "sample_size": 1600,
   "answers": [
    {
     "canonical": "kettle",
     "aliases": [
      "electric kettle",
      "jug",
      "boiling jug"
     ],
     "count": 336,
     "validation_status": "VALID"
    },
    {
     "canonical": "toaster",
     "aliases": [
      "toast maker",
      "sandwich press"
     ],
     "count": 248,
     "validation_status": "VALID"
    },
    {
     "canonical": "fruit bowl",
     "aliases": [
      "bowl of fruit",
      "fruit basket",
      "bananas in a bowl"
     ],
     "count": 170,
     "validation_status": "VALID"
    },
    {
     "canonical": "microwave",
     "aliases": [
      "microwave oven",
      "micro"
     ],
     "count": 118,
     "validation_status": "VALID"
    },
    {
     "canonical": "knife block",
     "aliases": [
      "knives",
      "knife set",
      "knife holder"
     ],
     "count": 82,
     "validation_status": "VALID"
    },
    {
     "canonical": "dirty dishes",
     "aliases": [
      "dirty plates",
      "pile of dishes",
      "washing up"
     ],
     "count": 58,
     "validation_status": "VALID"
    },
    {
     "canonical": "chopping board",
     "aliases": [
      "cutting board",
      "chopping boards"
     ],
     "count": 42,
     "validation_status": "VALID"
    },
    {
     "canonical": "coffee machine",
     "aliases": [
      "espresso machine",
      "coffee maker",
      "nespresso"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "bread",
     "aliases": [
      "loaf of bread",
      "bread bin",
      "bread loaf"
     ],
     "count": 23,
     "validation_status": "VALID"
    },
    {
     "canonical": "mail",
     "aliases": [
      "letters",
      "bills",
      "unopened mail",
      "post"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "phone charger",
     "aliases": [
      "charger",
      "phone cable",
      "charging cable"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "car keys",
     "aliases": [
      "keys",
      "house keys",
      "keyring"
     ],
     "count": 8,
     "validation_status": "VALID"
    },
    {
     "canonical": "blender",
     "aliases": [
      "food processor",
      "smoothie maker",
      "nutribullet"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "salt shaker",
    "dish rack",
    "paper towel",
    "school lunchbox"
   ],
   "rejects": [
    "nothing",
    "bathtub",
    "steering wheel"
   ]
  },
  {
   "question_id": "hm-06",
   "prompt": "NAME SOMETHING THAT ALWAYS GOES MISSING AT HOME.",
   "category": "Home",
   "sample_size": 1350,
   "answers": [
    {
     "canonical": "tv remote",
     "aliases": [
      "remote",
      "remote control",
      "clicker",
      "tv controller"
     ],
     "count": 459,
     "validation_status": "VALID"
    },
    {
     "canonical": "keys",
     "aliases": [
      "car keys",
      "house keys",
      "key",
      "keyring"
     ],
     "count": 270,
     "validation_status": "VALID"
    },
    {
     "canonical": "socks",
     "aliases": [
      "sock",
      "one sock",
      "odd sock",
      "missing sock"
     ],
     "count": 162,
     "validation_status": "VALID"
    },
    {
     "canonical": "phone",
     "aliases": [
      "mobile",
      "mobile phone",
      "smartphone"
     ],
     "count": 104,
     "validation_status": "VALID"
    },
    {
     "canonical": "pen",
     "aliases": [
      "pens",
      "biro",
      "ballpoint"
     ],
     "count": 68,
     "validation_status": "VALID"
    },
    {
     "canonical": "scissors",
     "aliases": [
      "pair of scissors",
      "kitchen scissors"
     ],
     "count": 46,
     "validation_status": "VALID"
    },
    {
     "canonical": "charger",
     "aliases": [
      "phone charger",
      "charging cable",
      "usb cable",
      "cord"
     ],
     "count": 32,
     "validation_status": "VALID"
    },
    {
     "canonical": "glasses",
     "aliases": [
      "reading glasses",
      "sunglasses",
      "specs",
      "spectacles"
     ],
     "count": 23,
     "validation_status": "VALID"
    },
    {
     "canonical": "hair tie",
     "aliases": [
      "hair elastic",
      "scrunchie",
      "bobby pin",
      "hair band"
     ],
     "count": 16,
     "validation_status": "VALID"
    },
    {
     "canonical": "tape measure",
     "aliases": [
      "measuring tape",
      "ruler"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "lighter",
     "aliases": [
      "matches",
      "cigarette lighter"
     ],
     "count": 8,
     "validation_status": "VALID"
    },
    {
     "canonical": "batteries",
     "aliases": [
      "aa batteries",
      "battery",
      "spare batteries"
     ],
     "count": 5,
     "validation_status": "VALID"
    },
    {
     "canonical": "umbrella",
     "aliases": [
      "brolly",
      "umbrellas"
     ],
     "count": 3,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "nail clippers",
    "sticky tape",
    "tupperware lid",
    "library book"
   ],
   "rejects": [
    "nothing",
    "sun",
    "fridge"
   ]
  },
  {
   "question_id": "na-01",
   "prompt": "NAME SOMETHING YOU SEE IN THE SKY.",
   "category": "Nature",
   "sample_size": 2200,
   "answers": [
    {
     "canonical": "cloud",
     "aliases": [
      "clouds"
     ],
     "count": 792,
     "validation_status": "VALID"
    },
    {
     "canonical": "sun",
     "aliases": [
      "sunshine",
      "sunlight"
     ],
     "count": 330,
     "validation_status": "VALID"
    },
    {
     "canonical": "star",
     "aliases": [
      "stars",
      "starlight"
     ],
     "count": 220,
     "validation_status": "VALID"
    },
    {
     "canonical": "moon",
     "aliases": [
      "moons",
      "full moon"
     ],
     "count": 165,
     "validation_status": "VALID"
    },
    {
     "canonical": "bird",
     "aliases": [
      "birds",
      "flock of birds"
     ],
     "count": 110,
     "validation_status": "VALID"
    },
    {
     "canonical": "plane",
     "aliases": [
      "planes",
      "aeroplane",
      "airplane",
      "jet"
     ],
     "count": 92,
     "validation_status": "VALID"
    },
    {
     "canonical": "rainbow",
     "aliases": [
      "rainbows"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "rain",
     "aliases": [
      "raindrops",
      "showers"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "helicopter",
     "aliases": [
      "helicopters",
      "chopper"
     ],
     "count": 32,
     "validation_status": "VALID"
    },
    {
     "canonical": "lightning",
     "aliases": [
      "lightning bolt",
      "lightening"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "kite",
     "aliases": [
      "kites"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "hot air balloon",
     "aliases": [
      "hot air balloons",
      "balloon"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "satellite",
     "aliases": [
      "satellites"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "aurora",
    "comet",
    "smoke",
    "drone",
    "shooting star"
   ],
   "rejects": [
    "grass",
    "nothing",
    "idk"
   ]
  },
  {
   "question_id": "na-02",
   "prompt": "NAME A TREE.",
   "category": "Nature",
   "sample_size": 1600,
   "answers": [
    {
     "canonical": "gum tree",
     "aliases": [
      "gum",
      "eucalyptus",
      "eucalypt",
      "gumtree"
     ],
     "count": 304,
     "validation_status": "VALID"
    },
    {
     "canonical": "oak",
     "aliases": [
      "oak tree",
      "oaks"
     ],
     "count": 246,
     "validation_status": "VALID"
    },
    {
     "canonical": "pine",
     "aliases": [
      "pine tree",
      "pines",
      "conifer"
     ],
     "count": 198,
     "validation_status": "VALID"
    },
    {
     "canonical": "willow",
     "aliases": [
      "willow tree",
      "weeping willow"
     ],
     "count": 134,
     "validation_status": "VALID"
    },
    {
     "canonical": "palm tree",
     "aliases": [
      "palm",
      "palms",
      "coconut tree"
     ],
     "count": 111,
     "validation_status": "VALID"
    },
    {
     "canonical": "wattle",
     "aliases": [
      "wattle tree",
      "acacia",
      "golden wattle"
     ],
     "count": 88,
     "validation_status": "VALID"
    },
    {
     "canonical": "jacaranda",
     "aliases": [
      "jacarandas",
      "jacaranda tree"
     ],
     "count": 66,
     "validation_status": "VALID"
    },
    {
     "canonical": "maple",
     "aliases": [
      "maple tree",
      "maples"
     ],
     "count": 52,
     "validation_status": "VALID"
    },
    {
     "canonical": "birch",
     "aliases": [
      "birch tree",
      "silver birch"
     ],
     "count": 39,
     "validation_status": "VALID"
    },
    {
     "canonical": "apple tree",
     "aliases": [
      "apple",
      "apple trees"
     ],
     "count": 28,
     "validation_status": "VALID"
    },
    {
     "canonical": "banksia",
     "aliases": [
      "banksias"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "fig tree",
     "aliases": [
      "fig",
      "moreton bay fig"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "bottlebrush",
     "aliases": [
      "bottle brush",
      "callistemon"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "baobab",
     "aliases": [
      "baobabs",
      "boab"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "cedar",
    "redwood",
    "mango tree",
    "paperbark",
    "elm"
   ],
   "rejects": [
    "bush",
    "nothing",
    "flower"
   ]
  },
  {
   "question_id": "na-03",
   "prompt": "NAME SOMETHING YOU FIND AT THE BEACH.",
   "category": "Nature",
   "sample_size": 3200,
   "answers": [
    {
     "canonical": "sand",
     "aliases": [
      "sand dune",
      "sandy",
      "dune"
     ],
     "count": 800,
     "validation_status": "VALID"
    },
    {
     "canonical": "shell",
     "aliases": [
      "shells",
      "seashell",
      "seashells"
     ],
     "count": 496,
     "validation_status": "VALID"
    },
    {
     "canonical": "water",
     "aliases": [
      "ocean",
      "sea",
      "waves"
     ],
     "count": 360,
     "validation_status": "VALID"
    },
    {
     "canonical": "seagull",
     "aliases": [
      "seagulls",
      "gull",
      "seagul"
     ],
     "count": 268,
     "validation_status": "VALID"
    },
    {
     "canonical": "sunscreen",
     "aliases": [
      "sun screen",
      "sunblock",
      "suncream"
     ],
     "count": 196,
     "validation_status": "VALID"
    },
    {
     "canonical": "towel",
     "aliases": [
      "towels",
      "beach towel"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "surfboard",
     "aliases": [
      "surfboards",
      "surf board",
      "board"
     ],
     "count": 118,
     "validation_status": "VALID"
    },
    {
     "canonical": "seaweed",
     "aliases": [
      "sea weed",
      "kelp"
     ],
     "count": 86,
     "validation_status": "VALID"
    },
    {
     "canonical": "rock pool",
     "aliases": [
      "rockpool",
      "rock pools",
      "tide pool"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "esky",
     "aliases": [
      "eskies",
      "cooler",
      "chilly bin",
      "ice box"
     ],
     "count": 48,
     "validation_status": "VALID"
    },
    {
     "canonical": "driftwood",
     "aliases": [
      "drift wood"
     ],
     "count": 35,
     "validation_status": "VALID"
    },
    {
     "canonical": "jellyfish",
     "aliases": [
      "jelly fish",
      "jellyfishes"
     ],
     "count": 26,
     "validation_status": "VALID"
    },
    {
     "canonical": "crab",
     "aliases": [
      "crabs",
      "sand crab"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "bluebottle",
     "aliases": [
      "bluebottles",
      "blue bottle",
      "portuguese man o war"
     ],
     "count": 11,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "lifeguard",
    "pipi",
    "sand castle",
    "thongs",
    "starfish"
   ],
   "rejects": [
    "snow",
    "nothing",
    "escalator"
   ]
  },
  {
   "question_id": "na-04",
   "prompt": "NAME A TYPE OF WEATHER.",
   "category": "Nature",
   "sample_size": 2000,
   "answers": [
    {
     "canonical": "rain",
     "aliases": [
      "rainy",
      "raining",
      "showers",
      "rainfall"
     ],
     "count": 700,
     "validation_status": "VALID"
    },
    {
     "canonical": "sunny",
     "aliases": [
      "sunshine",
      "sun",
      "fine"
     ],
     "count": 280,
     "validation_status": "VALID"
    },
    {
     "canonical": "snow",
     "aliases": [
      "snowy",
      "snowing",
      "snowfall"
     ],
     "count": 208,
     "validation_status": "VALID"
    },
    {
     "canonical": "wind",
     "aliases": [
      "windy",
      "gale",
      "breeze"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "storm",
     "aliases": [
      "stormy",
      "thunderstorm",
      "storms"
     ],
     "count": 116,
     "validation_status": "VALID"
    },
    {
     "canonical": "hail",
     "aliases": [
      "hailstorm",
      "hailstones",
      "hailing"
     ],
     "count": 84,
     "validation_status": "VALID"
    },
    {
     "canonical": "cloudy",
     "aliases": [
      "overcast",
      "clouds",
      "cloud"
     ],
     "count": 63,
     "validation_status": "VALID"
    },
    {
     "canonical": "fog",
     "aliases": [
      "foggy",
      "mist",
      "misty"
     ],
     "count": 46,
     "validation_status": "VALID"
    },
    {
     "canonical": "thunder",
     "aliases": [
      "thunder and lightning",
      "lightning"
     ],
     "count": 33,
     "validation_status": "VALID"
    },
    {
     "canonical": "heatwave",
     "aliases": [
      "heat wave",
      "scorcher",
      "heat"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "drizzle",
     "aliases": [
      "drizzly",
      "light rain"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "sleet",
     "aliases": [
      "sleety"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "cyclone",
     "aliases": [
      "cyclones",
      "hurricane",
      "typhoon"
     ],
     "count": 7,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "humidity",
    "frost",
    "tornado",
    "monsoon",
    "dust storm"
   ],
   "rejects": [
    "nothing",
    "idk",
    "spaghetti"
   ]
  },
  {
   "question_id": "na-05",
   "prompt": "NAME SOMETHING YOU SEE ON A BUSHWALK.",
   "category": "Nature",
   "sample_size": 2600,
   "answers": [
    {
     "canonical": "tree",
     "aliases": [
      "trees",
      "gum tree",
      "eucalyptus"
     ],
     "count": 494,
     "validation_status": "VALID"
    },
    {
     "canonical": "bird",
     "aliases": [
      "birds",
      "kookaburra",
      "magpie"
     ],
     "count": 338,
     "validation_status": "VALID"
    },
    {
     "canonical": "rock",
     "aliases": [
      "rocks",
      "boulder",
      "stone"
     ],
     "count": 260,
     "validation_status": "VALID"
    },
    {
     "canonical": "kangaroo",
     "aliases": [
      "kangaroos",
      "roo",
      "wallaby"
     ],
     "count": 208,
     "validation_status": "VALID"
    },
    {
     "canonical": "creek",
     "aliases": [
      "creeks",
      "stream",
      "river"
     ],
     "count": 169,
     "validation_status": "VALID"
    },
    {
     "canonical": "snake",
     "aliases": [
      "snakes",
      "brown snake"
     ],
     "count": 137,
     "validation_status": "VALID"
    },
    {
     "canonical": "fern",
     "aliases": [
      "ferns",
      "tree fern",
      "bracken"
     ],
     "count": 106,
     "validation_status": "VALID"
    },
    {
     "canonical": "wildflower",
     "aliases": [
      "wildflowers",
      "wild flower",
      "flowers"
     ],
     "count": 82,
     "validation_status": "VALID"
    },
    {
     "canonical": "spider web",
     "aliases": [
      "spiderweb",
      "cobweb",
      "web"
     ],
     "count": 63,
     "validation_status": "VALID"
    },
    {
     "canonical": "lizard",
     "aliases": [
      "lizards",
      "goanna",
      "skink"
     ],
     "count": 48,
     "validation_status": "VALID"
    },
    {
     "canonical": "mushroom",
     "aliases": [
      "mushrooms",
      "fungi",
      "toadstool"
     ],
     "count": 35,
     "validation_status": "VALID"
    },
    {
     "canonical": "ant",
     "aliases": [
      "ants",
      "ant nest"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "waterfall",
     "aliases": [
      "waterfalls",
      "water fall"
     ],
     "count": 18,
     "validation_status": "VALID"
    },
    {
     "canonical": "leech",
     "aliases": [
      "leeches"
     ],
     "count": 10,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "moss",
    "echidna",
    "bark",
    "possum",
    "lichen"
   ],
   "rejects": [
    "escalator",
    "nothing",
    "polar bear"
   ]
  },
  {
   "question_id": "na-06",
   "prompt": "NAME A FLOWER.",
   "category": "Nature",
   "sample_size": 3400,
   "answers": [
    {
     "canonical": "rose",
     "aliases": [
      "roses",
      "red rose"
     ],
     "count": 952,
     "validation_status": "VALID"
    },
    {
     "canonical": "daisy",
     "aliases": [
      "daisies",
      "gerbera"
     ],
     "count": 510,
     "validation_status": "VALID"
    },
    {
     "canonical": "tulip",
     "aliases": [
      "tulips"
     ],
     "count": 374,
     "validation_status": "VALID"
    },
    {
     "canonical": "sunflower",
     "aliases": [
      "sunflowers",
      "sun flower"
     ],
     "count": 289,
     "validation_status": "VALID"
    },
    {
     "canonical": "lily",
     "aliases": [
      "lilies",
      "lilly",
      "water lily"
     ],
     "count": 204,
     "validation_status": "VALID"
    },
    {
     "canonical": "orchid",
     "aliases": [
      "orchids"
     ],
     "count": 153,
     "validation_status": "VALID"
    },
    {
     "canonical": "daffodil",
     "aliases": [
      "daffodils",
      "jonquil"
     ],
     "count": 119,
     "validation_status": "VALID"
    },
    {
     "canonical": "carnation",
     "aliases": [
      "carnations"
     ],
     "count": 85,
     "validation_status": "VALID"
    },
    {
     "canonical": "lavender",
     "aliases": [
      "lavendar",
      "lavender bush"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "waratah",
     "aliases": [
      "waratahs"
     ],
     "count": 48,
     "validation_status": "VALID"
    },
    {
     "canonical": "hibiscus",
     "aliases": [
      "hibiscuses",
      "hibiscous"
     ],
     "count": 37,
     "validation_status": "VALID"
    },
    {
     "canonical": "peony",
     "aliases": [
      "peonies",
      "peony rose"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "jasmine",
     "aliases": [
      "jasmin",
      "star jasmine"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "frangipani",
     "aliases": [
      "frangipanis",
      "plumeria"
     ],
     "count": 12,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "iris",
    "marigold",
    "bottlebrush",
    "wattle",
    "protea"
   ],
   "rejects": [
    "tree",
    "nothing",
    "sausage roll"
   ]
  },
  {
   "question_id": "pl-01",
   "prompt": "NAME SOMETHING PEOPLE PACK IN A SUITCASE.",
   "category": "Places & Travel",
   "sample_size": 2400,
   "answers": [
    {
     "canonical": "clothes",
     "aliases": [
      "clothing",
      "shirts",
      "outfits",
      "t shirts"
     ],
     "count": 840,
     "validation_status": "VALID"
    },
    {
     "canonical": "toothbrush",
     "aliases": [
      "tooth brush",
      "toothbrushes"
     ],
     "count": 396,
     "validation_status": "VALID"
    },
    {
     "canonical": "underwear",
     "aliases": [
      "undies",
      "jocks",
      "knickers"
     ],
     "count": 262,
     "validation_status": "VALID"
    },
    {
     "canonical": "shoes",
     "aliases": [
      "shoe",
      "sneakers",
      "runners",
      "footwear"
     ],
     "count": 181,
     "validation_status": "VALID"
    },
    {
     "canonical": "phone charger",
     "aliases": [
      "charger",
      "phone cord",
      "usb charger"
     ],
     "count": 118,
     "validation_status": "VALID"
    },
    {
     "canonical": "passport",
     "aliases": [
      "passports",
      "travel documents"
     ],
     "count": 77,
     "validation_status": "VALID"
    },
    {
     "canonical": "toiletries",
     "aliases": [
      "toiletry bag",
      "wash bag",
      "shampoo"
     ],
     "count": 49,
     "validation_status": "VALID"
    },
    {
     "canonical": "sunscreen",
     "aliases": [
      "sun screen",
      "sunblock",
      "sun cream"
     ],
     "count": 35,
     "validation_status": "VALID"
    },
    {
     "canonical": "book",
     "aliases": [
      "books",
      "novel",
      "paperback"
     ],
     "count": 27,
     "validation_status": "VALID"
    },
    {
     "canonical": "swimmers",
     "aliases": [
      "swimsuit",
      "bathers",
      "togs",
      "board shorts"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "towel",
     "aliases": [
      "towels",
      "beach towel"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "hairbrush",
     "aliases": [
      "hair brush",
      "comb"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "adapter plug",
    "laptop",
    "razor",
    "hat"
   ],
   "rejects": [
    "aeroplane",
    "nothing",
    "baggage carousel"
   ]
  },
  {
   "question_id": "pl-02",
   "prompt": "NAME A PLACE YOU STOP AT ON A LONG ROAD TRIP.",
   "category": "Places & Travel",
   "sample_size": 3100,
   "answers": [
    {
     "canonical": "servo",
     "aliases": [
      "petrol station",
      "gas station",
      "service station",
      "fuel stop"
     ],
     "count": 589,
     "validation_status": "VALID"
    },
    {
     "canonical": "maccas",
     "aliases": [
      "mcdonalds",
      "drive through"
     ],
     "count": 452,
     "validation_status": "VALID"
    },
    {
     "canonical": "rest area",
     "aliases": [
      "rest stop",
      "roadside stop",
      "driver reviver"
     ],
     "count": 366,
     "validation_status": "VALID"
    },
    {
     "canonical": "bakery",
     "aliases": [
      "bakeries",
      "pie shop"
     ],
     "count": 291,
     "validation_status": "VALID"
    },
    {
     "canonical": "cafe",
     "aliases": [
      "cafes",
      "coffee shop",
      "coffee stop"
     ],
     "count": 232,
     "validation_status": "VALID"
    },
    {
     "canonical": "motel",
     "aliases": [
      "motels",
      "hotel",
      "roadside motel"
     ],
     "count": 178,
     "validation_status": "VALID"
    },
    {
     "canonical": "roadhouse",
     "aliases": [
      "road house",
      "truck stop"
     ],
     "count": 134,
     "validation_status": "VALID"
    },
    {
     "canonical": "pub",
     "aliases": [
      "pubs",
      "local pub",
      "tavern"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "toilet block",
     "aliases": [
      "public toilet",
      "dunny",
      "restroom",
      "bathroom"
     ],
     "count": 63,
     "validation_status": "VALID"
    },
    {
     "canonical": "lookout",
     "aliases": [
      "scenic lookout",
      "viewpoint",
      "scenic overlook"
     ],
     "count": 40,
     "validation_status": "VALID"
    },
    {
     "canonical": "caravan park",
     "aliases": [
      "camp ground",
      "campsite",
      "holiday park"
     ],
     "count": 28,
     "validation_status": "VALID"
    },
    {
     "canonical": "fruit stall",
     "aliases": [
      "roadside stall",
      "farm stand",
      "produce stand"
     ],
     "count": 20,
     "validation_status": "VALID"
    },
    {
     "canonical": "supermarket",
     "aliases": [
      "woolworths",
      "coles",
      "grocery store"
     ],
     "count": 11,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "visitor centre",
    "car wash",
    "beach",
    "museum"
   ],
   "rejects": [
    "idk",
    "seatbelt",
    "nothing"
   ]
  },
  {
   "question_id": "pl-03",
   "prompt": "NAME SOMETHING YOU SEE AT AN AIRPORT.",
   "category": "Places & Travel",
   "sample_size": 2600,
   "answers": [
    {
     "canonical": "plane",
     "aliases": [
      "planes",
      "aeroplane",
      "airplane",
      "aircraft",
      "jet"
     ],
     "count": 858,
     "validation_status": "VALID"
    },
    {
     "canonical": "luggage",
     "aliases": [
      "suitcase",
      "suitcases",
      "bags",
      "baggage"
     ],
     "count": 442,
     "validation_status": "VALID"
    },
    {
     "canonical": "baggage carousel",
     "aliases": [
      "luggage carousel",
      "conveyor belt",
      "carousel"
     ],
     "count": 286,
     "validation_status": "VALID"
    },
    {
     "canonical": "security check",
     "aliases": [
      "security",
      "metal detector",
      "x ray scanner",
      "screening"
     ],
     "count": 195,
     "validation_status": "VALID"
    },
    {
     "canonical": "duty free shop",
     "aliases": [
      "duty free",
      "dutyfree"
     ],
     "count": 136,
     "validation_status": "VALID"
    },
    {
     "canonical": "check in desk",
     "aliases": [
      "check in counter",
      "checkin desk",
      "ticket counter"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "departure board",
     "aliases": [
      "flight board",
      "arrivals board",
      "screens"
     ],
     "count": 68,
     "validation_status": "VALID"
    },
    {
     "canonical": "runway",
     "aliases": [
      "runways",
      "tarmac",
      "airstrip"
     ],
     "count": 48,
     "validation_status": "VALID"
    },
    {
     "canonical": "pilot",
     "aliases": [
      "pilots",
      "captain"
     ],
     "count": 34,
     "validation_status": "VALID"
    },
    {
     "canonical": "flight attendant",
     "aliases": [
      "cabin crew",
      "air hostess",
      "steward"
     ],
     "count": 24,
     "validation_status": "VALID"
    },
    {
     "canonical": "control tower",
     "aliases": [
      "tower",
      "air traffic control"
     ],
     "count": 16,
     "validation_status": "VALID"
    },
    {
     "canonical": "sniffer dog",
     "aliases": [
      "detection dog",
      "customs dog",
      "beagle"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "passport control",
    "escalator",
    "luggage trolley",
    "coffee cart"
   ],
   "rejects": [
    "nothing",
    "idk",
    "train conductor"
   ]
  },
  {
   "question_id": "pl-05",
   "prompt": "NAME SOMETHING YOU FIND IN A HOTEL ROOM.",
   "category": "Places & Travel",
   "sample_size": 2750,
   "answers": [
    {
     "canonical": "bed",
     "aliases": [
      "beds",
      "double bed",
      "queen bed"
     ],
     "count": 468,
     "validation_status": "VALID"
    },
    {
     "canonical": "tv",
     "aliases": [
      "television",
      "telly",
      "flat screen"
     ],
     "count": 380,
     "validation_status": "VALID"
    },
    {
     "canonical": "kettle",
     "aliases": [
      "jug",
      "electric kettle",
      "tea kettle"
     ],
     "count": 312,
     "validation_status": "VALID"
    },
    {
     "canonical": "mini bar",
     "aliases": [
      "minibar",
      "bar fridge",
      "mini fridge"
     ],
     "count": 256,
     "validation_status": "VALID"
    },
    {
     "canonical": "towel",
     "aliases": [
      "towels",
      "bath towel"
     ],
     "count": 205,
     "validation_status": "VALID"
    },
    {
     "canonical": "soap",
     "aliases": [
      "hand soap",
      "bar of soap",
      "shampoo"
     ],
     "count": 162,
     "validation_status": "VALID"
    },
    {
     "canonical": "hair dryer",
     "aliases": [
      "hairdryer",
      "blow dryer"
     ],
     "count": 124,
     "validation_status": "VALID"
    },
    {
     "canonical": "iron",
     "aliases": [
      "ironing board",
      "steam iron"
     ],
     "count": 92,
     "validation_status": "VALID"
    },
    {
     "canonical": "phone",
     "aliases": [
      "telephone",
      "bedside phone"
     ],
     "count": 66,
     "validation_status": "VALID"
    },
    {
     "canonical": "remote control",
     "aliases": [
      "remote",
      "tv remote",
      "clicker"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "safe",
     "aliases": [
      "room safe",
      "lock box"
     ],
     "count": 30,
     "validation_status": "VALID"
    },
    {
     "canonical": "coat hanger",
     "aliases": [
      "hangers",
      "coathanger",
      "clothes hanger"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "notepad",
     "aliases": [
      "note pad",
      "pad and pen",
      "stationery"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "slippers",
     "aliases": [
      "slipper",
      "hotel slippers"
     ],
     "count": 9,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "air conditioner",
    "desk",
    "curtains",
    "do not disturb sign"
   ],
   "rejects": [
    "idk",
    "lawn mower",
    "nothing"
   ]
  },
  {
   "question_id": "pl-06",
   "prompt": "NAME SOMETHING YOU TAKE CAMPING.",
   "category": "Places & Travel",
   "sample_size": 1500,
   "answers": [
    {
     "canonical": "tent",
     "aliases": [
      "tents",
      "dome tent"
     ],
     "count": 330,
     "validation_status": "VALID"
    },
    {
     "canonical": "sleeping bag",
     "aliases": [
      "sleeping bags",
      "swag"
     ],
     "count": 240,
     "validation_status": "VALID"
    },
    {
     "canonical": "torch",
     "aliases": [
      "flashlight",
      "head torch",
      "lantern"
     ],
     "count": 180,
     "validation_status": "VALID"
    },
    {
     "canonical": "esky",
     "aliases": [
      "cooler",
      "ice box",
      "chilly bin"
     ],
     "count": 138,
     "validation_status": "VALID"
    },
    {
     "canonical": "matches",
     "aliases": [
      "lighter",
      "fire starter",
      "matchbox"
     ],
     "count": 105,
     "validation_status": "VALID"
    },
    {
     "canonical": "food",
     "aliases": [
      "snacks",
      "tucker",
      "tinned food"
     ],
     "count": 80,
     "validation_status": "VALID"
    },
    {
     "canonical": "firewood",
     "aliases": [
      "wood",
      "logs",
      "kindling"
     ],
     "count": 60,
     "validation_status": "VALID"
    },
    {
     "canonical": "camp stove",
     "aliases": [
      "gas stove",
      "portable stove",
      "burner"
     ],
     "count": 44,
     "validation_status": "VALID"
    },
    {
     "canonical": "bug spray",
     "aliases": [
      "insect repellent",
      "mozzie spray",
      "repellent"
     ],
     "count": 32,
     "validation_status": "VALID"
    },
    {
     "canonical": "water",
     "aliases": [
      "water bottles",
      "drinking water",
      "jerry can"
     ],
     "count": 22,
     "validation_status": "VALID"
    },
    {
     "canonical": "camp chair",
     "aliases": [
      "folding chair",
      "camping chairs",
      "fold up chair"
     ],
     "count": 14,
     "validation_status": "VALID"
    },
    {
     "canonical": "first aid kit",
     "aliases": [
      "firstaid kit",
      "emergency kit"
     ],
     "count": 9,
     "validation_status": "VALID"
    },
    {
     "canonical": "marshmallows",
     "aliases": [
      "marshmallow",
      "smores"
     ],
     "count": 5,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "pillow",
    "air mattress",
    "deck of cards",
    "fishing rod"
   ],
   "rejects": [
    "idk",
    "nothing",
    "chandelier"
   ]
  },
  {
   "question_id": "wk-01",
   "prompt": "NAME SOMETHING YOU FIND ON AN OFFICE DESK.",
   "category": "Work & School",
   "sample_size": 3400,
   "answers": [
    {
     "canonical": "computer",
     "aliases": [
      "laptop",
      "pc",
      "monitor",
      "desktop computer"
     ],
     "count": 1020,
     "validation_status": "VALID"
    },
    {
     "canonical": "pen",
     "aliases": [
      "pens",
      "biro",
      "ballpoint"
     ],
     "count": 578,
     "validation_status": "VALID"
    },
    {
     "canonical": "coffee cup",
     "aliases": [
      "coffee",
      "mug",
      "cup of coffee",
      "cuppa"
     ],
     "count": 386,
     "validation_status": "VALID"
    },
    {
     "canonical": "keyboard",
     "aliases": [
      "keyboards",
      "key board"
     ],
     "count": 272,
     "validation_status": "VALID"
    },
    {
     "canonical": "mouse",
     "aliases": [
      "computer mouse",
      "wireless mouse"
     ],
     "count": 190,
     "validation_status": "VALID"
    },
    {
     "canonical": "paper",
     "aliases": [
      "papers",
      "paperwork",
      "documents",
      "a4 paper"
     ],
     "count": 133,
     "validation_status": "VALID"
    },
    {
     "canonical": "phone",
     "aliases": [
      "telephone",
      "mobile",
      "desk phone"
     ],
     "count": 92,
     "validation_status": "VALID"
    },
    {
     "canonical": "notebook",
     "aliases": [
      "note book",
      "diary",
      "work diary"
     ],
     "count": 64,
     "validation_status": "VALID"
    },
    {
     "canonical": "stapler",
     "aliases": [
      "staplers",
      "staples"
     ],
     "count": 45,
     "validation_status": "VALID"
    },
    {
     "canonical": "photo frame",
     "aliases": [
      "family photo",
      "picture frame",
      "photos"
     ],
     "count": 31,
     "validation_status": "VALID"
    },
    {
     "canonical": "plant",
     "aliases": [
      "pot plant",
      "succulent",
      "office plant"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "sticky notes",
     "aliases": [
      "post it notes",
      "postit",
      "sticky note"
     ],
     "count": 12,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "headphones",
    "calculator",
    "water bottle",
    "hand sanitiser",
    "calendar"
   ],
   "rejects": [
    "idk",
    "tractor",
    "nothing"
   ]
  },
  {
   "question_id": "wk-02",
   "prompt": "NAME A REASON SOMEONE IS LATE FOR WORK.",
   "category": "Work & School",
   "sample_size": 2200,
   "answers": [
    {
     "canonical": "traffic",
     "aliases": [
      "traffic jam",
      "road works",
      "congestion",
      "stuck in traffic"
     ],
     "count": 902,
     "validation_status": "VALID"
    },
    {
     "canonical": "slept in",
     "aliases": [
      "overslept",
      "sleeping in",
      "alarm failed"
     ],
     "count": 308,
     "validation_status": "VALID"
    },
    {
     "canonical": "train delay",
     "aliases": [
      "public transport",
      "missed the bus",
      "bus was late",
      "train was cancelled"
     ],
     "count": 176,
     "validation_status": "VALID"
    },
    {
     "canonical": "kids",
     "aliases": [
      "school drop off",
      "child care run",
      "kids were slow"
     ],
     "count": 110,
     "validation_status": "VALID"
    },
    {
     "canonical": "car trouble",
     "aliases": [
      "car broke down",
      "flat tyre",
      "breakdown"
     ],
     "count": 77,
     "validation_status": "VALID"
    },
    {
     "canonical": "weather",
     "aliases": [
      "rain",
      "storm",
      "bad weather"
     ],
     "count": 55,
     "validation_status": "VALID"
    },
    {
     "canonical": "lost keys",
     "aliases": [
      "misplaced keys",
      "keys went missing"
     ],
     "count": 40,
     "validation_status": "VALID"
    },
    {
     "canonical": "accident on the road",
     "aliases": [
      "car accident",
      "crash",
      "prang"
     ],
     "count": 29,
     "validation_status": "VALID"
    },
    {
     "canonical": "queue at the cafe",
     "aliases": [
      "coffee queue",
      "stopped for coffee",
      "coffee run"
     ],
     "count": 21,
     "validation_status": "VALID"
    },
    {
     "canonical": "forgot something at home",
     "aliases": [
      "had to turn around",
      "left something behind"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "pet escaped",
     "aliases": [
      "dog ran off",
      "chasing the dog",
      "cat got out"
     ],
     "count": 10,
     "validation_status": "VALID"
    },
    {
     "canonical": "dead phone battery",
     "aliases": [
      "phone battery died",
      "flat phone"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "parking",
    "school zone",
    "fuel stop",
    "flood"
   ],
   "rejects": [
    "idk",
    "nothing",
    "pay rise"
   ]
  },
  {
   "question_id": "wk-03",
   "prompt": "NAME SOMETHING STUDENTS CARRY IN THEIR SCHOOL BAG.",
   "category": "Work & School",
   "sample_size": 2900,
   "answers": [
    {
     "canonical": "books",
     "aliases": [
      "text books",
      "exercise books",
      "school books",
      "workbook"
     ],
     "count": 696,
     "validation_status": "VALID"
    },
    {
     "canonical": "lunch box",
     "aliases": [
      "lunchbox",
      "lunch",
      "sandwich"
     ],
     "count": 464,
     "validation_status": "VALID"
    },
    {
     "canonical": "pencil case",
     "aliases": [
      "pencil cases",
      "pencilcase",
      "pens and pencils"
     ],
     "count": 336,
     "validation_status": "VALID"
    },
    {
     "canonical": "water bottle",
     "aliases": [
      "drink bottle",
      "bottle of water",
      "drink"
     ],
     "count": 248,
     "validation_status": "VALID"
    },
    {
     "canonical": "laptop",
     "aliases": [
      "computer",
      "tablet",
      "ipad",
      "chromebook"
     ],
     "count": 186,
     "validation_status": "VALID"
    },
    {
     "canonical": "phone",
     "aliases": [
      "mobile",
      "mobile phone",
      "smartphone"
     ],
     "count": 140,
     "validation_status": "VALID"
    },
    {
     "canonical": "hat",
     "aliases": [
      "school hat",
      "cap",
      "bucket hat"
     ],
     "count": 104,
     "validation_status": "VALID"
    },
    {
     "canonical": "homework",
     "aliases": [
      "assignments",
      "worksheets",
      "school work"
     ],
     "count": 76,
     "validation_status": "VALID"
    },
    {
     "canonical": "jumper",
     "aliases": [
      "jacket",
      "sweater",
      "hoodie",
      "school jumper"
     ],
     "count": 54,
     "validation_status": "VALID"
    },
    {
     "canonical": "sports uniform",
     "aliases": [
      "pe kit",
      "gym clothes",
      "sport shoes"
     ],
     "count": 37,
     "validation_status": "VALID"
    },
    {
     "canonical": "snacks",
     "aliases": [
      "chips",
      "fruit",
      "muesli bar"
     ],
     "count": 25,
     "validation_status": "VALID"
    },
    {
     "canonical": "calculator",
     "aliases": [
      "calculators",
      "scientific calculator"
     ],
     "count": 16,
     "validation_status": "VALID"
    },
    {
     "canonical": "headphones",
     "aliases": [
      "earphones",
      "ear buds",
      "headphone"
     ],
     "count": 10,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "permission slip",
    "umbrella",
    "library book",
    "keys"
   ],
   "rejects": [
    "idk",
    "forklift",
    "nothing"
   ]
  },
  {
   "question_id": "wk-04",
   "prompt": "NAME SOMETHING PEOPLE DO ON THEIR LUNCH BREAK.",
   "category": "Work & School",
   "sample_size": 1800,
   "answers": [
    {
     "canonical": "eat lunch",
     "aliases": [
      "eat",
      "having lunch",
      "eating food"
     ],
     "count": 468,
     "validation_status": "VALID"
    },
    {
     "canonical": "scroll on phone",
     "aliases": [
      "check phone",
      "social media",
      "scrolling"
     ],
     "count": 288,
     "validation_status": "VALID"
    },
    {
     "canonical": "go for a walk",
     "aliases": [
      "walk",
      "stroll",
      "walking"
     ],
     "count": 205,
     "validation_status": "VALID"
    },
    {
     "canonical": "get coffee",
     "aliases": [
      "coffee run",
      "buy a coffee",
      "cafe trip"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "run errands",
     "aliases": [
      "errands",
      "shopping",
      "go to the shops"
     ],
     "count": 110,
     "validation_status": "VALID"
    },
    {
     "canonical": "chat with workmates",
     "aliases": [
      "talk to colleagues",
      "have a chat",
      "socialise"
     ],
     "count": 79,
     "validation_status": "VALID"
    },
    {
     "canonical": "nap",
     "aliases": [
      "power nap",
      "snooze",
      "nap in the car"
     ],
     "count": 56,
     "validation_status": "VALID"
    },
    {
     "canonical": "read",
     "aliases": [
      "read a book",
      "reading",
      "read the news"
     ],
     "count": 38,
     "validation_status": "VALID"
    },
    {
     "canonical": "gym",
     "aliases": [
      "work out",
      "exercise",
      "go to the gym"
     ],
     "count": 26,
     "validation_status": "VALID"
    },
    {
     "canonical": "watch videos",
     "aliases": [
      "youtube",
      "watch tv",
      "streaming"
     ],
     "count": 17,
     "validation_status": "VALID"
    },
    {
     "canonical": "make phone calls",
     "aliases": [
      "call family",
      "phone calls",
      "ring someone"
     ],
     "count": 11,
     "validation_status": "VALID"
    },
    {
     "canonical": "go to the bank",
     "aliases": [
      "banking",
      "post office run"
     ],
     "count": 6,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "study",
    "go for a run",
    "sit in the sun",
    "play cards"
   ],
   "rejects": [
    "idk",
    "nothing",
    "stapler"
   ]
  },
  {
   "question_id": "wk-05",
   "prompt": "NAME A JOB A KID SAYS THEY WANT WHEN THEY GROW UP.",
   "category": "Work & School",
   "sample_size": 1250,
   "answers": [
    {
     "canonical": "police officer",
     "aliases": [
      "policeman",
      "cop",
      "police"
     ],
     "count": 244,
     "validation_status": "VALID"
    },
    {
     "canonical": "doctor",
     "aliases": [
      "surgeon",
      "gp"
     ],
     "count": 190,
     "validation_status": "VALID"
    },
    {
     "canonical": "firefighter",
     "aliases": [
      "fireman",
      "firey",
      "fire fighter"
     ],
     "count": 152,
     "validation_status": "VALID"
    },
    {
     "canonical": "teacher",
     "aliases": [
      "school teacher",
      "teachers"
     ],
     "count": 122,
     "validation_status": "VALID"
    },
    {
     "canonical": "astronaut",
     "aliases": [
      "spaceman",
      "space explorer"
     ],
     "count": 96,
     "validation_status": "VALID"
    },
    {
     "canonical": "vet",
     "aliases": [
      "veterinarian",
      "animal doctor"
     ],
     "count": 74,
     "validation_status": "VALID"
    },
    {
     "canonical": "footy player",
     "aliases": [
      "footballer",
      "soccer player",
      "athlete",
      "sports star"
     ],
     "count": 56,
     "validation_status": "VALID"
    },
    {
     "canonical": "pilot",
     "aliases": [
      "airline pilot",
      "aeroplane pilot"
     ],
     "count": 41,
     "validation_status": "VALID"
    },
    {
     "canonical": "singer",
     "aliases": [
      "pop star",
      "musician",
      "rockstar"
     ],
     "count": 29,
     "validation_status": "VALID"
    },
    {
     "canonical": "youtuber",
     "aliases": [
      "influencer",
      "streamer",
      "content creator"
     ],
     "count": 19,
     "validation_status": "VALID"
    },
    {
     "canonical": "nurse",
     "aliases": [
      "nurses"
     ],
     "count": 12,
     "validation_status": "VALID"
    },
    {
     "canonical": "chef",
     "aliases": [
      "cook",
      "baker"
     ],
     "count": 7,
     "validation_status": "VALID"
    },
    {
     "canonical": "scientist",
     "aliases": [
      "scientists",
      "inventor"
     ],
     "count": 4,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "builder",
    "artist",
    "dancer",
    "train driver",
    "lawyer"
   ],
   "rejects": [
    "idk",
    "nothing",
    "homework"
   ]
  },
  {
   "question_id": "wk-06",
   "prompt": "NAME SOMETHING YOU FIND IN THE STAFF KITCHEN AT WORK.",
   "category": "Work & School",
   "sample_size": 3250,
   "answers": [
    {
     "canonical": "kettle",
     "aliases": [
      "jug",
      "electric kettle",
      "urn"
     ],
     "count": 650,
     "validation_status": "VALID"
    },
    {
     "canonical": "microwave",
     "aliases": [
      "micro wave",
      "microwave oven"
     ],
     "count": 494,
     "validation_status": "VALID"
    },
    {
     "canonical": "fridge",
     "aliases": [
      "refrigerator",
      "bar fridge",
      "freezer"
     ],
     "count": 390,
     "validation_status": "VALID"
    },
    {
     "canonical": "coffee machine",
     "aliases": [
      "espresso machine",
      "instant coffee",
      "coffee jar"
     ],
     "count": 305,
     "validation_status": "VALID"
    },
    {
     "canonical": "mugs",
     "aliases": [
      "cups",
      "coffee mug",
      "mug"
     ],
     "count": 238,
     "validation_status": "VALID"
    },
    {
     "canonical": "sink",
     "aliases": [
      "kitchen sink",
      "tap",
      "basin"
     ],
     "count": 182,
     "validation_status": "VALID"
    },
    {
     "canonical": "toaster",
     "aliases": [
      "toasters",
      "sandwich press",
      "jaffle iron"
     ],
     "count": 136,
     "validation_status": "VALID"
    },
    {
     "canonical": "milk",
     "aliases": [
      "milk carton",
      "long life milk",
      "soy milk"
     ],
     "count": 100,
     "validation_status": "VALID"
    },
    {
     "canonical": "biscuits",
     "aliases": [
      "biscuit",
      "cookies",
      "tim tams"
     ],
     "count": 72,
     "validation_status": "VALID"
    },
    {
     "canonical": "dishwasher",
     "aliases": [
      "dish washer",
      "dish rack",
      "drying rack"
     ],
     "count": 50,
     "validation_status": "VALID"
    },
    {
     "canonical": "notice board",
     "aliases": [
      "noticeboard",
      "bulletin board",
      "roster on the wall"
     ],
     "count": 34,
     "validation_status": "VALID"
    },
    {
     "canonical": "dirty dishes",
     "aliases": [
      "unwashed dishes",
      "plates in the sink",
      "messy bench"
     ],
     "count": 23,
     "validation_status": "VALID"
    },
    {
     "canonical": "teabags",
     "aliases": [
      "tea bags",
      "tea",
      "box of tea"
     ],
     "count": 15,
     "validation_status": "VALID"
    },
    {
     "canonical": "passive aggressive note",
     "aliases": [
      "note on the fridge",
      "printed sign"
     ],
     "count": 8,
     "validation_status": "VALID"
    }
   ],
   "valid_unmeasured": [
    "water cooler",
    "cutlery drawer",
    "rubbish bin",
    "paper towel"
   ],
   "rejects": [
    "idk",
    "nothing",
    "bulldozer"
   ]
  }
 ]
};
  VR.DATASETS[DS.dataset_version] = DS;
  VR.DEFAULT_DATASET = DS.dataset_version;
})(typeof window !== 'undefined' ? window : this);
