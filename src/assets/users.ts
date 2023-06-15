import { UserDto } from "src/routes/user/dto/user.dto";

export const users: UserDto[] = [
  {
    "id": 1,
    "name": "Rajiv Kumar",
    "email": "rajiv.kumar@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "admin",
    "isActive": true
  },
  {
    "id": 2,
    "name": "Aman Shah",
    "email": "aman.shah@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "business-admin",
    "isActive": true

  },
  {
    "id": 3,
    "name": "Ratnesh Chaudhary",
    "email": "ratnesh.chaudhary@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "seller",
    "businessAdmin": 2,
    "isActive": true
  },
  {
    "id": 4,
    "name": "Kamlesh Raj",
    "email": "kamlesh.raj@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "seller",
    "businessAdmin": 2,
    "isActive": true,
  },
  {
    "id": 5,
    "name": "Ramesh Kapoor",
    "email": "ramesh.kapoor@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "customer",
    "isActive": true

  },
  {
    "id": 6,
    "name": "Kapil Prasad",
    "email": "kapil.prasad@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2

  },
  {
    "id": 7,
    "name": "Omkar Sharma",
    "email": "omkar.sharma@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2

  },
  {
    "id": 8,
    "name": "Niranjan Koti",
    "email": "niranjan.koti@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2

  },
  {
    "id": 9,
    "name": "Akhilesh Kumar",
    "email": "akhilesh.kumar@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  }
]
