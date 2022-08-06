import { pool } from "../db.js";

export const getTasks = async (req, res) => {
    try {
        //throw new Error("error de conexion");
        const [result] = await pool.query("SELECT * FROM tasks ORDER BY CreateAt ASC")
        //console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM tasks WHERE Id = ? ", [req.params.id]);
        //console.log(result)
        if(result.length === 0)
            return res.status(404).json({ message: "Task not found"})
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const createTask = async (req, res) => {
    try {
        const { Title, Description } = req.body;
        const result = await pool.query('INSERT INTO tasks(Title, Description) VALUES ( ?, ?)',
        [Title, Description]);

        const [ ResultSetHeader ] = result;

        res.json({
            id: ResultSetHeader.insertId,
            Title, Description
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const updateTask = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE tasks SET ? WHERE Id = ?", [
            req.body, 
            req.params.id        
        ]);
        if(result.affectedRows === 0)
            return res.status(404).send({message: "Task not found"})
    
        return res.sendStatus(201)        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM tasks WHERE Id = ?", [req.params.id]);
        
        if(result.affectedRows === 0)
            return res.status(404).send({message: "Task not found"})
    
        return res.sendStatus(204)
        
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}





