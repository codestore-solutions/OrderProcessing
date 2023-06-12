import { UserDto } from "src/routes/user/dto/user.dto";

export const users: UserDto[] = [
  {
    "id": '1',
    "name": "Rajiv Kumar",
    "email": "rajiv@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "admin",
    "isActive": true
  },
  {
    "id": '2',
    "name": "Aman Shah",
    "email": "aman@shahgmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "business-admin",
    "isActive": true

  },
  {
    "id": '3',
    "name": "Ratnesh Chaudhary",
    "email": "ratanchaudhary@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "seller",
    "businessAdmin": '2',
    "isActive": true
  },
  {
    "id": '4',
    "name": "Kamlesh Raj",
    "email": "kamalr@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "seller",
    "businessAdmin": '2',
    "isActive": true,
  },
  {
    "id": '5',
    "name": "Ramesh kapil",
    "email": "ramlal@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "customer",
    "isActive": true

  },
  {
    "id": '6',
    "name": "Kapil Prasaad",
    "email": "ravip@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": '2'

  },
  {
    "id": '7',
    "name": "Omkar Sharma",
    "email": "oomsharma@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": '2'

  },
  {
    "id": '8',
    "name": "Nirajan Koti",
    "email": "niranjankoti@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": '2'

  },
  {
    "id": '9',
    "name": "Akhilesh Kumar",
    "email": "kumarakhilesh@123gmail.com",
    "password": "password123",
    "contacts": ["917860965109", "917355986157"],
    "role": "delivery-agent",
    "isActive": true,
    "address": "Noida",
    "businessAdminId": '2'
  }
]

