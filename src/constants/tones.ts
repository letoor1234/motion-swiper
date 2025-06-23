export interface ToneData {
  image: string;
  label: string;
  labelClassNames: string;
  cardClassNames: string;
  tags: string[];
}

export const tones: ToneData[] = [
  {
    image: "/tones/bold.png",
    label: "Bold",
    labelClassNames: "text-white bg-black rounded font-bold",
    cardClassNames: "bg-black border-slate-500",
    tags: ["Minimal", "Brutalist"],
  },
  {
    image: "/tones/minimal.png",
    label: "Minimal",
    labelClassNames: "text-black bg-white font-semibold",
    cardClassNames: "bg-white border-slate-500",
    tags: ["Clean", "Elegant"],
  },
  {
    image: "/tones/modern.png",
    label: "Modern",
    labelClassNames: "text-white rounded font-semibold",
    cardClassNames: "bg-gradient-to-r from-gray-700 to-gray-900",
    tags: ["Minimal", "Tech"],
  },
  {
    image: "/tones/tech.png",
    label: "Tech",
    labelClassNames: "text-white bg-blue-600 rounded font-bold",
    cardClassNames: "bg-blue-600",
    tags: ["Clean", "Modern"],
  },
  {
    image: "/tones/elegant.png",
    label: "Elegant",
    labelClassNames: "text-white bg-purple-700 rounded",
    cardClassNames: "bg-purple-700",
    tags: ["Playful", "Luxury"],
  },
  {
    image: "/tones/clean.png",
    label: "Clean",
    labelClassNames: "text-gray-800 bg-white rounded",
    cardClassNames: "bg-white border-slate-500",
    tags: ["Minimal", "Modern"],
  },
  {
    image: "/tones/playful.png",
    label: "Playful",
    labelClassNames: "text-white bg-pink-500 rounded font-semibold",
    cardClassNames: "bg-pink-500",
    tags: ["Luxury", "Clean"],
  },
  {
    image: "/tones/luxury.png",
    label: "Luxury",
    labelClassNames: "text-white bg-yellow-800 rounded",
    cardClassNames: "bg-yellow-800",
    tags: ["Elegant", "Clean"],
  },
  {
    image: "/tones/brutalist.png",
    label: "Brutalist",
    labelClassNames: "text-white bg-black font-bold",
    cardClassNames: "bg-black border-slate-500",
    tags: ["Minimal", "Bold"],
  },
];

export default tones;
