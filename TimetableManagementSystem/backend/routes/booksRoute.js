import express from "express";


const router = express.Router();


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

  export default router;