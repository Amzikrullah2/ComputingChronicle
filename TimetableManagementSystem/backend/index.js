import express from "express";
//import PORT from "./config";
import mongoose from "mongoose";

const PORT = 5555;
const mongoDBURL = 'mongodb+srv://root:12345@timetable-management-sy.pgultui.mongodb.net/?retryWrites=true&w=majority&appName=Timetable-Management-System';

const app = express();

const router = express.Router();

app.use(express.json());

app.use('/books', )


/*app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to Timetable Management System'); 
  });*/

  const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
        },
        matricnumber: {
            type: String,
            required:true,
        },
    }
  );

  const User = mongoose.model('Student', userSchema);


router.post('/users', async (request, response) => {
    try {
        if(!request.body.name || !request.body.matricnumber) {
            return response.status(400).send({
                message: 'Send all required fields: name, matricnumber',
            });
        }
        const newUser = {
            name : request.body.name,
            matricnumber : request.body.matricnumber,
        };
        const user = await User.create(newUser);
        return response.status(201).send(user);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  router.get('/users', async (request, response) => {
    try{
        const users = await User.find({});
        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  router.get('/users/:id', async (request, response) => {
    try{

        const {id} = request.params;


        const users = await User.findById(id);
        return response.status(200).json(users);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  router.put('/users/:id', async (request, response) => {
    try {
      if(!request.body.name || !request.body.matricnumber) {
          return response.status(400).send({
              message: 'Send all required fields: name, matricnumber',
          });
      }
      
      const {id} = request.params;

      const result = await User.findByIdAndUpdate(id, request.body);

      if(!result) {
        return response.status(404).json({message : 'user not found'});
      }

      return response.status(404).send({message:'user updated successfully'});
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  router.delete('/users/:id', async (request, response) => {
    try {
      
      const {id} = request.params;

      const result = await User.findByIdAndDelete(id, request.body);

      if(!result) {
        return response.status(404).json({message : 'user not found'});
      }

      return response.status(404).send({message:'user deleted successfully'});
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });


  app.post('/users', async (request, response) => {
    try {
        if(!request.body.name || !request.body.matricnumber) {
            return response.status(400).send({
                message: 'Send all required fields: name, matricnumber',
            });
        }
        const newUser = {
            name : request.body.name,
            matricnumber : request.body.matricnumber,
        };
        const user = await User.create(newUser);
        return response.status(201).send(user);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  app.get('/users', async (request, response) => {
    try{
        const users = await User.find({});
        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  app.get('/users/:id', async (request, response) => {
    try{

        const {id} = request.params;


        const users = await User.findById(id);
        return response.status(200).json(users);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  app.put('/users/:id', async (request, response) => {
    try {
      if(!request.body.name || !request.body.matricnumber) {
          return response.status(400).send({
              message: 'Send all required fields: name, matricnumber',
          });
      }
      
      const {id} = request.params;

      const result = await User.findByIdAndUpdate(id, request.body);

      if(!result) {
        return response.status(404).json({message : 'user not found'});
      }

      return response.status(404).send({message:'user updated successfully'});
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  app.delete('/users/:id', async (request, response) => {
    try {
      
      const {id} = request.params;

      const result = await User.findByIdAndDelete(id, request.body);

      if(!result) {
        return response.status(404).json({message : 'user not found'});
      }

      return response.status(404).send({message:'user deleted successfully'});
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App Connected to Database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });