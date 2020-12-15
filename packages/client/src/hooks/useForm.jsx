import { useState } from 'react';

const useForm = (initialState) => {
    const [form, setForm] = useState(initialState);

    return [
        form,
        (e) => {
            const { target } = e;
            setForm((prev) => {
                return {
                    ...prev,
                    [target.name]: target.files ? target.files[0] : target.value,
                };
            });
        },
    ];
};

export default useForm;