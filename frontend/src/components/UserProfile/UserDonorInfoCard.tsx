import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../uiComponent/modal";
import Button from "../uiComponent/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { getUser } from "../../api/user.tsx";
import {getDonorById, updateDonor} from "../../api/donor.tsx";

export default function UserDonorInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [medicalFormData, setMedicalData] = useState({
    age: 0,
    gender: "male",
    bloodType: "A_Positive",
    numberOfTimesDonated: 2,
    lastDonationDate:"2023-10-01",
    willingToDonateFrequency: "4 months",
    longTermIllness: false,
    takingMedicine: false,
    undergoneSurgery: false,
  });

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserId() {
      try {
        const user = await getUser(); // Fetch user id
        setId(user.id); // Extract and set the id
      } catch (error) {
        console.error("Error fetching user id:", error);
      }
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    async function fetchDonorData() {
      if (!id) return; // Ensure id is available before fetching donor data
      try {
        const donor = await getDonorById(id);
        setMedicalData({
          age: donor.age,
          gender: donor.gender,
          bloodType: donor.bloodType,
          numberOfTimesDonated: donor.numberOfTimesDonated,
          lastDonationDate: donor.lastDonationDate,
          willingToDonateFrequency: donor.willingToDonateFrequency,
          longTermIllness: donor.longTermIllness,
          takingMedicine: donor.takingMedicine,
          undergoneSurgery: donor.undergoneSurgery,
        });
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    }
    fetchDonorData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setMedicalData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {

    const updatedDonor = {
      ...medicalFormData,
      id: id,
    };

    console.log("Updated Donor Data:", updatedDonor);
    updateDonor(updatedDonor)
      .then((response) => {
        console.log("Donor updated successfully:", response);
      })
      .catch((error) => {
        console.error("Error updating donor:", error);
      });

    console.log("Updated Data:", medicalFormData);
    closeModal();
  };

  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Medical Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Age
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.age}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Gender
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.gender}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Blood Type
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.bloodType}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Number of Times Donated
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.numberOfTimesDonated}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Last Donation Date
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.lastDonationDate}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Willing to Donate Frequency
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.willingToDonateFrequency}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Long Term Illness
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.longTermIllness ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Taking Medicine
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.takingMedicine ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Undergone Surgery
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {medicalFormData.undergoneSurgery ? "Yes" : "No"}
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
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Medical Information
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update your medical details to keep your profile up-to-date.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Age</Label>
                    <Input
                        type="number"
                        name="age"
                        value={medicalFormData.age}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Gender</Label>
                    <Input
                        type="text"
                        name="gender"
                        value={medicalFormData.gender}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Blood Type</Label>
                    <Input
                        type="text"
                        name="bloodType"
                        value={medicalFormData.bloodType}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Number of Times Donated</Label>
                    <Input
                        type="number"
                        name="numberOfTimesDonated"
                        value={medicalFormData.numberOfTimesDonated}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Last Donation Date</Label>
                    <Input
                        type="date"
                        name="lastDonationDate"
                        value={
                          medicalFormData.lastDonationDate}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Willing to Donate Frequency</Label>
                    <Input
                        type="text"
                        name="willingToDonateFrequency"
                        value={medicalFormData.willingToDonateFrequency}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Long Term Illness</Label>
                    <input
                        type="checkbox"
                        name="longTermIllness"
                        checked={medicalFormData.longTermIllness}
                        onChange={handleInputChange}
                        className="form-checkbox"
                    />
                  </div>

                  <div>
                    <Label>Taking Medicine</Label>
                    <input
                        type="checkbox"
                        name="takingMedicine"
                        checked={medicalFormData.takingMedicine}
                        onChange={handleInputChange}
                        className="form-checkbox"
                    />
                  </div>

                  <div>
                    <Label>Undergone Surgery</Label>
                    <input
                        type="checkbox"
                        name="undergoneSurgery"
                        checked={medicalFormData.undergoneSurgery}
                        onChange={handleInputChange}
                        className="form-checkbox"
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
