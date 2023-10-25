import {useState} from "react";

export const SignIn = ({toggleForm}) => {
    const [formData, setFormData] = useState({username: "", password: ""});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //handleSignIn(formData);
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded shadow-md h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
                            className="w-full p-2 border rounded focus:outline-blue-400 focus:outline-offset-1"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-blue-400 focus:outline-offset-1"
                            required
                        />
                    </div>
                </section>
                <section>
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={toggleForm} className="text-blue-500 hover:underline">
                            Register
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Sign In
                        </button>
                    </div>
                </section>
            </form>
        </div>
    );
};