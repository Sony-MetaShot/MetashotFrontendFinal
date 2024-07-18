import React, { useState, useEffect, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Components/Modal';
import styles from './Settings.module.css';
import axios from 'axios';
import apiClient from '@/src/utils/axiosSetup';

const Settings_content: React.FC = () => {
  const [exportCandidateList, setExportCandidateList] = useState<boolean>(false);
  const [removeListings, setRemoveListings] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<boolean>(false);
  const [name, setName] = useState<string | null>("");
  const [companyName, setCompanyName] = useState<string | null>('');
  const [companyDetails, setCompanyDetails] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [interviews, setInterviews] = useState<any[]>([]);
  const [selectedInterviews, setSelectedInterviews] = useState<string[]>([]);
  const [showModal2, setShowModal2] = useState<boolean>(false);

  useEffect(() => {
    fetchInterviews();
    fetchUserDetails()
  }, []);

  // Creating Local Storage for details
  

  // Fetch Names API

  const fetchUserDetails = async()=>{
    
    try{
      const name1 = localStorage.getItem('name')
      const companyName1 =localStorage.getItem('companyName')
      const email1 = localStorage.getItem('email')
      const companyDetails1 = localStorage.getItem('compayDetails')


      if(name1 || companyName1 || email1 || companyDetails1){
        setName(name1)
        setCompanyName(companyName1)
        setEmail(email1)
        setCompanyDetails(companyDetails1)
      }
      else{

        const response = await apiClient.get('/user/settings')
        const name1 = response.data.name
        const companyName1 = response.data.companyName
        const email1 = response.data.email
        const companyDetails1 = response.data.companyDetails
        setName(name1||"")
        setCompanyName(companyName1 || "")
        setCompanyDetails(companyDetails1 || "")
        setEmail(email1 || "")
        localStorage.setItem('name',name1)
        localStorage.setItem('companyName',companyName1)
        localStorage.setItem('email',email1)
        localStorage.setItem('compayDetails',companyDetails1)

      }
      



    }
    catch(err:any){
      console.log(err)

    }
  }

  // Fetch interviews from API
  const fetchInterviews = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      
      // Set headers with Authorization token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get('https://metashot-backend.azurewebsites.net/interview/getAll', {
        headers: headers,
      });
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      // Handle error fetching interviews
    }
  };

  // Handle checkbox selection for interviews
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, interviewId: string) => {
    if (event.target.checked) {
      setSelectedInterviews(prevSelected => [...prevSelected, interviewId]);
    } else {
      setSelectedInterviews(prevSelected =>
        prevSelected.filter(id => id !== interviewId)
      );
    }
  };

  // Handle removal of selected listings
  const handleRemoveListings = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Set headers with Authorization token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Call API to delete selected interviews with Authorization header
      const response = await axios.post('https://metashot-backend.azurewebsites.net/interview/delete', {
        interviewIds: selectedInterviews
      }, {
        headers: headers,
      });

      console.log('Deleted interviews:', response.data);

      // Handle success message or update state accordingly
      // For example, update state or show success message
    } catch (error) {
      console.error('Error deleting interviews:', error);
      // Handle error deleting interviews
    } finally {
      // Close modal or reset state as needed
      setSelectedInterviews([]);
      setShowModal2(false);
      fetchInterviews(); // Refresh interview list after deletion
    }
  };

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  return (
    <>
      <div className={`flex flex-col mt-8 rounded-xl text-xs shadow-md ${styles['container']} text-black`}>
        <div className="w-3/4">
          <h2 className="mt-6 mb-8 ml-5 text-xl font-semibold">Settings</h2>
          
          {/* Profile Picture */}
          <div className={`flex ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Profile Picture
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-28'>
              <input type="file" id='fileInput' className="hidden" />
              <button className='bg-[#FFFFFF] p-3 font-bold rounded-xl shadow-lg w-32 h-10' style={{ color: '#3D8A3C', fontFamily: 'inter' }}>
                CHOOSE FILE
              </button>
            </div>
          </div>
          
          {/* Name Input */}
          <div className={`flex mt-5 mb-4 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Name
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <input type="text" className={`p-2 border rounded-md ${styles['box']}`} />
            </div>
          </div>
          
          {/* Company Name Input */}
          <div className={`flex mt-5 mb-4 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Company Name
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <input type="text" className={`p-2 border rounded-md ${styles['box']}`}  />
            </div>
          </div>
          
          {/* Company Details Input */}
          <div className={`flex mt-5 mb-4 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Company Details
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <input type="text" className={`p-2 border rounded-md ${styles['box']}`} />
            </div>
          </div>
          
          {/* Email Input */}
          <div className={`flex mt-5 mb-4 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Email
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <input type="email" className={`p-2 border rounded-md ${styles['box']}`} />
            </div>
          </div>
          
          {/* Email Verification Status */}
          <div className={`${styles['email']} ${styles['left']}`}>
            <small className="text-red-500">Email not verified. <a href="#" className="text-blue-500 underline">Verify now</a></small>
          </div>
          
          {/* Export Candidate List Toggle */}
          <div className={`flex mt-5 mb-2 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Export Candidate List
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <FontAwesomeIcon 
                icon={exportCandidateList ? faToggleOn : faToggleOff} 
                className={`text-2xl cursor-pointer ${exportCandidateList ? 'text-green-500' : ''} `} 
                onClick={() => {
                  handleToggle(setExportCandidateList);
                  // Additional logic or modal handling
                }}
              />
            </div>
          </div>
          
          {/* Remove Listings Toggle */}
          <div className={`flex mt-2 mb-2 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Remove Listings
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <FontAwesomeIcon 
                icon={removeListings ? faToggleOn : faToggleOff} 
                className={`text-2xl cursor-pointer ${removeListings ? 'text-green-500' : ''}`}
                onClick={() => {
                  handleToggle(setRemoveListings);
                  setShowModal2(true); // Open modal for remove listings
                }}
              />
            </div>
          </div>
          
          {/* Delete Data Toggle */}
          <div className={`flex mt-2 mb-2 ${styles['inputBar']}`}>
            <div className='flex items-center justify-end h-6 ml-5 font-bold w-36'>
              Delete Data
            </div>
            <div className='flex items-center justify-start h-6 ml-10 w-72'>
              <FontAwesomeIcon 
                icon={deleteData ? faToggleOn : faToggleOff} 
                className={`text-2xl cursor-pointer ${deleteData ? 'text-green-500' : ''}`}
                onClick={() => {
                  handleToggle(setDeleteData);
                  // Additional logic or modal handling
                }}
              />
            </div>
          </div>
          
          {/* Logout and Delete Account */}
          <div className={`flex flex-col ml-52 w-40 ${styles['left']}`}>
            <div className='font-bold' style={{ color: '#AFAFAF' }}>
              LOGOUT
            </div>
            <div className='font-bold' style={{ color: '#AFAFAF' }}>
              DELETE ACCOUNT
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Modal for Remove Listings */}
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)} isCustomMsg={false}>
        <div className='flex flex-col items-center p-6' style={{ backgroundColor: '#4CAF50' }}>
          <h2 className='mb-4 text-2xl font-bold text-left'> Remove Listings </h2>
          <div className='overflow-y-auto max-h-48'>
            {interviews.map(interview => (
              <div key={interview._id} className='flex items-center my-2'>
                <input 
                  type='checkbox' 
                  id={interview._id} 
                  checked={selectedInterviews.includes(interview._id)}
                  onChange={(e) => handleCheckboxChange(e, interview._id)}
                  className='mr-2'
                />
                <label htmlFor={interview._id}>{interview.jobPosition}</label>
              </div>
            ))}
          </div>
          <button 
            className='px-4 py-2 mt-4 text-white bg-red-500 rounded-md'
            onClick={handleRemoveListings}
          >
            Remove Selected Listings
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Settings_content;
