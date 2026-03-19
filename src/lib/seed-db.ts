import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { laptops } from "../data/laptops";

export const seedDatabase = async () => {
  try {
    const batch = writeBatch(db);
    const productsRef = collection(db, "products");

    laptops.forEach((laptop) => {
      const docRef = doc(productsRef, laptop.id);
      batch.set(docRef, {
        ...laptop,
        updatedAt: new Date().toISOString(),
      });
    });

    await batch.commit();
    console.log("Database seeded successfully!");
    return { success: true, message: "Database seeded successfully!" };
  } catch (error) {
    console.error("Error seeding database: ", error);
    return { success: false, message: (error as Error).message };
  }
};
