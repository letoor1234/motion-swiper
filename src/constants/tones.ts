export interface ToneData {
  image: string;
  label: string;
  labelClassNames: string;
  tags: string[];
}

export const tones: ToneData[] = [
  {
    image: "/tones/bold.jpg",
    label: "Bold",
    labelClassNames: "text-white bg-black px-2 py-1 rounded font-bold",
    tags: ["Bold", "Vibrant", "Impactful"],
  },
  {
    image: "/tones/minimal.jpg",
    label: "Minimal",
    labelClassNames: "text-black bg-white px-2 py-1 font-semibold",
    tags: ["Minimal", "Clean", "Simple"],
  },
  {
    image: "/tones/modern.jpg",
    label: "Modern",
    labelClassNames:
      "text-white bg-gradient-to-r from-gray-700 to-gray-900 px-2 py-1 rounded font-semibold",
    tags: ["Modern", "Contemporary", "Sleek"],
  },
  {
    image: "/tones/tech.jpg",
    label: "Tech",
    labelClassNames: "text-white bg-blue-600 px-2 py-1 rounded font-bold",
    tags: ["Tech", "Innovative", "Digital"],
  },
  {
    image: "/tones/elegant.jpg",
    label: "Elegant",
    labelClassNames: "text-white bg-purple-700 px-2 py-1 rounded",
    tags: ["Elegant", "Sophisticated", "Luxury"],
  },
  {
    image: "/tones/clean.jpg",
    label: "Clean",
    labelClassNames: "text-gray-800 bg-white px-2 py-1 rounded",
    tags: ["Clean", "Minimal", "Fresh"],
  },
  {
    image: "/tones/playful.jpg",
    label: "Playful",
    labelClassNames: "text-white bg-pink-500 px-2 py-1 rounded font-semibold",
    tags: ["Playful", "Fun", "Vibrant"],
  },
  {
    image: "/tones/luxury.jpg",
    label: "Luxury",
    labelClassNames: "text-white bg-yellow-800 px-2 py-1 rounded",
    tags: ["Luxury", "Premium", "Opulent"],
  },
  {
    image: "/tones/brutalist.jpg",
    label: "Brutalist",
    labelClassNames: "text-white bg-black px-2 py-1 font-bold",
    tags: ["Brutalist", "Raw", "Bold"],
  },
];

export default tones;
