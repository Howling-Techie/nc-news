import {useEffect, useState} from "react";

export const Register = ({toggleForm}) => {
    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [validFields, setValidFields] = useState({
        username: true,
        displayName: true,
        password: true,
    });
    useEffect(() => {
        if (formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }, [formData.confirmPassword, formData.password]);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});


        let isValid = false;
        switch (name) {
            case "username":
                isValid = /^\w{6,20}$/i.test(value);
                break;
            case "displayName":
                isValid = /^[\w\s-]{6,20}$/i.test(value) && !(/^(\s.*)|(.*\s)$/.test(value));
                break;
            case "password":
                isValid = /^\S{6,20}$/i.test(value);
                break;
        }
        console.log(`Setting ${name} [${value}] to ${isValid}`);
        setValidFields({...validFields, [name]: isValid});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isPasswordValid = /^\S{6,20}$/i.test(formData.password);
        const isUsernameValid = /^\w{6,20}$/i.test(formData.username);
        const isDisplayNameValid = /^[\w\s-]{6,20}$/i.test(formData.displayName) && !(/^(\s.*)|(.*\s)$/.test(formData.displayName));

        setValidFields({
            username: isUsernameValid,
            displayName: isDisplayNameValid,
            password: isPasswordValid,
        });
        if (isPasswordValid && isUsernameValid && isDisplayNameValid) {
            setPasswordsMatch(true);
            //handleRegister(formData);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded shadow-md h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-grow flex-col justify-between">
                <section>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:outline-blue-400 focus:outline-offset-1${
                                validFields.username ? "" : " border-red-500"}`}
                            required
                        />
                        {!validFields.username && (
                            <p className="text-red-500 text-sm mt-1">Username must be 6-20 characters long and contain
                                only
                                letters, numbers, and underscores.</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:outline-blue-400 focus:outline-offset-1${
                                validFields.displayName ? "" : " border-red-500"}`}
                            required
                        />
                        {!validFields.displayName && (
                            <p className="text-red-500 text-sm mt-1">Display Name must be 6-20 characters long,
                                contain only letters, numbers, hyphens, underscores, and spaces, and cannot start or end
                                with a space.</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:outline-blue-400 focus:outline-offset-1${
                                validFields.password ? "" : " border-red-500"}`}
                            required
                        />
                        {!validFields.password && (
                            <p className="text-red-500 text-sm mt-1">Password cannot contain spaces.</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:outline-blue-400 focus:outline-offset-1${
                                passwordsMatch ? "" : " border-red-500"}`}
                            required
                        />
                        {!passwordsMatch && (
                            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                        )}
                    </div>
                </section>
                <section>
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={toggleForm} className="text-blue-500 hover:underline">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Register
                        </button>
                    </div>
                </section>
            </form>
        </div>
    );
};