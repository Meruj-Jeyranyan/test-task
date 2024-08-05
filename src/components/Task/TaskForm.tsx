import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from "../../common-ui/button/Button";
import Input from "../../common-ui/input/Input";

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    deadline: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr),
});

const formatDate = (date: Date | string | undefined): string | undefined => {
    if (!date) return undefined;
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toISOString().split('T')[0];
};

type TaskFormProps = {
    initialData?: {
        title?: string;
        description?: string;
        deadline?: string | undefined;
    };
    onSubmit: (data: {
        title: string;
        description: string;
        deadline: string | undefined;
    }) => void;
    onClose: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onClose }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            deadline: initialData?.deadline ? new Date(initialData.deadline) : undefined,
        },
        resolver: yupResolver(schema),
    });

    const onFormSubmit: SubmitHandler<{ title: string; description: string; deadline?: Date | null }> = data => {
        onSubmit({
            title: data.title,
            description: data.description,
            deadline: data.deadline ? formatDate(data.deadline) : undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
                <label>Title</label>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
                <label>Description</label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div>
                <label>Deadline</label>
                <Controller
                    name="deadline"
                    control={control}
                    render={({ field }) => <Input type="date" {...field} value={field.value ? formatDate(field.value) : ''} />}
                />
                {errors.deadline && <p>{errors.deadline.message}</p>}
            </div>

            <Button type="submit">Save</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
        </form>
    );
};

export default TaskForm;
