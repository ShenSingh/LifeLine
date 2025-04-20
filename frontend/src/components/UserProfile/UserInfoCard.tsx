import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../uiComponent/modal";
import Button from "../uiComponent/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import {getUser, updateUser, User} from "../../api/user.tsx";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "Guest",
    lastName: "Guest",
    email: "Guest",
    phone: "Guest",
    address: "Guest",
    hospital: {
      id: "",
      name: "Guest",
      latitude: "",
      longitude: "",
      district: "",
    },
  });

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "Guest",
        lastName: user.lastName || "Guest",
        email: user.email || "Guest",
        phone: user.phone || "-",
        address: user.address || "-",
        hospital: user.hospital || {
          id: "",
          name: "Guest",
          latitude: "",
          longitude: "",
          district: "",
        },
        });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("hospital.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        hospital: {
          ...prevData.hospital,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (user) {
        const updatedUser = {
          ...user,
          ...formData,
          hospital: {
            ...formData.hospital,
          },
        };

        await updateUser(updatedUser);
        console.log("User updated successfully:", updatedUser);
        closeModal();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {formData.firstName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {formData.lastName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {formData.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {formData.phone}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {formData.address}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Hospital
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {formData.hospital.name}
                </p>
              </div>
            </div>
          </div>

          <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Edit
          </button>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Personal Information
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update your details to keep your profile up-to-date.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Email Address</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Address</Label>
                    <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Hospital</Label>
                    <Input
                        type="text"
                        name="hospital.name"
                        value={formData.hospital.name}
                        onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
  );
}
