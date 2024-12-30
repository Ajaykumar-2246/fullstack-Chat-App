import { config } from "dotenv";
import  connectDB  from "../Database/database.js";
import {User} from "../models/user.models.js";


config();

const seedUsers = [
    // Male Users
    {
      email: "james.anderson@example.com",
      username: "JamesAnderson",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "olivia.miller@example.com",
      username: "OliviaMiller",
      password: "password1",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  
    // Male Users
    {
      email: "william.clark@example.com",
      username: "WilliamClark",
      password: "mypassword123",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "sophia.davis@example.com",
      username: "SophiaDavis",
      password: "securepass",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  
    // Male Users
    {
      email: "benjamin.taylor@example.com",
      username: "BenjaminTaylor",
      password: "strongpass1234",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "ava.wilson@example.com",
      username: "AvaWilson",
      password: "passphrase01",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  
    // Male Users
    {
      email: "lucas.moore@example.com",
      username: "LucasMoore",
      password: "securepassword",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "isabella.brown@example.com",
      username: "IsabellaBrown",
      password: "complexpass123",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  
    // Male Users
    {
      email: "henry.jackson@example.com",
      username: "HenryJackson",
      password: "longpassword01",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "mia.johnson@example.com",
      username: "MiaJohnson",
      password: "anothercomplexpass",
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  
    // Male Users
    {
      email: "alexander.martin@example.com",
      username: "AlexanderMartin",
      password: "password12345678",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      email: "charlotte.williams@example.com",
      username: "CharlotteWilliams",
      password: "validpassword9",
      profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
  
    // Male Users
    {
      email: "daniel.rodriguez@example.com",
      username: "DanielRodriguez",
      password: "passwordIsSecure1234",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      email: "amelia.garcia@example.com",
      username: "AmeliaGarcia",
      password: "pass12345678",
      profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  ];
  
  
  

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();