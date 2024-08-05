import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../../store/taskSlice';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Button from "../../common-ui/button/Button";

const Task: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.task.tasks);

    const handleAddTask = (data: any) => {
        dispatch(addTask({ ...data, id: uuidv4(), status: 'pending' }));
        toast.success('Task added successfully!');
        setIsFormOpen(false);
    };

    const handleUpdateTask = (data: any) => {
        if (editingTask) {
            dispatch(updateTask({ ...editingTask, ...data }));
            toast.success('Task updated successfully!');
            setEditingTask(null);
        }
        setIsFormOpen(false);
    };

    const handleEdit = (task: any) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id));
        toast.success('Task deleted successfully!');
    };

    console.log(tasks)

    return (
        <Container>
            <Button onClick={() => setIsFormOpen(true)}>Add Task</Button>
            {isFormOpen && (
                <TaskForm
                    initialData={editingTask}
                    onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingTask(null);
                    }}
                />
            )}
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    {...task}
                    deadline={task.deadline}
                    onEdit={() => handleEdit(task)}
                    onDelete={() => handleDelete(task.id)}
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
`;

export default Task;
