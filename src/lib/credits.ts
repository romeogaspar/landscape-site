// Demo photos loaded by `npm run seed` (files in seed/images).
// CC BY photos must be credited while you use them. If you replace a photo with your own, remove its row.
// Photos were resized and cropped; no other changes were made.

export type PhotoCredit = {
  use: string;
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  source: string;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    use: "Home hero",
    title: "Bright garden with flowers and trees",
    author: "Shixart1985",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: commons("Bright_garden_with_flowers_and_trees.jpg"),
  },
  {
    use: "Service: Garden Design",
    title: "Flower beds in English Flower Garden of Hamilton Gardens",
    author: "Pseudopanax (English Wikipedia)",
    license: "Public domain",
    source: commons("Flower_beds_in_English_Flower_Garden_of_Hamilton_Gardens.jpg"),
  },
  {
    use: "Service: Lawn Care",
    title: "Lawn care in a vibrant garden as a person mows the grass on a sunny day",
    author: "Shixart1985",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: commons("Lawn_care_in_a_vibrant_garden_as_a_person_mows_the_grass_on_a_sunny_day.jpg"),
  },
  {
    use: "Service: Hardscaping",
    title: "Mount Stewart, County Down, lavender lined patio",
    author: "Ciascu",
    license: "Public domain",
    source: commons("Mount_Stewart,_County_Down,_lavender_lined_patio.jpg"),
  },
  {
    use: "Service: Irrigation",
    title: "Irrigation sprinkler",
    author: "Longhair (English Wikipedia)",
    license: "CC BY 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
    source: commons("Irrigation_sprinkler_-_20070928.jpg"),
  },
  {
    use: "Project 1, before",
    title: "Overgrown Garden American College",
    author: "Broerbert",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: commons("Overgrown_Garden_American_College.jpg"),
  },
  {
    use: "Project 1, after",
    title: "Garden area with flowers and greenery",
    author: "Shixart1985",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: commons("Garden_area_with_flowers_and_greenery.jpg"),
  },
  {
    use: "Project 2, before",
    title: "Front garden meadow in Wales",
    author: "Hellowikieditor",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: commons("Front_garden_meadow_in_Wales.jpg"),
  },
  {
    use: "Project 2, after",
    title: "Terraced Garden Gate",
    author: "NPS Photo",
    license: "Public domain",
    source: commons("Terraced_Garden_Gate_(9ff63f3c-c42f-491a-b4c2-0b6522cd370a).jpg"),
  },
  {
    use: "Project 3, before",
    title: "Green grass and flowers grow by a wire fence near a garden in springtime",
    author: "Shixart1985",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: commons("Green_grass_and_flowers_grow_by_a_wire_fence_near_a_garden_in_springtime.jpg"),
  },
  {
    use: "Project 3, after",
    title: "Garden patio, Southwest Virginia Museum State Park",
    author: "vastateparksstaff",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: commons("Garden_patio-SW_Virginia_Museum_State_Park_Big_Stone_Gap_Va_(21375345873).jpg"),
  },
];
