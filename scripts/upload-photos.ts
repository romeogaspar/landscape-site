import { config } from "dotenv";
import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { join } from "path";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const IMAGES_DIR = join(process.cwd(), "public", "images");

async function uploadImage(filename: string) {
  const buffer = readFileSync(join(IMAGES_DIR, filename));
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function main() {
  console.log("Uploading real photos to Sanity...");

  const hero = await uploadImage("hero.jpg");
  const teamGroup = await uploadImage("team-group.jpg");
  const teamAlex = await uploadImage("team-alex.jpg");
  const teamJordan = await uploadImage("team-jordan.jpg");
  const serviceDesign = await uploadImage("service-design.jpg");
  const serviceLawn = await uploadImage("service-lawn.jpg");
  const serviceHardscape = await uploadImage("service-hardscape.jpg");
  const serviceIrrigation = await uploadImage("service-irrigation.jpg");
  const willowBefore = await uploadImage("willow-before.jpg");
  const willowAfter = await uploadImage("willow-after.jpg");
  const mapleBefore = await uploadImage("maple-before.jpg");
  const mapleAfter = await uploadImage("maple-after.jpg");
  const hilltopBefore = await uploadImage("hilltop-before.jpg");
  const hilltopAfter = await uploadImage("hilltop-after.jpg");

  console.log("Patching singletons...");
  await client.patch("homePage").set({ heroImage: hero }).commit();
  await client.patch("aboutPage").set({ teamPhoto: teamGroup }).commit();

  console.log("Patching team members...");
  await client.patch("6rm71nnTDOxtgIcQO3WAK4").set({ photo: teamAlex }).commit(); // Alex Rivera
  await client.patch("6rm71nnTDOxtgIcQO3WAZd").set({ photo: teamJordan }).commit(); // Jordan Lee

  console.log("Patching services...");
  await client.patch("v4Gmojd07EdzSZUAQ4ftKF").set({ image: serviceDesign }).commit(); // garden-design-installation
  await client.patch("6rm71nnTDOxtgIcQO3WApC").set({ image: serviceLawn }).commit(); // lawn-care-maintenance
  await client.patch("6rm71nnTDOxtgIcQO3WAvQ").set({ image: serviceHardscape }).commit(); // hardscaping-patios
  await client.patch("v4Gmojd07EdzSZUAQ4ftUG").set({ image: serviceIrrigation }).commit(); // irrigation-outdoor-lighting

  console.log("Patching gallery projects...");
  await client
    .patch("v4Gmojd07EdzSZUAQ4fu1e") // willow
    .set({ beforeImage: willowBefore, afterImage: willowAfter })
    .commit();
  await client
    .patch("6rm71nnTDOxtgIcQO3WBHD") // maple
    .set({ beforeImage: mapleBefore, afterImage: mapleAfter })
    .commit();
  await client
    .patch("v4Gmojd07EdzSZUAQ4ftrd") // hilltop
    .set({ beforeImage: hilltopBefore, afterImage: hilltopAfter })
    .commit();

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
