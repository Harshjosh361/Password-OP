import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyeopen from "../assets/eyeopen.png";
import eyeclose from "../assets/eyeclose.png";

function Manager() {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const passwordRef = useRef();
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
    console.log(passwords);
    console.log(passwordArray);
  }, []);

  const formHandler = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const showPass = () => {
    if (ref.current.src.includes(eyeclose)) {
      ref.current.src = eyeopen;
      passwordRef.current.type = "text";
    } else {
      ref.current.src = eyeclose;
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if(form.site && form.password && form.username){
      console.log(form);
    setpasswordArray([...passwordArray, {...form,id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
    setForm({ site: "", username: "", password: "" });
    console.log([...passwordArray, form]);
    }
    else{
      alert("Please fill all the fields to continue :)");
    }
  };
  const deletePassword = (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
    let passwords = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(passwords); 
    localStorage.setItem("passwords", JSON.stringify(passwords));
    }
  }
  const editPassword =(id)=>{
    setForm(passwordArray.filter((item)=>item.id===id)[0]);
    setpasswordArray(passwordArray.filter((item)=>item.id!==id));
    
  }
  const copyText = (text) => {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Copied!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      alert("Failed to copy to clipboard");
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className="md:container mx-auto p-10 text-black max-w-4xl m-5">
          <div className=" text-center font-bold">
            <h1 className=" text-4xl">
              <span className="text-green-500">&lt;</span>
              <span>Pass</span>
              <span className="text-green-500">OP/&gt;</span>
            </h1>
            <p className=" font-normal text-xl">Your Own Password Manager</p>
          </div>
          <form>
          <div className="flex flex-col gap-8 p-4">
            <input
              value={form.site}
              onChange={formHandler}
              required
              type="text"
              name="site"
              placeholder="Enter Website URL"
              className=" rounded-full px-5 py-3 w-full border border-green-500"
            />
            <div className="flex justify-between w-full gap-8">
              <input
                value={form.username}
                onChange={formHandler}
                required
                type="text"
                name="username"
                placeholder="Enter username"
                className="rounded-full px-5 py-3 w-full border border-green-500"
              />
              <div className="relative w-full">
                <input
                  value={form.password}
                  onChange={formHandler}
                  name="password"
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter password"
                  className=" rounded-full px-5 py-3 w-full border border-green-500"
                  required
                />
                <img
                  className="absolute right-3 bottom-4"
                  onClick={showPass}
                  src={eyeclose}
                  ref={ref}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          </form>
          <div className="flex justify-center items-center">
            <button
              className="flex justify-center items-center m-3 bg-green-500 w-fit text-sm border  border-green-900 rounded-full px-8 py-2"
              onClick={savePassword}
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </button>
          </div>

          <div className="passwords">
            <h1 className="font-bold text-2xl py-4">Your Passwords</h1>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length > 0 && (
              <table className="table-auto w-full rounded-lg overflow-hidden">
                <thead className=" bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-200">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center w-32 py-2">
                          <div className="flex justify-center items-center cursor-pointerd">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div onClick={() => copyText(item.site)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingLeft: "3px",
                                  paddingTop: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center w-32 py-2">
                          <div className="flex justify-center items-center cursor-pointer">
                            <span>{item.username}</span>
                            <lord-icon
                              onClick={() => copyText(item.username)}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </td>
                        <td className="text-center w-32 py-2">
                          <div className="flex justify-center items-center cursor-pointer">
                            <span>{item.password}</span>
                            <lord-icon
                              onClick={() => {
                                copyText(item.password);
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </td>
                        <td className="text-center w-32 py-2 cursor-pointer">
                          <div className="flex justify-center items-center">
                            <span onClick={()=>editPassword(item.id)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                trigger="hover"
                                style={{ width: "30px", height: "30px" }}
                              ></lord-icon>
                            </span>
                            <span onClick={()=>deletePassword(item.id)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/drxwpfop.json"
                                trigger="hover"
                                stroke="bold"
                                style={{ width: "30px", height: "30px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Manager;
