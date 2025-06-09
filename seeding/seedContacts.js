import "dotenv/config";
import { supabase } from "../lib/supabaseClient.js";
import { faker } from "@faker-js/faker";

async function seedContacts(count = 50) {
  const contacts = Array.from({ length: count }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
  }));

  const { data, error } = await supabase.from("contacts").insert(contacts);

  if (error) {
    console.error("Error seeding contacts:", error);
  } else {
    console.log(`Seeded ${contacts.length} contacts.`);
  }
}

seedContacts();
