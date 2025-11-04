// "use client";

// // import { useMutation } from "@tanstack/react-query";
// import React, { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";

// // import axios from "axios";
// // import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
// // import { useAuth } from "@/context/userStore";

// // import { LoginData, loginSchema } from "@/src/api/auth/schema";
// // import { loginUser } from "@/src/api/auth/route";

// const Login = () => {
//   // const router = useRouter();
//   // const [serverError, setServerError] = useState("");
//   const [passwordShow, setPasswordShow] = useState(false);

//   // const setUser = useAuth((s) => s.setUser);
//   // const settoken = useAuth((s) => s.setToken);
//   // const isLoggedIn = useAuth((s) => !!s.token);

//   // const form = useForm<LoginData>({
//   //   resolver: zodResolver(loginSchema),
//   // });

//   // const mutation = useMutation({
//   //   mutationFn: loginUser,
//   //   onError: (error: any) => {
//   //     if (axios.isAxiosError(error)) {
//   //       setServerError(error.response?.data?.message || "Login failed");
//   //     } else {
//   //       setServerError("An unexpected error occurred");
//   //     }
//   //   },
//   //   onSuccess: (data) => {
//   //     if (data.token && data.user) {
//   //       setUser(data.user);
//   //       settoken(data.token);
//   //     }
//   //     router.push("/");
//   //   },
//   // });

//   // useEffect(() => {
//   //   if (isLoggedIn) {
//   //     router.push("/");
//   //   }
//   //   console.log("isLoggedIn");
//   // }, [isLoggedIn, router]);

//   // const onSubmit = (data: LoginData) => {
//   //   setServerError("");
//   //   mutation.mutate(data);
//   // };

//   return (
//     <div>
//       <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 h-[calc(100vh-300px)]">
//         <div className=" w-full h-full flex items-center justify-center flex-col">
//           <form
//             className="border shadow p-5 relative flex flex-col items-center justify-center md:px-16 pb-0"
//             // onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <h1 className="my-10 font-bold uppercase text-4xl tracking-wider">
//               login
//             </h1>

//             <div className="mb-5">
//               <div className="bg-gray-300 flex  gap-3 items-center pl-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
//                 <Mail size={20} color="gray" />
//                 <input
//                   placeholder="email"
//                   className="placeholder:capitalize outline-none py-5 w-full"
//                   type="email"
//                   // {...form.register("email")}
//                 />
//               </div>
//               {/* {form.formState.errors.email && (
//                 <p className="text-red-500 text-sm">
//                   {form.formState.errors.email.message}
//                 </p>
//               )} */}
//             </div>
//             <div className="mb-5">
//               <div className="bg-gray-300 flex  gap-3 items-center px-3 md:w-[400px] w-[300px] mb-2 focus-within:bg-white border  focus-within:text-[#7971ea] focus-within:border-[#7971ea]">
//                 <Lock size={20} color="gray" />
//                 <input
//                   placeholder="password"
//                   className="placeholder:capitalize outline-none py-5 w-full"
//                   // {...form.register("password")}
//                   type={passwordShow ? "text" : "password"}
//                 />
//                 <p onClick={() => setPasswordShow((prev) => !prev)}>
//                   {passwordShow ? (
//                     <EyeClosed size={20} color="gray" />
//                   ) : (
//                     <Eye size={20} color="gray" />
//                   )}
//                 </p>
//               </div>
//               {/* {form.formState.errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {form.formState.errors.password.message}
//                 </p>
//               )} */}
//             </div>
//             {/* {serverError && (
//               <p className="text-red-500 text-sm self-start mb-3">
//                 {serverError}
//               </p>
//             )} */}

//             <button
//               className="bg-[#7971ea] text-white hover:bg-white  hover:text-[#7971ea] border hover:border-[#7971ea] flex  gap-3  px-3 md:w-[400px] w-[300px] mb-6 py-4 text-center capitalize font-bold items-center justify-center text-lg "
//               type="submit"
//               // disabled={mutation.isPending}
//             >
//               {" "}
//               login
//               {/* {mutation.isPending ? "Logging in..." : "Login"} */}
//             </button>
//             <p className=" flex  gap-3  px-3 md:w-[400px] w-[300px] mt-20 py-5 text-center  font-light items-center justify-center  \\">
//               Not a user yet{" "}
//               <Link href={"/signup"} className="text-[#7971ea]">
//                 {" "}
//                 Sign up!
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useTheme } from "@/src/store/themeStore";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md px-6 py-10">
        <form
          className="shadow-lg rounded-lg p-8 flex flex-col items-center transition-colors duration-300"
          style={{ backgroundColor: colors.gray1 }}
        >
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
            Login
          </h1>

          <div className="w-full mb-5">
            <div
              className="flex items-center gap-3 px-3 py-4 w-full bborder rounded focus-within:ring-2 focus-within:ring-[#7971ea] transition-colors duration-300"
              style={{ backgroundColor: colors.gray2 }}
            >
              <Mail size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          <div className="w-full mb-5">
            <div
              className="flex items-center gap-3 px-3 py-4 w-full bg-gray-100 dark:bg-gray-700 border rounded focus-within:ring-2 focus-within:ring-[#7971ea] transition-colors duration-300"
              style={{ backgroundColor: colors.gray2 }}
            >
              <Lock size={20} />
              <input
                type={passwordShow ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent placeholder-gray-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setPasswordShow((prev) => !prev)}
                className="focus:outline-none"
              >
                {passwordShow ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full py-4 mt-4 bg-[#7971ea] text-white font-bold text-lg rounded hover:bg-white hover:text-[#7971ea] hover:border hover:border-[#7971ea] transition-colors duration-300">
            Login
          </button>

          <p className="mt-6 text-center text-sm" style={{color:colors.text3}}>
            Not a user yet?{" "}
            <Link href="/signup" className="text-[#7971ea] font-medium">
              Sign up!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
