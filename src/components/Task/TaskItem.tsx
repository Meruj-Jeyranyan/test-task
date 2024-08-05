import React from 'react';
import Button from "../../common-ui/button/Button";
import styled from 'styled-components';

interface TaskItemProps {
    id: string;
    title: string;
    description?: string;
    deadline?: string | undefined;
    status: 'pending' | 'completed' | 'overdue' | 'removed';
    onEdit: () => void;
    onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, deadline, status, onEdit, onDelete }) => {
    return (
        <TaskContainer>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{deadline}</p>
            <p>Status: {status}</p>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
        </TaskContainer>
    );
};

const TaskContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

export default TaskItem;
