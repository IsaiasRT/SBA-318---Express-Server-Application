import express from 'express';
import { v4 as uuidv4 } from "uuid";


const router = express.Router();

let users = [
  /*{
   firstName: "Jane",
   lastName: "Doe",
   age: 21
  },
  {
   firstName: "Jonas",
   lastName: "Point",
   age: 26
  }*/
];


//filter by age 
router.get('/', (req, res) => {
  const { age } = req.query;
  let result = users;
  if (age) result = users.filter(u => u.age === Number(age));
  res.json(result);
});

router.post('/', (req, res) => {
  const user = req.body;
   users.push({ ...user, id: uuidv4() });
  res.send(`user ${user.firstName} was added successfully!`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const findUser = users.find(user => user.id === id);
  res.send(findUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`The user with the ID ${id} was successfully deleted`);
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const {firstName, lastName, age} = req.body;
  const user = users.find((user) => user.id === id);
  
   if(firstName) user.firstName = firstName;
   if(lastName) user.lastName = lastName;
   if(age) user.age = age;

  res.send(`The user with the ID ${id} was successfully updated`);
});



export { users };
export default router;

