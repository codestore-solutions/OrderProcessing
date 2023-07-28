import { UserDto } from "src/routes/user/dto/user.dto";

export enum UserRole {
  Admin = 1,
  BusinessAdmin = 2,
  Seller = 3,
  Customer = 4,
  DeliveryAgent = 5
}

export const users: UserDto[] = [
  {
    "id": 1,
    "name": "Rajiv Kumar",
    "email": "rajiv.kumar@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 1,
    "isActive": true
  },
  {
    "id": 2,
    "name": "Aman Shah",
    "email": "aman.shah@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 2,
    "businessCategory": 1,
    "isActive": true
  },

  {
    "id": 10,
    "name": "Amit Sharma",
    "contacts": ["9871234567"],
    "email": "amit.sharma@codestore.com",
    "password": "password123",
    "role": 2,
    "businessCategory": 2,
    "isActive": true
  },

  {
    "id": 11,
    "name": "Deepika Sharma",
    "contacts": ["9871234567"],
    "email": "deepika.sharma@codestore.com",
    "password": "password123",
    "role": 2,
    "businessCategory": 3,
    "isActive": true
  },

  {
    "id": 12,
    "name": "Ashish Verma",
    "contacts": ["9871234567"],
    "email": "ashish.verma@codestore.com",
    "password": "password123",
    "role": 2,
    "businessCategory": 4,
    "isActive": true
  },

  {
    "id": 13,
    "name": "Rahul Mehta",
    "contacts": ["9871234567"],
    "email": "rahul.mehta@codestore.com",
    "password": "password123",
    "role": 2,
    "businessCategory": 5,
    "isActive": true
  },

  {
    "id": 3,
    "name": "Ratnesh Chaudhary",
    "email": "ratnesh.chaudhary@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 3,
    "businessAdmin": 2,
    "isActive": true
  },
  {
    "id": 4,
    "name": "Kamlesh Raj",
    "email": "kamlesh.raj@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 3,
    "businessAdmin": 2,
    "isActive": true,
  },
  {
    "id": 5,
    "name": "Ramesh Kapoor",
    "email": "ramesh.kapoor@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 4,
    "isActive": true

  },
  {
    "id": 6,
    "name": "Kapil Prasad",
    "email": "kapil.prasad@example.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
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
    "role": 5,
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
    "role": 5,
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
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 14,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent1@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 15,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent2@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 16,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent3@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 17,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent4@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 18,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent5@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 19,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent6@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 20,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent7@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 21,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent8@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 22,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent9@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 23,
    "name": "Akhilesh Kumar",
    "email": "deliveryagent10@codestore.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 24,
    "name": "Garvit Sharma",
    "email": "Garvit1999@mailinator.com",
    "password": "Admin@1234",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
  {
    "id": 25,
    "name": "Rohit Dass",
    "email": "Rohit1999@mailinator.com",
    "password": "Admin@1234",
    "contacts": ["917860965109", "917355986157"],
    "role": 5,
    "isActive": true,
    "address": "Noida",
    "businessAdminId": 2
  },
]
