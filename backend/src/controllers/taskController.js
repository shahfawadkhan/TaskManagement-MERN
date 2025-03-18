import { Task } from "../models/TaskModel.js";


const newTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body; // Ensure `completed` is taken from the request

        if (!title || !description) {
            return res.status(400).json({
                message: "Both fields are required"
            });
        }

        const userId = req.user.id;

        const task = await Task.create({
            title,
            description,
            completed: completed !== undefined ? completed : false,  // Ensure `completed` is always set
            user: userId
        });

        return res.status(201).json({
            task,
            message: "Task Created Successfully"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


const deleteTask = async(req , res)=>{
    try {
        const {id} = req.params;
        if (!id) {
            return res
            .status(200)
            .json({
                message : "Task Id is required"
            })
        }

        const task = await Task.findById(id)

        if (!task) {
            return res
            .status(400)
            .json({
                message : "Task not found"
            })
        }

        await Task.findByIdAndDelete(task)

        return res
        .status(200)
        .json({
            message : "Task Deleted Successfully"
        })
    
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .json({
            message : "Internal Server Error"
        })
    }

}

const getTasks = async(req , res)=>{
    try {
        const userId = req.user.id
    
        const tasks =await Task.find({user : userId})
    
        if (tasks.length === 0) {
            return res.status(404).json({
                message: "No tasks found for this user"
            });
        }  

        return res
        .status(200)
        .json({
            tasks ,
            message : "Tasks fetched successfully"
        })
    } catch (error) {
        console.log(error.message);
        return res
        .status(500)
        .json({
            message : "Internal Server Error"
        })
    }
}

const editTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, completed } = req.body; 

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        await task.save();

        return res.status(200).json({
            task,
            message: "Task updated successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


  

export {newTask , deleteTask , getTasks , editTask }