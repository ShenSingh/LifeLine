import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import getHospitalList, { Hospital } from "../../api/hospital.tsx";
import { register } from "../../api/auth.tsx";
import Alert from "../uiComponent/alert/Alert.tsx";
import {GoogleBtn} from "../button/GoogleBtn.tsx";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [hospitals, setHospitals] = useState<Array<{ value: string, label: string, original: Hospital }>>([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [hospital, setHospital] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ variant: "success" | "error", title: string, message: string } | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await getHospitalList();
        if (response) {
          setHospitals(
              response.map((hospital) => ({
                value: hospital.id,
                label: hospital.name,
                original: hospital
              }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHospitals();
  }, []);

  // Modify the handleSignUp function to pass the full hospital object
  const handleSignUp = async () => {
    const selectedHospital = hospitals.find(h => h.value === hospital);
    if (!selectedHospital) {
      setAlert({ variant: "error", title: "Error", message: "Please select a valid hospital" });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }

    const result = await register(fName, lName, selectedHospital.original, email, password);

    if (result) {
      console.log("result ok >> "+ result)
      // setToken(result.token);
      setAlert({ variant: "success", title: "Success", message: "Registration successful" });
    } else {
      setAlert({ variant: "error", title: "Error", message: "Registration failed" });
    }
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };
  return (
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div>
          {alert && alertVisible && (
              <div className="absolute mt-2 ml-2">
                <Alert
                    variant={alert.variant}
                    title={alert.title}
                    message={alert.message}
                />
              </div>
          )}
        </div>
        <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
          <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="size-5"/>
            Back to Home
          </Link>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to sign up!
              </p>
            </div>

            <div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                <GoogleBtn />
                <button
                    className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="#3f51b5" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path>
                    <path fill="#fff"
                          d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"></path>
                  </svg>
                  Sign up with Fb
                </button>
              </div>
              <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
                </div>
              </div>
              <form>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <Label>
                        First Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                          type="text"
                          id="fname"
                          name="fname"
                          placeholder="Enter your first name"
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label>
                        Last Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                          type="text"
                          id="lname"
                          name="lname"
                          placeholder="Enter your last name"
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>
                      Hospital<span className="text-error-500">*</span>
                    </Label>
                    <select
                        id="hospital"
                        name="hospital"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                    >
                      <option value="">Select your hospital</option>
                      {hospitals.map((hospital) => (
                          <option key={hospital.value} value={hospital.value}>
                            {hospital.label}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                      {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>
                      ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>
                      )}
                    </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                        className="w-5 h-5"
                        checked={isChecked}
                        onChange={setIsChecked}
                    />
                    <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                      By creating an account means you agree to the{" "}
                      <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                      and our{" "}
                      <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                    </p>
                  </div>
                  <div>
                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Already have an account? {""}
                  <Link
                      to="/signin"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
