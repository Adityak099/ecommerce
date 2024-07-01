"use client";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import MissingFields from "../../../utils/MissingFields";
import {motion} from "framer-motion";
const SignUpForm = () => {
  const initialData = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    avatar: "",
    coverImage: "",
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState(initialData);
  const [response, setResponse] = useState({ message: "", status: null });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = MissingFields({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: confirmPassword,
      avatar: formData.avatar,
      coverImage: formData.coverImage,
    });
    // console.log();
    if (Object.values(emptyFields).length > 0) {
      setError(emptyFields);
      return;
    }
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.status === 400) {
        setResponse({
          message: response.data.message,
          status: response.data.status,
        });
      } else if (response.data.status === 201) {
        setResponse({
          message: response.data.message,
          status: response.data.status,
        });
        setError(null);
        setFormData(initialData);
        setTimeout(() => {
          const [timer, setTimer] = useState(3);
          setResponse({
            message: `Redirecting to signin Page in ${timer}`,
            status: 201,
          });
          setTimer(timer - 1);
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setResponse({ message: "", status: null });
        setError(error.response.data.message);
      }
      console.error(error);
    }
  };
  return (
    <>
      <main className="bg-form-strokedark">
        <motion.div 
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className=" mx-auto lg:w-2/5 lg:py-5">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between border-b border-stroke px-3 py-4 dark:border-strokedark lg:px-10">
                <h3 className=" text-center text-lg font-bold text-black dark:text-white lg:text-2xl">
                  ApnaBazar
                </h3>
                <Link
                  href="/login"
                  className=" text-center text-lg font-normal text-black dark:text-white lg:text-xl"
                >
                  Sign In
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label
                        htmlFor="first_name"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {error && error.first_name ? (
                        <div className="pt-2 text-center text-red">
                          {error.first_name}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label
                        htmlFor="last_name"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        id="last_name"
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {error && error.last_name ? (
                        <div className="pt-2 text-center text-red">
                          {error.last_name}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {error && error.email ? (
                      <div className="pt-2 text-center text-red">
                        {error.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4.5">
                    <label
                      htmlFor="username"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Username <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      maxLength={20}
                      onChange={handleChange}
                      placeholder="Select a Username"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {error && error.username ? (
                      <div className="pt-2 text-center text-red">
                        {error.username}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4.5">
                    <label
                      htmlFor="phone"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Phone <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      name="phone"
                      id="phone"
                      onChange={handleChange}
                      placeholder="Enter Your Contact Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {error && error.phone ? (
                      <div className="pt-2 text-center text-red">
                        {error.phone}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                      >
                        Password <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="password"
                        maxLength={254}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {error && error.password ? (
                        <div className="pt-2 text-center text-red">
                          {error.password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label
                        htmlFor="confirm_password"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                      >
                        Confirm Password <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        maxLength={254}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re Enter your password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {error && error.confirmPassword ? (
                        <div className="pt-2 text-center text-red">
                          {error.confirmPassword}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Image upload
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label
                          htmlFor="avatar"
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          Upload Avatar Image
                        </label>
                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              avatar: e.target.files[0],
                            })
                          }
                          className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {error && error.avatar ? (
                          <div className="pt-2 text-center text-red">
                            {error.avatar}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="coverImage"
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          Upload Cover Image
                        </label>
                        <input
                          type="file"
                          name="coverImage"
                          id="coverImage"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              coverImage: e.target.files[0],
                            })
                          }
                          className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {error && error.coverImage ? (
                          <div className="pt-2 text-center text-red">
                            {error.coverImage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {response.status !== null ? (
                    <div
                      className={`${response.status === 201 ? "text-green-500" : "text-red"} mt-4.5 text-center`}
                    >
                      {response.message}
                    </div>
                  ) : (
                    ""
                  )}
                  {error ? (
                    <div className="mt-4.5 text-center text-red">{error}</div>
                  ) : (
                    ""
                  )}
                  <button className="mt-4.5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default SignUpForm;
